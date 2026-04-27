'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/context/AuthContext';
import {
  getUserProfile,
  getEmotionLogs,
  addReport,
  getAllReports,
  rotateAppKey,
  UserProfile,
  EmotionLog,
  WellbeingReport,
} from '@/lib/firestore';
import { generateWellbeingReport } from '@/lib/gemini';
import { calculateWellbeing, TrendDirection } from '@/lib/wellbeing';
import DigitalTwinFace from '@/components/DigitalTwinFace';
import InfoModal from '@/components/InfoModal';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts';

const EMOTION_COLORS: Record<string, string> = {
  Happiness: '#22c55e',
  Happy: '#22c55e',
  Neutral: '#94a3b8',
  Sadness: '#3b82f6',
  Sad: '#3b82f6',
  Anger: '#ef4444',
  Angry: '#ef4444',
  Surprise: '#f59e0b',
  Surprised: '#f59e0b',
  Fear: '#8b5cf6',
  Disgust: '#14b8a6',
  Contempt: '#7c3aed',
};

function formatDateTime(ts: { toDate: () => Date }): string {
  return ts.toDate().toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

function buildPieData(logs: EmotionLog[]) {
  const counts: Record<string, number> = {};
  logs.forEach((l) => { counts[l.emotion_label] = (counts[l.emotion_label] ?? 0) + 1; });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function buildLineData(logs: EmotionLog[]) {
  const byDay = new Map<string, Record<string, number>>();
  for (const log of logs) {
    const d = log.timestamp.toDate();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!byDay.has(iso)) byDay.set(iso, {});
    const day = byDay.get(iso)!;
    day[log.emotion_label] = (day[log.emotion_label] ?? 0) + 1;
  }
  return Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([iso, counts]) => {
      const d = new Date(iso + 'T12:00:00');
      return {
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        ...counts,
      };
    });
}

function buildCalendarData(logs: EmotionLog[]) {
  const today = new Date();
  return Array.from({ length: 28 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (27 - i));
    const dayLogs = logs.filter((l) => {
      const ld = l.timestamp.toDate();
      return ld.getFullYear() === d.getFullYear() &&
             ld.getMonth() === d.getMonth() &&
             ld.getDate() === d.getDate();
    });
    const counts: Record<string, number> = {};
    dayLogs.forEach((l) => { counts[l.emotion_label] = (counts[l.emotion_label] ?? 0) + 1; });
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    return {
      d,
      dayLabel: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate(),
      monthLabel: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: dayLogs.length,
      dominant,
    };
  });
}

/** Extracts one summary sentence per ## section from a markdown report. */
function buildTldr(content: string): { heading: string; sentence: string }[] {
  const sections: { heading: string; sentence: string }[] = [];
  let heading: string | null = null;
  let captured = false;
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('## ')) {
      heading = line.slice(3);
      captured = false;
    } else if (heading && !captured && line && !line.startsWith('#') && !line.startsWith('-')) {
      const match = line.match(/^(.+?[.!?])(?:\s|$)/);
      const sentence = match ? match[1] : line.length > 130 ? line.slice(0, 130) + '…' : line;
      sections.push({ heading, sentence });
      captured = true;
    }
  }
  return sections;
}

/** Minimal markdown → HTML for the PDF print window. */
function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let inList = false;
  const bold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (inList) { out.push('</ul>'); inList = false; } continue; }
    if (line.startsWith('## ')) {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<h2>${bold(line.slice(3))}</h2>`);
    } else if (line.startsWith('- ')) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${bold(line.slice(2))}</li>`);
    } else {
      if (inList) { out.push('</ul>'); inList = false; }
      out.push(`<p>${bold(line)}</p>`);
    }
  }
  if (inList) out.push('</ul>');
  return out.join('\n');
}

function SkeletonDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header skeleton */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="skeleton h-8 w-64 mb-2" />
            <div className="skeleton h-4 w-48" />
          </div>
          <div className="skeleton h-10 w-28 rounded-lg" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* App key card skeleton */}
        <div className="skeleton h-36 rounded-2xl" />
        {/* Download card skeleton */}
        <div className="skeleton h-20 rounded-2xl" />
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-28 rounded-xl" />
          ))}
        </div>
        {/* Charts skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="skeleton h-80 rounded-xl" />
          <div className="skeleton h-80 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<EmotionLog[]>([]);
  const [reports, setReports] = useState<WellbeingReport[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState('');
  const [copied, setCopied] = useState(false);
  const [randomizing, setRandomizing] = useState(false);
  const [showRotateModal, setShowRotateModal] = useState(false);
  const [reportStaleWarning, setReportStaleWarning] = useState(false);
  const [infoModal, setInfoModal] = useState<'wellbeing' | 'burnout' | null>(null);
  const [showTldr, setShowTldr] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [appKeyExpanded, setAppKeyExpanded] = useState(false);

  const loadData = useCallback(async (uid: string) => {
    setDataLoading(true);
    try {
      const [p, l, r] = await Promise.all([
        getUserProfile(uid),
        getEmotionLogs(uid, 28),
        getAllReports(uid),
      ]);
      setProfile(p);
      setLogs(l);
      setReports(r);
      setCurrentIndex(0);
    } catch {
      // silently fail — data simply won't show
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (!loading && user) {
      loadData(user.uid);
    }
  }, [user, loading, router, loadData]);

  const handleCopy = () => {
    if (profile?.app_key) {
      navigator.clipboard.writeText(profile.app_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRandomize = async () => {
    if (!user || !profile?.app_key) return;
    setShowRotateModal(false);
    setRandomizing(true);
    try {
      await rotateAppKey(user.uid, profile.app_key);
    } catch {
      // rotateAppKey may throw on deleteDoc (security rules) even after the
      // new key is already written — fall through and re-fetch either way.
    }
    try {
      const fresh = await getUserProfile(user.uid);
      if (fresh) setProfile(fresh);
    } catch {
      // ignore
    }
    setRandomizing(false);
  };

  const handleGenerateReport = async (force = false) => {
    if (!user) return;

    // Staleness guard: if the latest report is less than 24 hours old, show inline warning
    const latest = reports[0];
    if (!force && latest) {
      const ageHours = (Date.now() - latest.generated_at.toDate().getTime()) / 3_600_000;
      if (ageHours < 24) {
        setReportStaleWarning(true);
        return;
      }
    }

    setReportStaleWarning(false);
    setGeneratingReport(true);
    setReportError('');
    try {
      const freshLogs = await getEmotionLogs(user.uid, 28);
      const content = await generateWellbeingReport(freshLogs);
      const id = await addReport(user.uid, content);
      const newReport: WellbeingReport = {
        id,
        generated_at: { toDate: () => new Date() } as WellbeingReport['generated_at'],
        content,
      };
      setReports((prev) => [newReport, ...prev]);
      setCurrentIndex(0);
    } catch (err: unknown) {
      setReportError(err instanceof Error ? err.message : 'Failed to generate report.');
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadPDF = () => {
    const report = reports[currentIndex];
    if (!report) return;
    const dateStr = report.generated_at.toDate().toLocaleDateString('en-US', { dateStyle: 'long' });
    const timeStr = report.generated_at.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const bodyHtml = markdownToHtml(report.content);
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>AuraTwin Report — ${dateStr}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;padding:48px;max-width:760px;margin:0 auto;font-size:14px;line-height:1.75}
  .brand{font-size:22px;font-weight:700;color:#0284c7;letter-spacing:-.02em}
  .meta{color:#6b7280;font-size:12px;margin-top:4px}
  hr{border:none;border-top:1px solid #e5e7eb;margin:20px 0 28px}
  h2{font-size:10px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:.12em;margin:28px 0 8px}
  h2:first-of-type{margin-top:0}
  p{margin-bottom:14px}
  ul{padding-left:22px;margin-bottom:14px}
  li{margin-bottom:7px}
  strong{font-weight:600}
  .footer{margin-top:40px;padding-top:14px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;display:flex;justify-content:space-between}
  @media print{body{padding:24px}}
</style></head>
<body>
  <div class="brand">AuraTwin</div>
  <div class="meta">AI-Powered Digital Twin Report &nbsp;·&nbsp; ${dateStr} at ${timeStr}</div>
  <hr>
  ${bodyHtml}
  <div class="footer"><span>AuraTwin Affective Computing Platform</span><span>${dateStr}</span></div>
</body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 350);
  };

  // Wellbeing metrics — hooks must be called before any early return
  const wellbeing = useMemo(() => calculateWellbeing(logs), [logs]);
  const wellbeingChartData = useMemo(
    () =>
      wellbeing.dailyTrend.map((d) => ({
        date: new Date(d.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        score: d.score,
      })),
    [wellbeing.dailyTrend],
  );

  if (loading || dataLoading) return <SkeletonDashboard />;
  if (!user) return null;

  // Stats
  const totalSessions = logs.length;
  const last7 = logs.filter((l) => {
    const d = l.timestamp.toDate();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return d >= cutoff;
  });
  const mostCommon = (() => {
    if (!last7.length) return '--';
    const counts: Record<string, number> = {};
    last7.forEach((l) => { counts[l.emotion_label] = (counts[l.emotion_label] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  })();
  const lastSessionLog = logs.length ? logs[logs.length - 1] : null;
  const lastSessionDate = lastSessionLog
    ? lastSessionLog.timestamp.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '--';
  const lastSessionTime = lastSessionLog
    ? lastSessionLog.timestamp.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    : '';

  const daysTracked = new Set(logs.map((l) => {
    const d = l.timestamp.toDate();
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  })).size;

  const pieData = buildPieData(logs);
  const lineData = buildLineData(logs);
  const calendarData = buildCalendarData(logs);
  const lineEmotions = Array.from(new Set(logs.map((l) => l.emotion_label)));
  const displayedLogs = showAllLogs ? [...logs].reverse() : [...logs].reverse().slice(0, 10);

  const scoreColor = (s: number) =>
    s > 70
      ? { text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' }
      : s >= 40
        ? { text: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' }
        : { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/40' };

  const trendBadge = (dir: TrendDirection) => {
    switch (dir) {
      case 'improving':
        return { label: 'Improving', cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' };
      case 'declining':
        return { label: 'Declining', cls: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' };
      default:
        return { label: 'Stable', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' };
    }
  };

  const riskBarColor = (v: number) => (v < 30 ? '#22c55e' : v < 60 ? '#f59e0b' : '#ef4444');

  const sc = scoreColor(wellbeing.wellbeingScore);
  const tb = trendBadge(wellbeing.trendDirection);

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* App Key Rotate Modal */}
      {showRotateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Randomize App Key?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your current key will be replaced with a new one. The desktop client will stop sending data until you enter the new key in its settings.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRotateModal(false)}
                className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRandomize}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Generate New Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {profile ? `${profile.name} ${profile.surname}` : (user.displayName ?? 'there')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Your emotional well-being dashboard</p>
          </div>
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* App Key Card */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header row — always visible */}
          <button
            onClick={() => setAppKeyExpanded((v) => !v)}
            className="w-full flex items-center justify-between px-6 py-4 hover:brightness-105 transition-all"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              <h2 className="text-base font-semibold">Your App Key & Client Application</h2>
            </div>
            <svg
              className={`w-5 h-5 text-primary-200 transition-transform duration-200 ${appKeyExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expandable content */}
          {appKeyExpanded && (
            <div className="border-t border-white/20 grid grid-cols-1 sm:grid-cols-2">
              {/* Left: App Key */}
              <div className="px-6 py-5 flex flex-col justify-center gap-3">
                <p className="text-primary-100 text-sm">
                  Enter this key in the AuraTwin desktop client to link your account
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-2xl font-bold tracking-widest">
                    {profile?.app_key ?? '—'}
                  </span>
                  <button
                    onClick={handleCopy}
                    disabled={!profile?.app_key}
                    className="shrink-0 px-5 py-2 bg-white text-primary-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={() => setShowRotateModal(true)}
                    disabled={!profile?.app_key || randomizing}
                    className="shrink-0 px-5 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-lg border border-white/30 transition-colors disabled:opacity-50"
                  >
                    {randomizing ? 'Updating…' : 'Randomize'}
                  </button>
                </div>
              </div>

              {/* Right: Desktop Client */}
              <div className="px-6 py-5 flex flex-col justify-center gap-3 sm:border-l border-t sm:border-t-0 border-white/20">
                <div>
                  <p className="text-sm font-semibold">Desktop Client</p>
                  <p className="text-primary-100 text-xs mt-1">
                    Download the AuraTwin desktop app (macOS & Windows), enter your App Key, and start tracking your emotions.
                  </p>
                </div>
                <a
                  href="https://github.com/AuraTwin/AuraTwin-windowsClient/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start inline-flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-semibold rounded-lg transition-colors border border-white/30"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Download on GitHub
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSessions || '--'}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Last 28 days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Most Common Emotion</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{mostCommon}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Last 7 days</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Last Session</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{lastSessionDate}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{lastSessionTime || 'Most recent log'}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Days Tracked</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{daysTracked || '--'}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Unique days, last 28</p>
          </div>
        </div>

        {/* Wellbeing Score + Burnout Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wellbeing Score Card */}
          <div className={`p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[180px] ${sc.bg}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Wellbeing Score</h2>
                <button
                  onClick={() => setInfoModal('wellbeing')}
                  className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-primary-200 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-colors text-xs font-bold leading-none flex items-center justify-center"
                  aria-label="What is Wellbeing Score?"
                >
                  ?
                </button>
              </div>
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tb.cls}`}>
                {tb.label}
              </span>
            </div>
            {logs.length > 0 ? (
              <div className="flex items-center gap-5">
                <div className="shrink-0">
                  <DigitalTwinFace wellbeingScore={wellbeing.wellbeingScore} size={100} />
                </div>
                <div className="flex flex-col items-start">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-extrabold tracking-tight ${sc.text}`}>
                      {wellbeing.wellbeingScore}
                    </span>
                    <span className="text-lg text-gray-400 dark:text-gray-500 font-medium">/100</span>
                  </div>
                  <p className={`text-sm font-semibold mt-1 ${sc.text}`}>
                    {wellbeing.wellbeingScore > 70
                      ? 'Feeling Good'
                      : wellbeing.wellbeingScore >= 40
                        ? 'Take Care'
                        : 'Rest Needed'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Russell Valence-Arousal &middot; 28 days
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <div className="shrink-0">
                  <DigitalTwinFace wellbeingScore={50} size={100} />
                </div>
                <div className="flex flex-col items-start text-gray-400 dark:text-gray-500">
                  <p className="font-medium text-gray-600 dark:text-gray-400">No data yet</p>
                  <p className="text-sm mt-1">Start tracking to see your wellbeing score.</p>
                </div>
              </div>
            )}
          </div>

          {/* Burnout Risk Card */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Burnout Risk</h2>
              <button
                onClick={() => setInfoModal('burnout')}
                className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-primary-200 hover:text-primary-700 dark:hover:bg-primary-900 dark:hover:text-primary-300 transition-colors text-xs font-bold leading-none flex items-center justify-center"
                aria-label="What is Burnout Risk?"
              >
                ?
              </button>
            </div>
            {logs.length > 0 ? (
              <div className="space-y-4">
                {([
                  ['Emotional Exhaustion', wellbeing.burnoutRisk.emotionalExhaustion] as const,
                  ['Accomplishment Loss', wellbeing.burnoutRisk.personalAccomplishmentLoss] as const,
                  ['Overall Risk', wellbeing.burnoutRisk.overall] as const,
                ]).map(([label, value]) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${value}%`, backgroundColor: riskBarColor(value) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-gray-400 dark:text-gray-500 text-center">
                <p className="font-medium text-gray-600 dark:text-gray-400">No data yet</p>
                <p className="text-sm mt-1">Burnout risk analysis requires emotion data.</p>
              </div>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Maslach-inspired &middot; Last 28 days
            </p>
          </div>
        </div>

        {/* 28-Day Wellbeing Trend */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Wellbeing Trend</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Daily wellbeing score — last 28 days</p>
          {wellbeingChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={wellbeingChartData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number | undefined) => [`${v ?? ''}`, 'Score']} />
                <ReferenceLine y={70} stroke="#22c55e" strokeDasharray="4 4" label={{ value: '70', position: 'right', fontSize: 10, fill: '#22c55e' }} />
                <ReferenceLine y={40} stroke="#ef4444" strokeDasharray="4 4" label={{ value: '40', position: 'right', fontSize: 10, fill: '#ef4444' }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#0ea5e9' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center px-4">
              <p className="font-medium text-gray-600 dark:text-gray-400">No trend data yet</p>
              <p className="text-sm mt-2">Wellbeing trends will appear after you start tracking.</p>
            </div>
          )}
        </div>

        {/* Charts — Emotion Distribution + Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotion Distribution</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={110} paddingAngle={3} dataKey="value">
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] ?? '#94a3b8'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center px-4">
                <div className="text-5xl mb-3">📊</div>
                <p className="font-medium text-gray-600 dark:text-gray-400">No emotion data yet</p>
                <p className="text-sm mt-2">Start a session with the desktop client to see your emotion distribution.</p>
              </div>
            )}
          </div>

          {/* Line chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Emotion Trend</h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Session counts per emotion by day</p>
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={lineData} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  {lineEmotions.map((emotion) => (
                    <Line
                      key={emotion}
                      type="monotone"
                      dataKey={emotion}
                      stroke={EMOTION_COLORS[emotion] ?? '#94a3b8'}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      connectNulls
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center px-4">
                <div className="text-5xl mb-3">📈</div>
                <p className="font-medium text-gray-600 dark:text-gray-400">No trend data yet</p>
                <p className="text-sm mt-2">Emotion trends will appear after multiple days of sessions.</p>
              </div>
            )}
          </div>
        </div>

        {/* 28-Day Emotion Calendar */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Emotion Calendar</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Dominant emotion per day — last 28 days</p>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 pb-1">
                {d}
              </div>
            ))}
            {/* Leading empty cells so day 1 lands in the correct column.
                JS getDay(): 0=Sun … 6=Sat → Monday-first index: (jsDay + 6) % 7 */}
            {calendarData.length > 0 &&
              Array.from({ length: (calendarData[0].d.getDay() + 6) % 7 }, (_, i) => (
                <div key={`empty-${i}`} />
              ))}
            {/* Day cells */}
            {calendarData.map((cell, i) => (
              <div
                key={i}
                title={cell.dominant
                  ? `${cell.monthLabel} · ${cell.dominant} · ${cell.count} session${cell.count !== 1 ? 's' : ''}`
                  : `${cell.monthLabel} · No data`}
                className="rounded-lg p-2 flex flex-col items-center gap-0.5 border border-gray-100 dark:border-gray-700 cursor-default"
                style={{
                  backgroundColor: cell.dominant
                    ? (EMOTION_COLORS[cell.dominant] ?? '#94a3b8') + '28'
                    : undefined,
                }}
              >
                <span className={`text-sm font-bold leading-none ${cell.count > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-300 dark:text-gray-600'}`}>
                  {cell.dateNum}
                </span>
                {cell.dominant ? (
                  <span
                    className="text-[9px] font-semibold leading-none mt-0.5 truncate w-full text-center"
                    style={{ color: EMOTION_COLORS[cell.dominant] ?? '#94a3b8' }}
                  >
                    {cell.dominant}
                  </span>
                ) : (
                  <span className="text-[9px] text-gray-300 dark:text-gray-600 leading-none mt-0.5">—</span>
                )}
                {cell.count > 0 && (
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 leading-none">{cell.count}</span>
                )}
              </div>
            ))}
          </div>
          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-3">
            {Object.entries(EMOTION_COLORS)
              .filter(([k]) => !['Happy', 'Sad', 'Angry', 'Surprised'].includes(k))
              .map(([emotion, color]) => (
                <div key={emotion} className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">{emotion}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Emotion Log Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sessions</h2>
            {logs.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{logs.length} total in last 28 days</span>
            )}
          </div>

          {logs.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="w-1/3 px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                      <th className="w-1/3 px-6 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Emotion</th>
                      <th className="w-1/3 px-6 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {displayedLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="w-1/3 px-6 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </td>
                        <td className="w-1/3 px-6 py-3 text-center">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: EMOTION_COLORS[log.emotion_label] ?? '#94a3b8' }}
                          >
                            {log.emotion_label}
                          </span>
                        </td>
                        <td className="w-1/3 px-6 py-3 text-right text-gray-600 dark:text-gray-400">
                          {log.confidence_score != null ? `${(log.confidence_score * 100).toFixed(1)}%` : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {logs.length > 10 && (
                <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setShowAllLogs(!showAllLogs)}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    {showAllLogs ? 'Show less' : `Show all ${logs.length} sessions`}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
              <p className="font-medium text-gray-600 dark:text-gray-400 mb-1">No sessions recorded yet</p>
              <p className="text-sm">Sessions will appear here after you use the desktop client.</p>
            </div>
          )}
        </div>

        {/* AI Report Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">

          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI-Powered Digital Twin Report
            </h2>
            <div className="flex items-center gap-2 shrink-0">
              {reports.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowTldr((v) => !v)}
                    title="Show a one-sentence summary of each section"
                    className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      showTldr
                        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    TL;DR
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    title="Download this report as PDF"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleGenerateReport()}
                disabled={generatingReport}
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60"
              >
                {generatingReport ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating…
                  </>
                ) : (
                  'Generate Report'
                )}
              </button>
            </div>
          </div>

          {/* Staleness warning */}
          {reportStaleWarning && !generatingReport && (
            <div className="mx-6 mb-2 flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Report generated recently</p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                  Your last report is less than 24 hours old. Generating a new one will use additional API credits.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setReportStaleWarning(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/40 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateReport(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
                >
                  Generate anyway
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {reportError && (
            <div className="mx-6 mb-2 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {reportError}
            </div>
          )}

          {/* Report Navigator */}
          {reports.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2 flex items-center justify-between bg-gray-50 dark:bg-gray-900/40">
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => i - 1)}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                Newer
              </button>

              <div className="text-center text-xs">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Report {currentIndex + 1} of {reports.length}
                </span>
                <span className="mx-1.5 text-gray-300 dark:text-gray-600">·</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {reports[currentIndex].generated_at.toDate().toLocaleDateString('en-US', { dateStyle: 'medium' })}
                  {' at '}
                  {reports[currentIndex].generated_at.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentIndex((i) => i + 1)}
                disabled={currentIndex === reports.length - 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Older
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* TL;DR panel */}
          {showTldr && reports.length > 0 && (() => {
            const tldr = buildTldr(reports[currentIndex].content);
            return tldr.length > 0 ? (
              <div className="border-t border-gray-100 dark:border-gray-700 px-6 py-5 bg-primary-50/60 dark:bg-primary-900/10">
                <p className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-3">TL;DR — Quick Summary</p>
                <div className="space-y-2.5">
                  {tldr.map(({ heading, sentence }) => (
                    <div key={heading} className="flex gap-4 items-baseline">
                      <span className="shrink-0 text-[10px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-wide w-36 leading-snug pt-px">
                        {heading}
                      </span>
                      <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {sentence.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={i} className="font-semibold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Report content — rendered as Markdown */}
          <div className="border-t border-gray-100 dark:border-gray-700">
            {reports.length > 0 ? (
              <div className="px-6 py-6">
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-xs font-bold text-primary-600 dark:text-primary-400 mt-6 mb-2 first:mt-0 uppercase tracking-widest">
                        {children}
                      </h2>
                    ),
                    p: ({ children }) => (
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mt-1 mb-0 space-y-2 list-none pl-0">{children}</ul>
                    ),
                    li: ({ children }) => (
                      <li className="flex gap-2.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
                    ),
                  }}
                >
                  {reports[currentIndex].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                No report generated yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* Info Modals */}
    {/* Wellbeing Score Info Modal */}
    {infoModal === 'wellbeing' && (
      <InfoModal title="How is Wellbeing Score calculated?" onClose={() => setInfoModal(null)}>
        <p>
          Your <strong>Wellbeing Score</strong> is a number from 0 to 100 that shows how emotionally
          well you&apos;re doing, based on the emotions detected over the last 28 days.
        </p>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Score ranges</p>
          <div className="space-y-1">
            {[
              { range: '80 – 100', label: 'Very Happy', color: 'text-green-600 dark:text-green-400' },
              { range: '60 – 79', label: 'Happy', color: 'text-emerald-600 dark:text-emerald-400' },
              { range: '40 – 59', label: 'Neutral', color: 'text-yellow-600 dark:text-yellow-400' },
              { range: '20 – 39', label: 'Sad', color: 'text-orange-600 dark:text-orange-400' },
              { range: '0 – 19', label: 'Exhausted', color: 'text-red-600 dark:text-red-400' },
            ].map(({ range, label, color }) => (
              <div key={range} className="flex items-center gap-3">
                <span className="text-xs font-mono w-16 text-gray-500 dark:text-gray-400">{range}</span>
                <span className={`text-xs font-semibold ${color}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-2">How it works</p>
          <p>
            Each detected emotion gets two hidden values: how <em>positive</em> it feels (valence)
            and how <em>activating</em> it is (arousal). Calm positive emotions score the highest;
            high-stress negative emotions score the lowest.
          </p>
          <p className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
            Score = (positivity × 0.7 + calmness × 0.3) × 100
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Emotion values</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            {[
              { e: 'Happy', v: 'High positive, moderate energy' },
              { e: 'Neutral', v: 'Mid positive, mid energy' },
              { e: 'Surprise', v: 'Moderate positive, high energy' },
              { e: 'Contempt', v: 'Low positive, low energy' },
              { e: 'Disgust', v: 'Low positive, moderate energy' },
              { e: 'Sad', v: 'Low positive, very low energy' },
              { e: 'Angry', v: 'Low positive, high energy' },
              { e: 'Fear', v: 'Low positive, very high energy' },
            ].map(({ e, v }) => (
              <div key={e}>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{e}</span>
                <span className="text-gray-500 dark:text-gray-400"> — {v}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          <a
            href="https://en.wikipedia.org/wiki/Emotional_granularity"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-500 transition-colors"
          >
            Based on Russell&apos;s Valence-Arousal Circumplex model of emotions.
          </a>
        </p>
      </InfoModal>
    )}

    {/* Burnout Risk Info Modal */}
    {infoModal === 'burnout' && (
      <InfoModal title="How is Burnout Risk calculated?" onClose={() => setInfoModal(null)}>
        <p>
          <strong>Burnout Risk</strong> shows how likely you are to be heading toward burnout,
          based on your emotion patterns over the last 28 days. It goes from 0% (no risk) to
          100% (very high risk).
        </p>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Emotional Exhaustion</p>
          <p>
            Measures how often you felt drained or stressed — specifically the share of moments
            when Sad, Angry, or Fear were detected. The more frequent these emotions, the higher
            the exhaustion score.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Accomplishment Loss</p>
          <p>
            Measures how little joy you&apos;re experiencing — it&apos;s simply how rarely
            Happy was detected. If you&apos;re almost never feeling happy, this score rises.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">Overall Risk</p>
          <p>
            A weighted average of the two scores above. Emotional Exhaustion carries more weight
            because sustained stress is the strongest early sign of burnout.
          </p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-2">Trend</p>
          <div className="space-y-1 text-xs">
            <div><span className="font-semibold text-green-600 dark:text-green-400">Improving</span> — your scores are getting better over time</div>
            <div><span className="font-semibold text-yellow-600 dark:text-yellow-400">Stable</span> — not much change recently</div>
            <div><span className="font-semibold text-red-600 dark:text-red-400">Declining</span> — scores are worsening, worth paying attention to</div>
          </div>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          <a
            href="https://en.wikipedia.org/wiki/Maslach_Burnout_Inventory"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary-500 transition-colors"
          >
            Inspired by the Maslach Burnout Inventory, a widely used tool in workplace psychology.
          </a>
        </p>
      </InfoModal>
    )}
    </>
  );
}

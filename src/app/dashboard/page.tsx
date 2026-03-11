'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getUserProfile,
  getEmotionLogs,
  saveReport,
  getLastReport,
  UserProfile,
  EmotionLog,
  WellbeingReport,
} from '@/lib/firestore';
import { generateWellbeingReport } from '@/lib/gemini';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

function formatDate(ts: { toDate: () => Date }): string {
  return ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(ts: { toDate: () => Date }): string {
  return ts.toDate().toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function buildPieData(logs: EmotionLog[]) {
  const counts: Record<string, number> = {};
  logs.forEach((l) => {
    counts[l.emotion_label] = (counts[l.emotion_label] ?? 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
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
  const [report, setReport] = useState<WellbeingReport | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState('');
  const [copied, setCopied] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [showAllLogs, setShowAllLogs] = useState(false);
  const [appKeyExpanded, setAppKeyExpanded] = useState(false);

  const loadData = useCallback(async (uid: string) => {
    setDataLoading(true);
    try {
      const [p, l, r] = await Promise.all([
        getUserProfile(uid),
        getEmotionLogs(uid, 14),
        getLastReport(uid),
      ]);
      setProfile(p);
      setLogs(l);
      setReport(r);
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

  const handleGenerateReport = async () => {
    if (!user) return;
    setGeneratingReport(true);
    setReportError('');
    try {
      const freshLogs = await getEmotionLogs(user.uid, 14);
      const content = await generateWellbeingReport(freshLogs);
      await saveReport(user.uid, content);
      setReport({ generated_at: { toDate: () => new Date() } as WellbeingReport['generated_at'], content });
    } catch (err: unknown) {
      setReportError(err instanceof Error ? err.message : 'Failed to generate report.');
    } finally {
      setGeneratingReport(false);
    }
  };

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
    ? lastSessionLog.timestamp.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : '';

  const pieData = buildPieData(logs);
  const displayedLogs = showAllLogs ? [...logs].reverse() : [...logs].reverse().slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <h2 className="text-base font-semibold">Your App Key</h2>
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
                  Enter this key in the AuraTwin Windows client to link your account
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
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
              </div>

              {/* Right: Windows Client */}
              <div className="px-6 py-5 flex flex-col justify-center gap-3 sm:border-l border-t sm:border-t-0 border-white/20">
                <div>
                  <p className="text-sm font-semibold">Windows Client</p>
                  <p className="text-primary-100 text-xs mt-1">
                    Download the AuraTwin desktop app, enter your App Key, and start tracking your emotions in real time.
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalSessions || '--'}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Last 14 days</p>
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
        </div>

        {/* Emotion Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Emotion Distribution</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] ?? '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-center px-4">
              <div className="text-5xl mb-3">📊</div>
              <p className="font-medium text-gray-600 dark:text-gray-400">No emotion data yet</p>
              <p className="text-sm mt-2">
                Download the Windows client, enter your App Key, and start a session to see your emotion distribution here.
              </p>
            </div>
          )}
        </div>

        {/* Emotion Log Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Sessions</h2>
            {logs.length > 0 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{logs.length} total in last 14 days</span>
            )}
          </div>

          {logs.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Emotion</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                    {displayedLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: EMOTION_COLORS[log.emotion_label] ?? '#94a3b8' }}
                          >
                            {log.emotion_label}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-600 dark:text-gray-400">
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
              <p className="text-sm">Sessions will appear here after you use the Windows client.</p>
            </div>
          )}
        </div>

        {/* AI Report Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Digital Twin Report</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Your digital twin has been silently observing your emotional patterns through every session. Each capture makes its understanding of you deeper and more accurate — the more data it has, the more faithfully it can reflect your inner state. Generate a report to see what your twin has observed. Analysis covers up to the last 14 days of data.
              </p>
              {report && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  Last generated: {report.generated_at.toDate().toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
              )}
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="shrink-0 px-5 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60"
            >
              {generatingReport ? 'Generating…' : 'Generate Report'}
            </button>
          </div>

          {reportError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {reportError}
            </div>
          )}

          {report ? (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl divide-y divide-gray-200 dark:divide-gray-600 text-sm text-gray-700 dark:text-gray-300">
              {report.content.split('\n').filter((line) => line.trim()).map((line, i) => (
                <div key={i} className="px-5 py-3 leading-relaxed">
                  {line}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-5 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              No report generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

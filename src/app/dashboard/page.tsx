'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const EMOTION_COLORS: Record<string, string> = {
  Happy: '#22c55e',
  Sad: '#3b82f6',
  Angry: '#ef4444',
  Surprised: '#f59e0b',
  Neutral: '#94a3b8',
  Fear: '#8b5cf6',
  Disgust: '#14b8a6',
};

const EMOTION_SCORE: Record<string, number> = {
  Happy: 100,
  Surprised: 70,
  Neutral: 50,
  Sad: 30,
  Fear: 25,
  Angry: 20,
  Disgust: 15,
};

function formatDate(ts: { toDate: () => Date }): string {
  return ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function buildPieData(logs: EmotionLog[]) {
  const counts: Record<string, number> = {};
  logs.forEach((l) => {
    counts[l.emotion_label] = (counts[l.emotion_label] ?? 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function buildTimelineData(logs: EmotionLog[]) {
  const byDay: Record<string, number[]> = {};
  logs.forEach((l) => {
    const day = l.timestamp.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (!byDay[day]) byDay[day] = [];
    byDay[day].push(EMOTION_SCORE[l.emotion_label] ?? 50);
  });
  return Object.entries(byDay).map(([date, scores]) => ({
    date,
    score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
  }));
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
  const lastSession = logs.length ? formatDate(logs[logs.length - 1].timestamp) : '--';

  const pieData = buildPieData(logs);
  const timelineData = buildTimelineData(logs);

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading…</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {profile ? `${profile.name} ${profile.surname}` : (user.displayName ?? 'there')}
          </h1>
          <p className="text-gray-500 text-sm mt-1">Your emotional well-being dashboard</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* App Key Card */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold mb-1">Your App Key</h2>
              <p className="text-primary-100 text-sm mb-3">
                Enter this key in the AuraTwin Windows client to link your account
              </p>
              <div className="font-mono text-2xl font-bold tracking-widest">
                {profile?.app_key ?? '—'}
              </div>
            </div>
            <button
              onClick={handleCopy}
              disabled={!profile?.app_key}
              className="shrink-0 px-5 py-2 bg-white text-primary-600 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Total Sessions</p>
            <p className="text-3xl font-bold text-gray-900">{totalSessions || '--'}</p>
            <p className="text-xs text-gray-400 mt-1">Last 14 days</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Most Common Emotion</p>
            <p className="text-3xl font-bold text-gray-900">{mostCommon}</p>
            <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Last Session</p>
            <p className="text-3xl font-bold text-gray-900">{lastSession}</p>
            <p className="text-xs text-gray-400 mt-1">Most recent log</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Emotion Distribution</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
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
              <div className="h-[280px] flex flex-col items-center justify-center text-gray-400">
                <div className="text-5xl mb-3">📊</div>
                <p className="font-medium">No data yet</p>
                <p className="text-sm mt-1">Start a session with the Windows client to see your emotion distribution</p>
              </div>
            )}
          </div>

          {/* Line Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Well-being Score Over Time</h2>
            {timelineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Well-being Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[280px] flex flex-col items-center justify-center text-gray-400">
                <div className="text-5xl mb-3">📈</div>
                <p className="font-medium">No timeline data yet</p>
                <p className="text-sm mt-1">Your daily well-being score will appear here once you start logging sessions</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Report Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">AI Well-being Report</h2>
              {report && (
                <p className="text-xs text-gray-400 mt-1">
                  Generated on {report.generated_at.toDate().toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
              )}
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={generatingReport}
              className="shrink-0 px-5 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-60"
            >
              {generatingReport ? 'Generating…' : 'Generate Weekly Report'}
            </button>
          </div>

          {reportError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {reportError}
            </div>
          )}

          {report ? (
            <div className="bg-gray-50 rounded-xl p-5 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {report.content}
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              No report generated yet. Click &quot;Generate Weekly Report&quot; to get your personalized AI analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

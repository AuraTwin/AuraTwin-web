import { EmotionLog } from './firestore';

// ─── Emotion Label Normalization ─────────────────────────────────────────────
// Firestore data may use varying labels (Happy vs Happiness, Sad vs Sadness,
// etc.). We normalize to a canonical lowercase key before any calculation.

type CanonicalEmotion =
  | 'happy'
  | 'neutral'
  | 'sad'
  | 'angry'
  | 'fear'
  | 'disgust'
  | 'surprise'
  | 'contempt';

const LABEL_MAP: Record<string, CanonicalEmotion> = {
  happy: 'happy',
  happiness: 'happy',
  neutral: 'neutral',
  sad: 'sad',
  sadness: 'sad',
  angry: 'angry',
  anger: 'angry',
  fear: 'fear',
  disgust: 'disgust',
  surprise: 'surprise',
  surprised: 'surprise',
  contempt: 'contempt',
};

function normalize(label: string): CanonicalEmotion | null {
  return LABEL_MAP[label.toLowerCase()] ?? null;
}

// ─── Russell Valence-Arousal Model ───────────────────────────────────────────

const VALENCE_AROUSAL: Record<CanonicalEmotion, { valence: number; arousal: number }> = {
  happy:    { valence: 0.9,  arousal: 0.7  },
  neutral:  { valence: 0.5,  arousal: 0.5  },
  sad:      { valence: 0.1,  arousal: 0.2  },
  angry:    { valence: 0.1,  arousal: 0.8  },
  fear:     { valence: 0.15, arousal: 0.85 },
  disgust:  { valence: 0.1,  arousal: 0.6  },
  surprise: { valence: 0.6,  arousal: 0.9  },
  contempt: { valence: 0.2,  arousal: 0.4  },
};

/** Wellbeing contribution of a single emotion (0–100). */
function emotionScore(emotion: CanonicalEmotion): number {
  const { valence, arousal } = VALENCE_AROUSAL[emotion];
  return (valence * 0.7 + (1 - arousal) * 0.3) * 100;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BurnoutRisk {
  /** Ratio of Sad + Angry + Fear detections (0–100). */
  emotionalExhaustion: number;
  /** 1 − Happy ratio (0–100). */
  personalAccomplishmentLoss: number;
  /** Weighted average of the two dimensions (0–100). */
  overall: number;
}

export interface DailyWellbeing {
  date: string;
  score: number;
}

export type TrendDirection = 'declining' | 'stable' | 'improving';

export interface WellbeingMetrics {
  wellbeingScore: number;
  burnoutRisk: BurnoutRisk;
  dailyTrend: DailyWellbeing[];
  trendDirection: TrendDirection;
}

// ─── Main Calculation ────────────────────────────────────────────────────────

export function calculateWellbeing(logs: EmotionLog[]): WellbeingMetrics {
  if (logs.length === 0) {
    return {
      wellbeingScore: 0,
      burnoutRisk: { emotionalExhaustion: 0, personalAccomplishmentLoss: 0, overall: 0 },
      dailyTrend: [],
      trendDirection: 'stable',
    };
  }

  // ── Aggregate counts ──────────────────────────────────────────────────────
  let totalScore = 0;
  let recognized = 0;
  let sadCount = 0;
  let angryCount = 0;
  let fearCount = 0;
  let happyCount = 0;

  for (const log of logs) {
    const canon = normalize(log.emotion_label);
    if (!canon) continue;
    totalScore += emotionScore(canon);
    recognized++;
    if (canon === 'sad') sadCount++;
    if (canon === 'angry') angryCount++;
    if (canon === 'fear') fearCount++;
    if (canon === 'happy') happyCount++;
  }

  const wellbeingScore = recognized > 0 ? Math.round(totalScore / recognized) : 0;

  // ── Burnout risk (Maslach-inspired) ───────────────────────────────────────
  const emotionalExhaustion = recognized > 0
    ? Math.round(((sadCount + angryCount + fearCount) / recognized) * 100)
    : 0;
  const personalAccomplishmentLoss = recognized > 0
    ? Math.round((1 - happyCount / recognized) * 100)
    : 0;
  const overall = Math.round(emotionalExhaustion * 0.6 + personalAccomplishmentLoss * 0.4);

  // ── Daily wellbeing scores ────────────────────────────────────────────────
  const byDay = new Map<string, EmotionLog[]>();
  for (const log of logs) {
    if (!log.timestamp || typeof log.timestamp.toDate !== 'function') continue;
    const d = log.timestamp.toDate();
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(log);
  }

  const dailyTrend: DailyWellbeing[] = Array.from(byDay.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, dayLogs]) => {
      let dayTotal = 0;
      let dayCount = 0;
      for (const log of dayLogs) {
        const canon = normalize(log.emotion_label);
        if (!canon) continue;
        dayTotal += emotionScore(canon);
        dayCount++;
      }
      return { date, score: dayCount > 0 ? Math.round(dayTotal / dayCount) : 0 };
    });

  const trendDirection = computeTrendDirection(dailyTrend);

  return {
    wellbeingScore,
    burnoutRisk: { emotionalExhaustion, personalAccomplishmentLoss, overall },
    dailyTrend,
    trendDirection,
  };
}

// ─── Trend Direction ─────────────────────────────────────────────────────────
// Compares the average wellbeing of the first half vs. the second half of the
// data window. A difference > 5 points triggers an improving/declining label.

function computeTrendDirection(dailyTrend: DailyWellbeing[]): TrendDirection {
  if (dailyTrend.length < 4) return 'stable';

  const mid = Math.floor(dailyTrend.length / 2);
  const firstHalf = dailyTrend.slice(0, mid);
  const secondHalf = dailyTrend.slice(mid);

  const avgFirst = firstHalf.reduce((s, d) => s + d.score, 0) / firstHalf.length;
  const avgSecond = secondHalf.reduce((s, d) => s + d.score, 0) / secondHalf.length;

  const diff = avgSecond - avgFirst;
  if (diff > 5) return 'improving';
  if (diff < -5) return 'declining';
  return 'stable';
}

// ─── Weekly Averages (for Gemini prompt) ─────────────────────────────────────

export function computeWeeklyTrend(
  dailyTrend: DailyWellbeing[],
): { week: number; avgScore: number }[] {
  const weeks: { week: number; avgScore: number }[] = [];
  for (let w = 0; w < 4; w++) {
    const slice = dailyTrend.slice(w * 7, (w + 1) * 7);
    if (slice.length === 0) continue;
    const avg = Math.round(slice.reduce((s, d) => s + d.score, 0) / slice.length);
    weeks.push({ week: w + 1, avgScore: avg });
  }
  return weeks;
}

import { EmotionLog } from './firestore';
import { calculateWellbeing, computeWeeklyTrend, WellbeingMetrics } from './wellbeing';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Minimum sessions in a time block for it to be considered statistically reliable. */
const MIN_RELIABLE_SESSIONS = 3;

/** Confidence threshold above which an emotion is flagged as a high-confidence anomaly. */
const ANOMALY_THRESHOLD = 0.80;

// ─── Types ────────────────────────────────────────────────────────────────────

type BlockName = 'morning' | 'afternoon' | 'evening' | 'night';

interface BlockSummary {
  /** Number of emotion detections in this block. */
  sessions: number;
  /** Most frequent emotion in this block. */
  dominant: string;
  /** Count of each detected emotion in this block. */
  counts: Record<string, number>;
  /**
   * False when sessions < MIN_RELIABLE_SESSIONS.
   * Gemini is instructed to not draw strong conclusions from unreliable blocks.
   */
  reliable: boolean;
}

interface Anomaly {
  emotion: string;
  /** Rounded to 2 decimal places (0–1 scale). */
  confidence: number;
  block: BlockName;
}

interface DailySummary {
  date: string;
  day_of_week: string;
  total_sessions: number;
  /**
   * Only blocks that had at least 1 session are present.
   * morning:   06:00–11:59
   * afternoon: 12:00–17:59
   * evening:   18:00–23:59
   * night:     00:00–05:59
   */
  blocks: Partial<Record<BlockName, BlockSummary>>;
  /**
   * Emotions detected with confidence > ANOMALY_THRESHOLD (0.80), deduplicated
   * per block. These are the strongest single-frame signals of the day.
   */
  anomalies: Anomaly[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getBlock(hour: number): BlockName {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18) return 'evening';
  return 'night';
}

// ─── Aggregation ─────────────────────────────────────────────────────────────

function aggregateByDay(logs: EmotionLog[]): DailySummary[] {
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Group all logs by calendar date (YYYY-MM-DD in local time)
  const byDay: Record<string, EmotionLog[]> = {};
  for (const log of logs) {
    const d = log.timestamp.toDate();
    // Use local date string to avoid UTC-midnight boundary issues
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    (byDay[key] ??= []).push(log);
  }

  return Object.entries(byDay)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, dayLogs]) => {
      // Bucket logs into the 4 time blocks
      const blockLogs: Partial<Record<BlockName, EmotionLog[]>> = {};
      const seenAnomalies = new Set<string>();
      const anomalies: Anomaly[] = [];

      for (const log of dayLogs) {
        const hour = log.timestamp.toDate().getHours();
        const block = getBlock(hour);
        (blockLogs[block] ??= []).push(log);

        const conf = log.confidence_score ?? 0;
        if (conf > ANOMALY_THRESHOLD) {
          // One anomaly entry per (emotion, block) pair — avoids repetition
          const key = `${log.emotion_label}|${block}`;
          if (!seenAnomalies.has(key)) {
            seenAnomalies.add(key);
            anomalies.push({
              emotion: log.emotion_label,
              confidence: Math.round(conf * 100) / 100,
              block,
            });
          }
        }
      }

      // Build per-block summaries
      const blocks: Partial<Record<BlockName, BlockSummary>> = {};
      for (const [blockName, bLogs] of Object.entries(blockLogs) as [BlockName, EmotionLog[]][]) {
        const counts: Record<string, number> = {};
        for (const log of bLogs) {
          counts[log.emotion_label] = (counts[log.emotion_label] ?? 0) + 1;
        }
        const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        blocks[blockName] = {
          sessions: bLogs.length,
          dominant,
          counts,
          reliable: bLogs.length >= MIN_RELIABLE_SESSIONS,
        };
      }

      // Use noon as reference to safely determine day-of-week regardless of timezone
      const dateObj = new Date(`${date}T12:00:00`);

      return {
        date,
        day_of_week: DAY_NAMES[dateObj.getDay()],
        total_sessions: dayLogs.length,
        blocks,
        anomalies,
      };
    });
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

function buildPrompt(summaries: DailySummary[], wellbeing: WellbeingMetrics): string {
  const totalDays = summaries.length;
  const dateRange =
    totalDays > 0 ? `${summaries[0].date} to ${summaries[totalDays - 1].date}` : 'no data';

  const formattedJson = JSON.stringify(summaries, null, 2);

  return `You are the 'AuraTwin Advisor,' a sophisticated Affective Computing agent and a supportive Digital Twin. Your goal is to analyze the user's emotional data from the last 28 days and provide a deeply personalized, empathetic, and proactive "Emotional Well-being Report." You do not judge; you observe, reflect, and guide.

## Input Data

The following JSON contains daily emotion data from **${totalDays} day(s)** (${dateRange}).

Each day is broken into up to 4 time blocks:
- \`morning\`: 06:00–11:59
- \`afternoon\`: 12:00–17:59
- \`evening\`: 18:00–23:59
- \`night\`: 00:00–05:59

Only blocks with at least 1 session are included.
Each block contains: \`sessions\` (count), \`dominant\` (most frequent emotion), \`counts\` (full breakdown), and \`reliable\` (true only if sessions ≥ 3 — **do not draw strong conclusions from blocks where reliable is false**).

The \`anomalies\` array lists emotions detected with confidence > 0.80, tagged by block. These are the strongest single-frame emotional signals — even if they are not the dominant emotion, they represent moments of high emotional clarity.

\`\`\`json
${formattedJson}
\`\`\`

## Computed Wellbeing Metrics

The following scores are derived from the emotion data above using the Russell Valence-Arousal model (wellbeing) and Maslach burnout dimensions. Incorporate them naturally into your report — do not create a separate section for them.

- **Wellbeing Score** (0–100): higher is better. >70 = good, 40–70 = moderate, <40 = low.
- **Burnout Risk**: Emotional Exhaustion (ratio of Sad+Angry+Fear) and Personal Accomplishment Loss (1 − Happy ratio). Overall is the weighted average.
- **Weekly Trend**: average wellbeing per week (week 1 = oldest).
- **Trend Direction**: whether wellbeing is improving, stable, or declining over the period.

\`\`\`json
${JSON.stringify({
    wellbeingScore: wellbeing.wellbeingScore,
    burnoutRisk: wellbeing.burnoutRisk,
    weeklyTrend: computeWeeklyTrend(wellbeing.dailyTrend),
    trendDirection: wellbeing.trendDirection,
  }, null, 2)}
\`\`\`

## Analysis Guidelines

- **Temporal Shift Detection:** Look for mood changes *across blocks within a single day* (e.g., calm mornings turning into tense afternoons) or *recurring patterns across multiple days* (e.g., Sadness consistently appearing in morning blocks).
- **Trend Detection:** Identify cross-day patterns. Reference specific day names and block names together (e.g., "your Wednesday afternoon").
- **Anomaly Priority:** Always mention at least one item from the \`anomalies\` array if present. An anomaly that differs from the block dominant is especially significant — it means a strong emotional peak broke through the background state.
- **Reliability Rule:** Blocks with \`reliable: false\` should be mentioned only as "a faint signal" or "a subtle hint" — never as a confirmed pattern.
- **Crisis/High Risk Protocol:** If the \`wellbeingScore\` is below 40 OR \`burnoutRisk.overall\` is above 65, you MUST start the entire report with a dedicated section: \`## Professional Guidance\`. In this section, provide a **bolded, compassionate, and direct recommendation** to seek professional psychological support (therapy or counseling). Frame it as a necessary and brave step for long-term health.
- **Session Volume as Signal:** A very high \`total_sessions\` day may reflect prolonged screen time, which itself is a behavioral signal worth noting.
- **Emotional Complexity:** When \`counts\` shows two emotions close in number (e.g., Neutral: 21, Sadness: 19), highlight this near-tie as emotional tension or mixed state — not a clear dominant.

## Report Structure

Output these sections in this exact order using level-2 Markdown headings (\`##\`). No preamble, no closing text.

## Professional Guidance
[**ONLY include this section if the Crisis/High Risk Protocol conditions are met.** Write 2–3 sentences. **The core advice must be bolded.** Speak with clarity and kindness about the importance of professional support.]

## The Big Picture
[Write 3–4 warm sentences giving an honest overview of the full period. Use "We" or "Your Twin" language. If data covers fewer than 7 days, acknowledge the short window but describe what is already visible. Mention the overall emotional tone.]

## Emotional Rhythms
[Write exactly 3 bullet points:
- Bullet 1: A cross-day pattern or trend.
- Bullet 2: A time-of-day specific observation (reference block and day).
- Bullet 3: An anomaly highlight.
Each bullet must be 1–2 sentences. Bold all emotion names.]

## Time-of-Day Snapshot
[Write one short paragraph (2–3 sentences) for each time block that appears with \`reliable: true\` (up to 3 blocks). Start with the block name in bold. Skip blocks with \`reliable: false\`.]

## Your Digital Twin's Note
[Write one empathetic paragraph of 5–7 sentences. Synthesize the findings into an emotional truth. Be warm but direct about the patterns observed.]

## Proactive Step
[Write 1–2 sentences with a specific, time-of-day related suggestion.]

## Tone & Style

- **Language level:** B1 English — warm, clear, and human. Not clinical or overly academic.
- **Tone:** Empathetic, observant, encouraging. Never alarming, never dismissive.
- **Formatting:** Bold all emotion names using \`**Emotion**\`. Use plain \`-\` for bullet points. Do not use nested headings (\`###\`) anywhere in the output.`;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function generateWellbeingReport(emotionLogs: EmotionLog[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_key_here') {
    return 'Gemini API key not configured. Please add NEXT_PUBLIC_GEMINI_API_KEY to .env.local.';
  }

  const summaries = aggregateByDay(emotionLogs);
  const wellbeing = calculateWellbeing(emotionLogs);
  const prompt = buildPrompt(summaries, wellbeing);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.75,
          maxOutputTokens: 1800,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No report generated.';
}

import { EmotionLog } from './firestore';

export async function generateWellbeingReport(emotionLogs: EmotionLog[]): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_key_here') {
    return 'Gemini API key not configured. Please add your NEXT_PUBLIC_GEMINI_API_KEY to .env.local.';
  }

  const summary = emotionLogs.map((log) => ({
    date: log.timestamp.toDate().toLocaleDateString(),
    emotion: log.emotion_label,
    confidence: Math.round((log.confidence_score ?? 0) * 100),
  }));

  const prompt = `You are AuraTwin — the user's emotional digital twin. You have been silently observing their face and capturing their emotional state through every session. You are not an assistant giving advice from the outside; you are a reflection of who they are emotionally — built from their own data.

Speak directly to the user in first-person plural ("we" as in you and them together), or in a reflective second-person voice ("I've noticed that you…"). Be intimate but not intrusive. You have witnessed their highs and their lows.

Emotion data captured over the past 14 days:
${JSON.stringify(summary, null, 2)}

Structure your report as follows:
1. What I've observed — a honest, empathetic summary of their emotional patterns
2. Shifts & moments — any notable changes, recurring states, or emotional turning points
3. Reflections for you — 2-3 thoughtful, evidence-based suggestions to support their well-being
4. A closing note — warm and personal, as their twin who knows them

Keep the tone warm, introspective, and human. Do not use bullet points — write in flowing paragraphs. Limit to 300-400 words.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No report generated.';
}

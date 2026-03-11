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

  const prompt = `You are AuraTwin's Well-being Assistant. Analyze the following emotion log data from the past 14 days and generate a personalized, empathetic well-being report.

Emotion data:
${JSON.stringify(summary, null, 2)}

Please provide:
1. A brief summary of the user's emotional patterns over the past two weeks
2. Notable trends or shifts in emotional states
3. 2-3 actionable, evidence-based recommendations for improving well-being
4. An encouraging closing message

Keep the tone warm, supportive, and professional. Limit the report to 300-400 words.`;

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

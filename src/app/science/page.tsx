export const metadata = {
  title: 'Science — AuraTwin',
  description: 'How AuraTwin detects emotions, calculates your wellbeing score, and measures burnout risk.',
};

const emotions = [
  { name: 'Happy',    valence: 0.90, arousal: 0.70 },
  { name: 'Neutral',  valence: 0.50, arousal: 0.50 },
  { name: 'Surprise', valence: 0.60, arousal: 0.90 },
  { name: 'Contempt', valence: 0.20, arousal: 0.40 },
  { name: 'Disgust',  valence: 0.10, arousal: 0.60 },
  { name: 'Sad',      valence: 0.10, arousal: 0.20 },
  { name: 'Angry',    valence: 0.10, arousal: 0.80 },
  { name: 'Fear',     valence: 0.15, arousal: 0.85 },
];

const scoreRanges = [
  { range: '80–100', label: 'Very Happy', dot: 'bg-green-500' },
  { range: '60–79',  label: 'Happy',      dot: 'bg-emerald-500' },
  { range: '40–59',  label: 'Neutral',    dot: 'bg-yellow-500' },
  { range: '20–39',  label: 'Sad',        dot: 'bg-orange-500' },
  { range: '0–19',   label: 'Exhausted',  dot: 'bg-red-500' },
];

export default function SciencePage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-900 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-5">
            How It{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AuraTwin reads your facial expressions in real time, maps them to emotional states, and turns that data into two metrics: a wellbeing score and a burnout risk indicator.
          </p>
        </div>
      </section>

      {/* Step 1 — Emotion Detection */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Step 1
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
              Emotion Detection
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              A camera captures your face. A face detector finds it in the frame, then the emotion model classifies what it sees into one of 8 categories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Model card */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                The model: <code className="text-primary-600 dark:text-primary-400 font-mono text-sm">enet_b0_8_best_afew</code>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                An EfficientNet-B0 network fine-tuned for facial emotion recognition. EfficientNet-B0 is a compact image classifier — accurate without requiring heavy hardware. It runs via <strong>ONNX Runtime</strong>, which keeps memory usage low and inference fast.
              </p>
              <a
                href="https://github.com/av-savchenko/hsemotion-onnx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                <svg className="w-4 h-4 flex-none" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.92.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                av-savchenko/hsemotion-onnx
              </a>
              <div className="mt-5 pt-5 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4 text-xs">
                {[
                  ['Architecture', 'EfficientNet-B0'],
                  ['Runtime',      'ONNX Runtime'],
                  ['Face detector','OpenCV DNN (ResNet-10 SSD)'],
                  ['Infrastructure','AWS t2.micro'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="text-gray-400 dark:text-gray-500 block">{label}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dataset card */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal data-reveal-delay="100">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                Training data: AffectNet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-5">
                ~450,000 real-world facial images collected from the internet — not posed or staged. People photographed in natural conditions across a wide range of demographics, lighting, and angles.
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
                8 Detected Emotions
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Happy',    emoji: '😊' },
                  { label: 'Neutral',  emoji: '😐' },
                  { label: 'Sad',      emoji: '😢' },
                  { label: 'Angry',    emoji: '😠' },
                  { label: 'Fear',     emoji: '😨' },
                  { label: 'Disgust',  emoji: '🤢' },
                  { label: 'Surprise', emoji: '😮' },
                  { label: 'Contempt', emoji: '😒' },
                ].map(({ label, emoji }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-xs font-medium bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <span>{emoji}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 — Wellbeing Score */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400">
              Step 2
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
              Wellbeing Score
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Each emotion detection maps to a 0–100 score based on how positive and how calming that emotion is. Your score is the average across all detections in the last 28 days.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left col */}
            <div className="space-y-5">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Based on{' '}
                  <a
                    href="https://en.wikipedia.org/wiki/Emotional_granularity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline"
                  >
                    Russell&apos;s Valence-Arousal model
                  </a>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Emotions sit on two axes: <strong>valence</strong> (how positive or negative it feels) and <strong>arousal</strong> (how energizing or calming it is). A relaxed, happy moment scores much higher than an anxious or angry one.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium uppercase tracking-wide">
                    Formula
                  </p>
                  <p className="font-mono text-sm text-gray-900 dark:text-white leading-relaxed">
                    score =<br />
                    &nbsp;&nbsp;(valence × 0.7 + (1 − arousal) × 0.3) × 100
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Valence is weighted at 70% because positivity has a stronger effect on wellbeing than energy level.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal data-reveal-delay="80">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Score Ranges</h3>
                <div className="space-y-2.5">
                  {scoreRanges.map(({ range, label, dot }) => (
                    <div key={range} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-none ${dot}`} />
                      <span className="font-mono text-xs text-gray-400 dark:text-gray-500 w-14">{range}</span>
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right col — emotion table */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal data-reveal-delay="160">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Emotion Values</h3>
              <div className="flex items-center gap-4 mb-5 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-1.5 rounded-full bg-primary-500" /> Valence
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-1.5 rounded-full bg-accent-500" /> Arousal
                </span>
              </div>
              <div className="space-y-4">
                {emotions.map(({ name, valence, arousal }) => (
                  <div key={name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</span>
                      <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                        {valence.toFixed(2)} / {arousal.toFixed(2)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-primary-500 transition-all"
                          style={{ width: `${valence * 100}%` }}
                        />
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-accent-500 transition-all"
                          style={{ width: `${arousal * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 — Burnout Risk */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400">
              Step 3
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
              Burnout Risk
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              AuraTwin also tracks whether your emotional patterns suggest you might be heading toward burnout — scored 0–100%, calculated over the last 28 days.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {[
              {
                title: 'Emotional Exhaustion',
                dot: 'bg-orange-500',
                dotBg: 'bg-orange-100 dark:bg-orange-900/30',
                text: 'The share of moments where Sad, Angry, or Fear was detected. The more often these appear, the higher the exhaustion score.',
                delay: '0',
              },
              {
                title: 'Accomplishment Loss',
                dot: 'bg-red-500',
                dotBg: 'bg-red-100 dark:bg-red-900/30',
                text: "How rarely Happy appeared: 1 − Happy ratio. If you're almost never detected as happy, this score rises.",
                delay: '80',
              },
              {
                title: 'Overall Risk',
                dot: 'bg-accent-500',
                dotBg: 'bg-accent-100 dark:bg-accent-900/30',
                text: 'A weighted average of both. Emotional Exhaustion carries more weight — sustained stress is the strongest early sign of burnout.',
                delay: '160',
              },
            ].map(({ title, dot, dotBg, text, delay }) => (
              <div
                key={title}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700"
                data-reveal
                data-reveal-delay={delay}
              >
                <div className={`w-8 h-8 ${dotBg} rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`w-3 h-3 rounded-full ${dot}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Inspired by the{' '}
                <a
                  href="https://en.wikipedia.org/wiki/Maslach_Burnout_Inventory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-600 dark:text-accent-400 underline underline-offset-2 hover:no-underline"
                >
                  Maslach Burnout Inventory
                </a>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The MBI is a questionnaire tool widely used to measure burnout in workplace settings. AuraTwin adapts its two core dimensions — exhaustion and reduced accomplishment — into a metric derived from observed emotion data rather than self-reported answers.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal data-reveal-delay="100">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Trend Direction</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                The 28-day window is split in two. Comparing the halves shows whether things are getting better or worse.
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Improving', color: 'text-green-600 dark:text-green-400', desc: 'scores are getting better' },
                  { label: 'Stable',    color: 'text-yellow-600 dark:text-yellow-400', desc: 'not much change' },
                  { label: 'Declining', color: 'text-red-600 dark:text-red-400',   desc: 'worth paying attention to' },
                ].map(({ label, color, desc }) => (
                  <div key={label} className="flex items-center gap-2 text-sm">
                    <span className={`font-semibold ${color} w-20`}>{label}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-xs">— {desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4 — Digital Twin & AI Reports */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12" data-reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-warm-600 dark:text-warm-400">
              Step 4
            </span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
              Your Digital Twin
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              All the data from detection, scoring, and risk analysis feeds into a living representation of your emotional state — a digital twin that updates as you do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">The Face</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Your dashboard shows an animated avatar whose expression reflects your current wellbeing score. It updates in real time as new emotion data comes in — a quick visual signal that doesn&apos;t require reading numbers.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
                {[
                  { range: '80–100', label: 'Very Happy', dot: 'bg-green-500' },
                  { range: '60–79',  label: 'Happy',      dot: 'bg-emerald-500' },
                  { range: '40–59',  label: 'Neutral',    dot: 'bg-yellow-500' },
                  { range: '20–39',  label: 'Sad',        dot: 'bg-orange-500' },
                  { range: '0–19',   label: 'Exhausted',  dot: 'bg-red-500' },
                ].map(({ range, label, dot }) => (
                  <div key={range} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full flex-none ${dot}`} />
                    <span className="font-mono text-xs text-gray-400 dark:text-gray-500 w-14">{range}</span>
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">{label} expression</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                The face also animates differently per state — bouncing when happy, slow breathing when neutral, wobbling when exhausted.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-700" data-reveal data-reveal-delay="100">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">AI-Powered Reports</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                On demand, AuraTwin generates a written report summarising your emotional patterns. It reads your emotion history and produces a plain-language analysis — what you&apos;ve been feeling, how it&apos;s changed, and what to watch.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: 'Powered by Gemini 3.1 Flash Lite',
                    desc: "Google's fast multimodal model interprets your data and writes the report.",
                  },
                  {
                    label: 'Based on your actual data',
                    desc: 'The model sees your emotion logs, wellbeing score, burnout risk, and trend direction.',
                  },
                  {
                    label: 'Generate any time',
                    desc: 'Reports are stored so you can look back and compare across weeks or months.',
                  },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-warm-500 font-bold mt-0.5 flex-none">→</span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10" data-reveal>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              What AuraTwin Is — and Isn&apos;t
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Honest about what it can and can&apos;t do.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-6" data-reveal data-reveal-delay="80">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">It is</p>
              <ul className="space-y-2">
                {[
                  'A tool for seeing your emotional patterns over time',
                  'A personal awareness aid based on observed facial expression data',
                  'A complement to — not a replacement for — professional support',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-500 font-bold mt-0.5 flex-none">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">It is not</p>
              <ul className="space-y-2">
                {[
                  'A medical device or diagnostic tool',
                  'A substitute for mental health care',
                  'A perfect or clinical measurement of emotional state',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-red-500 font-bold mt-0.5 flex-none">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-warm-50 dark:bg-warm-900/20 border-l-4 border-warm-500 p-4 rounded-r-lg text-sm text-gray-700 dark:text-gray-300">
              If you are experiencing a mental health crisis, please contact a qualified professional or crisis helpline. AuraTwin is for self-awareness, not crisis support.
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal>
          <h2 className="text-4xl font-bold mb-4">See it for yourself</h2>
          <p className="text-xl text-primary-100 mb-8">Create an account and start tracking your emotional patterns.</p>
          <a
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Get Started
          </a>
        </div>
      </section>

    </div>
  );
}

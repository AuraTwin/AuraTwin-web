import Link from 'next/link';

export const metadata = {
  title: 'Product - AuraTwin',
  description: 'Discover how AuraTwin uses advanced emotion recognition technology to create your affective digital twin.',
};

export default function ProductPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-gray-900 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Your <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Affective Digital Twin</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AuraTwin is an advanced emotional intelligence system that creates a digital representation of your emotional state, helping you understand patterns and improve well-being.
            </p>
          </div>
        </div>
      </section>

      {/* What is AuraTwin */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-reveal>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What is an Affective Digital Twin?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                A digital twin is a virtual representation that mirrors a physical entity&apos;s state and behavior through continuous data synchronization. AuraTwin applies this concept to your emotional life.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                By continuously monitoring your facial expressions, AuraTwin creates a dynamic model of your emotional patterns, helping you understand:
              </p>
              <ul className="space-y-3">
                {[
                  'How your emotions fluctuate throughout the day',
                  'What activities or situations trigger different emotional states',
                  'Long-term emotional trends and patterns',
                  'Correlations between your emotions and external factors'
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <svg className="w-6 h-6 text-primary-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-700 p-8 rounded-2xl" data-reveal data-reveal-delay="150">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">8 Emotion Categories</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: '😊', label: 'Happy' },
                    { emoji: '😢', label: 'Sad' },
                    { emoji: '😠', label: 'Angry' },
                    { emoji: '😮', label: 'Surprised' },
                    { emoji: '😐', label: 'Neutral' },
                    { emoji: '😨', label: 'Fear' },
                    { emoji: '🤢', label: 'Disgust' },
                    { emoji: '😒', label: 'Contempt' },
                  ].map((emotion) => (
                    <div key={emotion.label} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-3xl mb-1">{emotion.emoji}</div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{emotion.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Core Capabilities</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powered by cutting-edge AI and designed with your privacy in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Real-Time Emotion Recognition', description: 'Advanced CNN-based facial expression analysis processes your expressions in real-time with high accuracy.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { title: 'Longitudinal Pattern Analysis', description: 'Track emotional trends over days, weeks, and months to identify meaningful patterns in your emotional life.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> },
              { title: 'Trigger Identification', description: 'Discover what activities, times of day, or situations correlate with different emotional states.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> },
              { title: 'Personalized Insights', description: 'Receive tailored recommendations and insights based on your unique emotional patterns and history.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
              { title: 'Temporal Modeling', description: 'AI-powered predictions help anticipate emotional states and provide proactive recommendations.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { title: 'Evidence-Based Interventions', description: 'Receive scientifically-backed behavioral suggestions to improve your emotional well-being.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
            ].map((capability, i) => (
              <div key={capability.title} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow" data-reveal data-reveal-delay={`${i * 80}`}>
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {capability.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{capability.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Built on Proven Technology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AuraTwin leverages state-of-the-art AI and computer vision research
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-primary-100 dark:border-gray-700" data-reveal>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">EfficientNet Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our emotion recognition engine uses the enet_b0_8_best_afew model, a highly optimized EfficientNet-B0 variant deployed via ONNX Runtime for maximum performance.
              </p>
              <ul className="space-y-2">
                {['High-performance ONNX Runtime engine', 'No heavy dependencies like TensorFlow', 'Optimized for AWS t2.micro instances'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-accent-100 dark:border-gray-700" data-reveal data-reveal-delay="150">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hybrid Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AuraTwin uses a four-tier hybrid architecture: a Python desktop client, an AWS FastAPI server for emotion analysis, Firebase Firestore for data storage, and a Gemini AI-powered web dashboard.
              </p>
              <div className="space-y-3">
                {[
                  { step: '1', label: 'Desktop Client', desc: 'Python app (macOS & Windows) captures facial expressions via webcam and sends data to the server using your App Key.' },
                  { step: '2', label: 'AWS FastAPI Server', desc: 'Runs the emotion recognition model on an EC2 instance, then writes results to Firestore.' },
                  { step: '3', label: 'Firebase Firestore', desc: 'Stores emotion logs securely in the cloud, linked to your account.' },
                  { step: '4', label: 'Web Dashboard + Gemini', desc: 'Displays charts and generates personalized AI well-being reports using Gemini 3.1 Flash Lite.' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
                      <span className="text-gray-600 dark:text-gray-300"> — {item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg" data-reveal>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">System Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Supported Platforms</h3>
                <ul className="space-y-3">
                  {['Windows 10 or 11', 'macOS 12 (Monterey) or later', 'Built-in or external webcam (720p or higher)', '4 GB RAM minimum', 'Internet connection'].map((item) => (
                    <li key={item} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended</h3>
                <ul className="space-y-3">
                  {['Windows 11 or macOS 13+', 'HD Webcam (1080p)', '8 GB RAM or more', 'SSD storage', 'Stable broadband connection'].map((item) => (
                    <li key={item} className="flex items-start">
                      <svg className="w-5 h-5 text-accent-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience AuraTwin?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Create an account, get your App Key, and start your journey to better emotional awareness.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

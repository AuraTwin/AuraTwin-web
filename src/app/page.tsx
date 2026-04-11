import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fadeIn">
              Understand Your Emotions.
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Know Your Well-being.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fadeIn">
              AuraTwin builds your personal affective digital twin — recognizing your emotional patterns and giving you clear, AI-powered insights into your well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 text-lg font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border-2 border-primary-600 dark:border-primary-400"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="mt-16 relative" data-reveal>
            <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {[
                  { label: 'Happy', emoji: '😊' },
                  { label: 'Sad', emoji: '😢' },
                  { label: 'Angry', emoji: '😠' },
                  { label: 'Surprised', emoji: '😮' },
                  { label: 'Neutral', emoji: '😐' },
                  { label: 'Fear', emoji: '😨' },
                  { label: 'Disgust', emoji: '🤢' },
                  { label: 'Contempt', emoji: '😒' },
                ].map((emotion) => (
                  <div
                    key={emotion.label}
                    className="text-center p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-700 dark:to-gray-700 rounded-xl"
                  >
                    <div className="text-3xl mb-2">{emotion.emoji}</div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{emotion.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Personal Well-being Assistant
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AuraTwin uses AI and facial expression analysis to help you understand your emotional patterns — without ever storing your face.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-primary-100 dark:border-gray-700 hover:shadow-xl transition-all" data-reveal data-reveal-delay="0">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Continuous Monitoring</h3>
              <p className="text-gray-600 dark:text-gray-300">
                The desktop client runs quietly in the background, capturing your emotional state at regular intervals throughout the day.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-accent-100 dark:border-gray-700 hover:shadow-xl transition-all" data-reveal data-reveal-delay="100">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pattern Recognition</h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI identifies your emotional trends over days and weeks, helping you see what times, days, or situations affect your mood.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-warm-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl border border-warm-100 dark:border-gray-700 hover:shadow-xl transition-all" data-reveal data-reveal-delay="200">
              <div className="w-12 h-12 bg-warm-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Privacy by Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Facial images are deleted immediately after analysis. Only the emotion label and confidence score are stored — never your photo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How AuraTwin Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three steps to understand your emotional patterns
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative" data-reveal data-reveal-delay="0">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">1</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Download & Connect</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Download the AuraTwin desktop client (macOS or Windows). Enter your App Key from the dashboard to link your account — setup takes under 2 minutes.
                </p>
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="120">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">2</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Work Normally</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  AuraTwin runs silently in your system tray, capturing a brief camera frame every few minutes and sending only the emotion result to the cloud.
                </p>
              </div>
            </div>

            <div className="relative" data-reveal data-reveal-delay="240">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-warm-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">3</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">Read Your Report</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Open your dashboard to see charts, trends, and a personalized AI well-being report generated from your last 14 days of data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built Around Your Privacy</h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Privacy is not a feature we added at the end — it is part of the core design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Images Deleted Immediately', body: 'Your camera frame is analyzed on the server and deleted from memory right away. No photo is ever saved to disk.' },
              { title: 'Minimal Data Stored', body: 'Only the emotion label, confidence score, and timestamp are stored in the cloud — nothing that can identify you visually.' },
              { title: 'Encrypted Transmission', body: 'All data between the desktop client and the server is sent over HTTPS. Your App Key authenticates each request.' },
              { title: 'You Control the Analysis', body: 'The AI report is generated only when you press the button. Nothing runs without your action.' },
            ].map((item, i) => (
              <div key={item.title} className="flex items-start space-x-4" data-reveal data-reveal-delay={`${i * 80}`}>
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-primary-100">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Meet Your Digital Twin?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create an account, get your App Key, and start understanding your emotional patterns.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Create an Account
          </Link>
        </div>
      </section>
    </div>
  );
}

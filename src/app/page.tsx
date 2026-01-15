import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fadeIn">
              Understand Your Emotions.
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Transform Your Well-being.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AuraTwin creates your personal affective digital twin, helping you recognize emotional patterns and build better self-awareness through privacy-first technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Join the Waitlist
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-all border-2 border-primary-600"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Visual Element */}
          <div className="mt-16 relative">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Happy', 'Calm', 'Focused', 'Energized'].map((emotion, index) => (
                  <div
                    key={emotion}
                    className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-4xl mb-2">
                      {emotion === 'Happy' && '😊'}
                      {emotion === 'Calm' && '😌'}
                      {emotion === 'Focused' && '🎯'}
                      {emotion === 'Energized' && '⚡'}
                    </div>
                    <p className="text-sm font-medium text-gray-700">{emotion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Personal Emotional Intelligence Assistant
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AuraTwin combines cutting-edge AI with privacy-first design to help you understand and improve your emotional well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Continuous Monitoring</h3>
              <p className="text-gray-600">
                Real-time facial expression analysis captures your emotional state throughout the day, building a comprehensive emotional profile.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-accent-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pattern Recognition</h3>
              <p className="text-gray-600">
                Advanced AI identifies emotional trends over time, helping you understand what triggers different emotional states.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-warm-50 to-white rounded-2xl border border-warm-100 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-warm-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy Guarantee</h3>
              <p className="text-gray-600">
                Your facial images are immediately deleted after processing. Only anonymized emotional metadata is stored locally and encrypted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How AuraTwin Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to unlock your emotional insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Download & Install</h3>
                <p className="text-gray-600 text-center">
                  Install the lightweight AuraTwin desktop client on your Windows computer. Setup takes less than 2 minutes.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Let It Learn</h3>
                <p className="text-gray-600 text-center">
                  AuraTwin quietly monitors your facial expressions as you work, capturing emotional data throughout your day.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="w-16 h-16 bg-warm-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Gain Insights</h3>
                <p className="text-gray-600 text-center">
                  Review your emotional patterns, discover triggers, and receive personalized recommendations for better well-being.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-accent-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Privacy Is Non-Negotiable
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              We built AuraTwin with privacy as the foundation, not an afterthought.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Immediate Image Deletion</h3>
                <p className="text-primary-100">
                  Your facial images are processed and immediately deleted. We never store your face.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Local-First Architecture</h3>
                <p className="text-primary-100">
                  All your data is stored locally on your device, encrypted and under your control.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Military-Grade Encryption</h3>
                <p className="text-primary-100">
                  All data transmission uses TLS 1.3 and AES-256-GCM encryption standards.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">GDPR Compliant</h3>
                <p className="text-primary-100">
                  Built to meet the strictest international privacy regulations from day one.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/privacy"
              className="inline-flex items-center text-white hover:text-primary-200 transition-colors"
            >
              <span className="text-lg font-semibold mr-2">Learn more about our privacy commitment</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Meet Your Digital Twin?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our beta program and be among the first to experience personalized emotional intelligence.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Join the Waitlist
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            No credit card required. Early access launching Q2 2026.
          </p>
        </div>
      </section>
    </div>
  );
}

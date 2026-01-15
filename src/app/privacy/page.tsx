export const metadata = {
  title: 'Privacy & Security - AuraTwin',
  description: 'Learn about AuraTwin\'s privacy-first architecture and security measures that protect your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-accent-900 text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Face, Your Data,
              <br />
              <span className="text-primary-300">Your Control</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Privacy isn't a feature at AuraTwin—it's the foundation. We built our entire system around the principle that your emotional data belongs to you, and only you.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Privacy Promise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three non-negotiable principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-200 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Immediate Deletion</h3>
              <p className="text-gray-600">
                Your facial images are processed and <strong>immediately deleted</strong>. We never store, archive, or retain your face.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Control</h3>
              <p className="text-gray-600">
                All your emotional data is stored <strong>locally on your device</strong>, encrypted and under your complete control.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-200 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Selling, Ever</h3>
              <p className="text-gray-600">
                We will <strong>never sell, rent, or share</strong> your data with third parties. Your trust is not for sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy-by-Design Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How AuraTwin protects your privacy at every step
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                title: 'Capture',
                description: 'Your webcam captures a facial image on your local device.',
                details: 'No data leaves your computer yet. The image exists only in your device\'s memory.',
                color: 'primary'
              },
              {
                step: '2',
                title: 'Secure Transmission',
                description: 'The image is encrypted using TLS 1.3 and sent to our processing server.',
                details: 'Military-grade encryption ensures the data cannot be intercepted or read during transmission.',
                color: 'accent'
              },
              {
                step: '3',
                title: 'AI Processing',
                description: 'Our AI model analyzes the image and extracts emotional metadata.',
                details: 'This process takes milliseconds. The AI only identifies emotional states—no identity information is extracted.',
                color: 'warm'
              },
              {
                step: '4',
                title: 'Immediate Deletion',
                description: 'The facial image is immediately and permanently deleted from the server.',
                details: 'The image never touches permanent storage. It exists in memory only during processing and is wiped immediately after.',
                color: 'primary'
              },
              {
                step: '5',
                title: 'Local Storage',
                description: 'Only anonymized emotional metadata is returned to your device.',
                details: 'This data (emotion type, timestamp, confidence score) is stored in an encrypted local database that only you can access.',
                color: 'accent'
              }
            ].map((step) => (
              <div key={step.step} className="flex items-start">
                <div className={`flex-shrink-0 w-12 h-12 bg-${step.color}-600 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                  {step.step}
                </div>
                <div className="ml-6 bg-white p-6 rounded-xl shadow-md flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  <p className="text-sm text-gray-600 italic">{step.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Safeguards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technical Security Measures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade security protecting your data
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'End-to-End Encryption',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
                description: 'All data transmission uses TLS 1.3 with AES-256-GCM encryption—the same standard used by banks and governments.'
              },
              {
                title: 'Encrypted Local Storage',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ),
                description: 'Your emotional data is stored in an encrypted SQLite database on your device, protected by industry-standard encryption.'
              },
              {
                title: 'No Persistent Server Storage',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                ),
                description: 'Our servers never write facial images to disk. Processing happens entirely in memory with immediate wiping.'
              },
              {
                title: 'Anonymized Metadata',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                ),
                description: 'Only non-identifiable emotional state data is retained. No biometric identifiers, names, or personal information.'
              },
              {
                title: 'Secure Authentication',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                ),
                description: 'User authentication and session management follow OAuth 2.0 best practices with secure token handling.'
              },
              {
                title: 'Regular Security Audits',
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                ),
                description: 'Our codebase undergoes regular third-party security audits to identify and address potential vulnerabilities.'
              }
            ].map((safeguard) => (
              <div key={safeguard.title} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {safeguard.icon}
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{safeguard.title}</h3>
                  <p className="text-gray-600">{safeguard.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Regulatory Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meeting the world's strictest privacy standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🇪🇺</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">GDPR Compliant</h3>
              <p className="text-gray-600">
                Fully compliant with the EU's General Data Protection Regulation, including right to erasure and data portability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🇹🇷</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">KVKK Compliant</h3>
              <p className="text-gray-600">
                Adheres to Turkey's Personal Data Protection Law (KVKK) requirements for data processing and storage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy-First</h3>
              <p className="text-gray-600">
                Designed with privacy-by-design principles, exceeding minimum compliance requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Data Rights
            </h2>
            <p className="text-xl text-gray-600">
              You have complete control over your data at all times
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                right: 'Right to Access',
                description: 'View all emotional data we\'ve stored about you at any time through the application dashboard.'
              },
              {
                right: 'Right to Export',
                description: 'Download your complete emotional history in a portable format (JSON, CSV) whenever you want.'
              },
              {
                right: 'Right to Delete',
                description: 'Permanently delete all your data with a single click. Once deleted, it cannot be recovered.'
              },
              {
                right: 'Right to Opt-Out',
                description: 'Pause or stop emotional monitoring at any time. You control when AuraTwin is active.'
              },
              {
                right: 'Right to Transparency',
                description: 'Access detailed logs of all data processing activities related to your account.'
              }
            ].map((item) => (
              <div key={item.right} className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.right}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Still Have Privacy Questions?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            We're committed to transparency. Read our detailed privacy policy or reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/privacy-policy"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Read Full Privacy Policy
            </a>
            <a
              href="mailto:privacy@auratwin.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-all"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

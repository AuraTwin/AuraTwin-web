export const metadata = {
  title: 'Science & Research - AuraTwin',
  description: 'Learn about the scientific foundation and research behind AuraTwin\'s emotion recognition technology.',
};

export default function SciencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Built on <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Science</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AuraTwin is grounded in decades of research in affective computing, psychology, and machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Foundation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Academic Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Developed as a senior design project at Yaşar University's Computer Engineering Department
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Affective Computing</h3>
              <p className="text-gray-600 mb-4">
                AuraTwin builds on research pioneered by MIT Media Lab's Rosalind Picard, who established affective computing as a field combining computer science, psychology, and cognitive science.
              </p>
              <p className="text-gray-600">
                Our system recognizes that emotional awareness is key to well-being, and that technology can help people understand their emotional patterns in ways not possible through introspection alone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-white p-8 rounded-2xl border border-accent-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Digital Twin Technology</h3>
              <p className="text-gray-600 mb-4">
                Digital twins—virtual representations that mirror physical entities—have been used in manufacturing and IoT for years. AuraTwin applies this proven concept to human emotion.
              </p>
              <p className="text-gray-600">
                By creating a continuously updated model of your emotional state, we enable longitudinal analysis and pattern recognition that would be impossible with snapshot assessments.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Developed Under Academic Supervision</h3>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              This project was developed under the supervision of <strong>Doç. Dr. Mete Eminağaoğlu</strong> at Yaşar University's Computer Engineering Department. The development process followed rigorous academic standards including requirements specification, design documentation, and systematic testing.
            </p>
          </div>
        </div>
      </section>

      {/* Research & Technology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Research & Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              State-of-the-art machine learning for emotion recognition
            </p>
          </div>

          <div className="space-y-12">
            {/* FER-2013 Dataset */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">FER-2013 Dataset</h3>
                  <p className="text-gray-600 mb-4">
                    Our emotion recognition model is trained on the FER-2013 (Facial Expression Recognition 2013) dataset, one of the most widely used benchmarks in emotion recognition research.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2 font-bold">•</span>
                      <span className="text-gray-700"><strong>35,887 grayscale images</strong> of facial expressions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2 font-bold">•</span>
                      <span className="text-gray-700"><strong>7 emotion categories</strong> (Happy, Sad, Angry, Surprised, Neutral, Fear, Disgust)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2 font-bold">•</span>
                      <span className="text-gray-700"><strong>Diverse demographics</strong> ensuring model generalization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-600 mr-2 font-bold">•</span>
                      <span className="text-gray-700"><strong>Real-world conditions</strong> including varying lighting and angles</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 p-8 rounded-xl">
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Dataset Distribution</h4>
                    <div className="space-y-2">
                      {[
                        { emotion: 'Happy', percentage: '24%' },
                        { emotion: 'Neutral', percentage: '22%' },
                        { emotion: 'Sad', percentage: '18%' },
                        { emotion: 'Angry', percentage: '15%' },
                        { emotion: 'Surprised', percentage: '12%' },
                        { emotion: 'Fear', percentage: '6%' },
                        { emotion: 'Disgust', percentage: '3%' }
                      ].map((item) => (
                        <div key={item.emotion} className="flex justify-between items-center">
                          <span className="text-gray-700">{item.emotion}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full"
                                style={{ width: item.percentage }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12 text-right">{item.percentage}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini-Xception Architecture */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-accent-100 to-primary-100 p-8 rounded-xl">
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Model Architecture</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start">
                        <span className="text-accent-600 mr-2">→</span>
                        <span className="text-gray-700"><strong>Input Layer:</strong> 48x48 grayscale images</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent-600 mr-2">→</span>
                        <span className="text-gray-700"><strong>Convolutional Blocks:</strong> Efficient feature extraction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent-600 mr-2">→</span>
                        <span className="text-gray-700"><strong>Depthwise Separable Convolutions:</strong> Reduced parameters</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent-600 mr-2">→</span>
                        <span className="text-gray-700"><strong>Residual Connections:</strong> Improved gradient flow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent-600 mr-2">→</span>
                        <span className="text-gray-700"><strong>Output Layer:</strong> 7-class softmax classifier</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Mini-Xception CNN</h3>
                  <p className="text-gray-600 mb-4">
                    We use the Mini-Xception architecture, a lightweight yet powerful convolutional neural network designed specifically for facial expression recognition.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Mini-Xception is based on Google's Xception architecture but optimized for emotion recognition with fewer parameters, enabling real-time processing without sacrificing accuracy.
                  </p>
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Key Advantage:</strong> The architecture achieves high accuracy while remaining lightweight enough to process frames in real-time on consumer hardware.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Evidence-Based Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How emotional awareness improves well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Mental Health Awareness',
                description: 'Early detection of negative emotional patterns can help identify potential mental health concerns before they escalate.',
                research: 'Studies show emotional tracking correlates with improved mood regulation and reduced anxiety.'
              },
              {
                title: 'Workplace Productivity',
                description: 'Understanding emotional patterns helps identify optimal work times and energy management strategies.',
                research: 'Research indicates emotional awareness contributes to better work-life balance and reduced burnout.'
              },
              {
                title: 'Personal Growth',
                description: 'Longitudinal emotional data reveals patterns and triggers that would be invisible through introspection alone.',
                research: 'Self-monitoring has been shown to increase emotional intelligence and self-awareness.'
              },
              {
                title: 'Stress Management',
                description: 'Identifying stress patterns and triggers enables proactive coping strategies.',
                research: 'Evidence supports emotion tracking as an effective stress reduction intervention.'
              },
              {
                title: 'Behavioral Change',
                description: 'Data-driven insights support evidence-based behavioral interventions tailored to individual patterns.',
                research: 'Quantified self-data has been linked to successful habit formation and behavior modification.'
              },
              {
                title: 'Relationship Insights',
                description: 'Understanding your emotional responses helps improve communication and relationship quality.',
                research: 'Emotional awareness is a key component of emotional intelligence and relationship satisfaction.'
              }
            ].map((benefit) => (
              <div key={benefit.title} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-700 mb-4">{benefit.description}</p>
                <p className="text-sm text-primary-600 italic">{benefit.research}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations & Ethics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparency & Limitations
            </h2>
            <p className="text-xl text-gray-600">
              We believe in honest communication about what AuraTwin can and cannot do
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What AuraTwin Is</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">A tool for emotional self-awareness and pattern recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">A longitudinal emotional tracking system</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                  <span className="text-gray-700">A complement to professional mental health support</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What AuraTwin Is Not</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-700">Not a medical device or diagnostic tool</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-700">Not a replacement for professional mental health care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 flex-shrink-0 mt-1">✗</span>
                  <span className="text-gray-700">Not a mind-reading or emotion prediction system with perfect accuracy</span>
                </li>
              </ul>
            </div>

            <div className="bg-warm-50 p-6 rounded-xl border-l-4 border-warm-500">
              <p className="text-gray-700">
                <strong>Important:</strong> If you are experiencing a mental health crisis or severe emotional distress, please contact a qualified mental health professional or crisis helpline. AuraTwin is designed for self-awareness and personal growth, not crisis intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experience Science-Backed Emotional Intelligence
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our beta program and be part of the future of emotional well-being.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Get Early Access
          </a>
        </div>
      </section>
    </div>
  );
}

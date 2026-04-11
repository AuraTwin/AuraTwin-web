export const metadata = {
  title: 'Science & Research - AuraTwin',
  description: "Learn about the scientific foundation and research behind AuraTwin's emotion recognition technology.",
};

export default function SciencePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-gray-900 dark:to-gray-900 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Built on <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Science</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AuraTwin is grounded in decades of research in affective computing, psychology, and machine learning.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Foundation */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Academic Foundation</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Developed as a senior design project at Yaşar University&apos;s Computer Engineering Department
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-primary-100 dark:border-gray-700" data-reveal>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Affective Computing</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                AuraTwin builds on research pioneered by MIT Media Lab&apos;s Rosalind Picard, who established affective computing as a field combining computer science, psychology, and cognitive science.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our system recognizes that emotional awareness is key to well-being, and that technology can help people understand their emotional patterns in ways not possible through introspection alone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-white dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl border border-accent-100 dark:border-gray-700" data-reveal data-reveal-delay="150">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Digital Twin Technology</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Digital twins—virtual representations that mirror physical entities—have been used in manufacturing and IoT for years. AuraTwin applies this proven concept to human emotion.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By creating a continuously updated model of your emotional state, we enable longitudinal analysis and pattern recognition that would be impossible with snapshot assessments.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl" data-reveal>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Developed Under Academic Supervision</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
              This project was developed under the supervision of <strong>Doç. Dr. Mete Eminağaoğlu</strong> at Yaşar University&apos;s Computer Engineering Department. The development process followed rigorous academic standards including requirements specification, design documentation, and systematic testing.
            </p>
          </div>
        </div>
      </section>

      {/* Research & Technology */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Research & Technology</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              State-of-the-art machine learning for emotion recognition
            </p>
          </div>

          <div className="space-y-12">
            {/* AffectNet Dataset */}
            <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg" data-reveal>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AffectNet Dataset</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The emotion recognition model used in AuraTwin is trained on AffectNet, one of the largest real-world facial expression datasets available. It covers a wide range of people, lighting conditions, and environments.
                  </p>
                  <ul className="space-y-3">
                    {[
                      <><strong>~450,000 real-world images</strong> collected from the internet</>,
                      <><strong>8 emotion categories:</strong> Happy, Sad, Angry, Surprised, Neutral, Fear, Disgust, Contempt</>,
                      <><strong>Natural, uncontrolled conditions</strong> — not posed or staged</>,
                      <><strong>High visual diversity</strong> across demographics, angles, and lighting</>,
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-primary-600 mr-2 font-bold">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">8 Detected Emotions</h4>
                    <div className="space-y-2">
                      {[
                        { emotion: 'Happy', emoji: '😊' },
                        { emotion: 'Neutral', emoji: '😐' },
                        { emotion: 'Sad', emoji: '😢' },
                        { emotion: 'Angry', emoji: '😠' },
                        { emotion: 'Surprised', emoji: '😮' },
                        { emotion: 'Fear', emoji: '😨' },
                        { emotion: 'Disgust', emoji: '🤢' },
                        { emotion: 'Contempt', emoji: '😒' },
                      ].map((item) => (
                        <div key={item.emotion} className="flex items-center gap-3 py-1">
                          <span className="text-xl w-7 text-center">{item.emoji}</span>
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item.emotion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EfficientNet Architecture */}
            <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-lg" data-reveal>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gradient-to-br from-accent-100 to-primary-100 dark:from-gray-700 dark:to-gray-700 p-8 rounded-xl">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Backend Technology</h4>
                    <ul className="space-y-3 text-sm">
                      {[
                        ['Face Detection:', 'OpenCV DNN Module'],
                        ['Detection Models:', 'ResNet-10 SSD (Caffe)'],
                        ['Emotion Model:', 'enet_b0_8_best_afew'],
                        ['Engine:', 'ONNX Runtime'],
                        ['Hardware:', 'AWS t2.micro Optimized'],
                      ].map(([label, desc]) => (
                        <li key={label} className="flex items-start">
                          <span className="text-accent-600 mr-2">→</span>
                          <span className="text-gray-700 dark:text-gray-300"><strong>{label}</strong> {desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">EfficientNet & ONNX</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    AuraTwin utilizes the <strong>enet_b0_8_best_afew</strong> model, an EfficientNet-B0 variant optimized for emotion recognition tasks. By deploying via ONNX Runtime, we achieve near-instant inference speeds.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For face detection, we leverage OpenCV&apos;s built-in DNN module with a ResNet-10 SSD architecture, ensuring robust and privacy-conscious face localization without heavy external dependencies.
                  </p>
                  <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Deployment Note:</strong> This stack is specifically chosen for its low memory footprint, allowing it to run smoothly on lightweight cloud infrastructure like AWS t2.micro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Benefits */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Evidence-Based Benefits</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">How emotional awareness improves well-being</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Mental Health Awareness', description: 'Early detection of negative emotional patterns can help identify potential mental health concerns before they escalate.', research: 'Studies show emotional tracking correlates with improved mood regulation and reduced anxiety.' },
              { title: 'Workplace Productivity', description: 'Understanding emotional patterns helps identify optimal work times and energy management strategies.', research: 'Research indicates emotional awareness contributes to better work-life balance and reduced burnout.' },
              { title: 'Personal Growth', description: 'Longitudinal emotional data reveals patterns and triggers that would be invisible through introspection alone.', research: 'Self-monitoring has been shown to increase emotional intelligence and self-awareness.' },
              { title: 'Stress Management', description: 'Identifying stress patterns and triggers enables proactive coping strategies.', research: 'Evidence supports emotion tracking as an effective stress reduction intervention.' },
              { title: 'Behavioral Change', description: 'Data-driven insights support evidence-based behavioral interventions tailored to individual patterns.', research: 'Quantified self-data has been linked to successful habit formation and behavior modification.' },
              { title: 'Relationship Insights', description: 'Understanding your emotional responses helps improve communication and relationship quality.', research: 'Emotional awareness is a key component of emotional intelligence and relationship satisfaction.' },
            ].map((benefit, i) => (
              <div key={benefit.title} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow" data-reveal data-reveal-delay={`${i * 80}`}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{benefit.description}</p>
                <p className="text-sm text-primary-600 dark:text-primary-400 italic">{benefit.research}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations & Ethics */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-reveal>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Transparency & Limitations</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">We believe in honest communication about what AuraTwin can and cannot do</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6" data-reveal>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What AuraTwin Is</h3>
              <ul className="space-y-2">
                {['A tool for emotional self-awareness and pattern recognition', 'A longitudinal emotional tracking system', 'A complement to professional mental health support'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">What AuraTwin Is Not</h3>
              <ul className="space-y-2">
                {['Not a medical device or diagnostic tool', 'Not a replacement for professional mental health care', 'Not a mind-reading or emotion prediction system with perfect accuracy'].map((item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-red-600 mr-2 flex-shrink-0 mt-1">✗</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-warm-50 dark:bg-warm-900/20 p-6 rounded-xl border-l-4 border-warm-500">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Important:</strong> If you are experiencing a mental health crisis or severe emotional distress, please contact a qualified mental health professional or crisis helpline. AuraTwin is designed for self-awareness and personal growth, not crisis intervention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-reveal>
          <h2 className="text-4xl font-bold mb-6">Experience Science-Backed Emotional Intelligence</h2>
          <p className="text-xl text-primary-100 mb-8">Create an account and start tracking your emotional patterns with AI.</p>
          <a href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}

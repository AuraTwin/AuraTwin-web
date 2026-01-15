export const metadata = {
  title: 'Resources - AuraTwin',
  description: 'Educational resources about emotional intelligence, affective computing, and well-being.',
};

export default function BlogPage() {
  const resources = [
    {
      category: 'Emotional Intelligence',
      title: 'Understanding Your Emotional Patterns',
      description: 'Learn how to identify and interpret emotional patterns in your daily life.',
      date: 'Coming Soon',
      readTime: '5 min read'
    },
    {
      category: 'Science',
      title: 'The Science Behind Emotion Recognition',
      description: 'Explore how machine learning and computer vision enable facial expression analysis.',
      date: 'Coming Soon',
      readTime: '8 min read'
    },
    {
      category: 'Well-being',
      title: 'Using Emotional Data for Personal Growth',
      description: 'Practical strategies for turning emotional insights into actionable improvements.',
      date: 'Coming Soon',
      readTime: '6 min read'
    },
    {
      category: 'Privacy',
      title: 'Privacy-First Design in Emotion AI',
      description: 'How AuraTwin balances powerful insights with complete privacy protection.',
      date: 'Coming Soon',
      readTime: '7 min read'
    },
    {
      category: 'Research',
      title: 'Digital Twins for Mental Health',
      description: 'The emerging field of affective digital twins and their potential impact.',
      date: 'Coming Soon',
      readTime: '10 min read'
    },
    {
      category: 'Guides',
      title: 'Getting Started with AuraTwin',
      description: 'A comprehensive guide to setting up and making the most of AuraTwin.',
      date: 'Coming Soon',
      readTime: '4 min read'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Resources & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educational content about emotional intelligence, affective computing, and personal well-being.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-12 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-lg">
            Our resource library is currently under development. Check back soon for articles, guides, and insights about emotional intelligence and well-being.
          </p>
        </div>
      </section>

      {/* Placeholder Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full">
                    {resource.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{resource.date}</span>
                  <span>{resource.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-12 rounded-2xl text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Get notified when we publish new articles and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-primary-100 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Recommended Reading */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Recommended External Reading
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Affective Computing by Rosalind Picard
              </h3>
              <p className="text-gray-600">
                The foundational book on affective computing that inspired our work. Essential reading for understanding the field.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Emotional Intelligence by Daniel Goleman
              </h3>
              <p className="text-gray-600">
                A classic exploration of how emotional awareness impacts success, relationships, and well-being.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                The Upward Spiral by Alex Korb
              </h3>
              <p className="text-gray-600">
                Neuroscience-based strategies for improving mood and emotional well-being through small changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our beta program and be among the first to experience AuraTwin.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Join the Waitlist
          </a>
        </div>
      </section>
    </div>
  );
}

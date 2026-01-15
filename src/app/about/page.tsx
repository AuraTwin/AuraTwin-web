export const metadata = {
  title: 'About Us - AuraTwin',
  description: 'Meet the team behind AuraTwin and learn about our mission to bring emotional intelligence to everyone.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Making emotional intelligence accessible to everyone through privacy-first technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-12 rounded-2xl text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We believe everyone deserves to understand their emotions
            </h2>
            <p className="text-xl text-primary-100 mb-6">
              AuraTwin was born from the recognition that emotional awareness is fundamental to well-being, yet most people lack the tools to truly understand their emotional patterns.
            </p>
            <p className="text-lg text-primary-100">
              By combining cutting-edge AI with an unwavering commitment to privacy, we're building technology that helps people gain insights into their emotional lives without compromising their personal data.
            </p>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="py-20 bg-gray-50" id="team">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AuraTwin was developed by a dedicated team of computer engineering students at Yaşar University as their senior design project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: 'Yiğit Emre Çay',
                role: 'Lead Developer',
                description: 'Specialized in AI/ML and system architecture. Led the development of the emotion recognition model.'
              },
              {
                name: 'Ali Haktan Sığın',
                role: 'Backend Engineer',
                description: 'Focused on server infrastructure and privacy-first architecture implementation.'
              },
              {
                name: 'Utku Derici',
                role: 'Full Stack Developer',
                description: 'Built the desktop client and handled frontend-backend integration.'
              },
              {
                name: 'Ahmet Özgür Korkmaz',
                role: 'Systems Engineer',
                description: 'Designed the security protocols and data encryption systems.'
              }
            ].map((member) => (
              <div key={member.name} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 text-center font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>

          {/* Advisor */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Academic Advisor
              </h3>
              <div className="w-24 h-24 bg-gradient-to-br from-warm-500 to-warm-600 rounded-full mx-auto my-6 flex items-center justify-center">
                <span className="text-3xl text-white font-bold">ME</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">
                Doç. Dr. Mete Eminağaoğlu
              </h4>
              <p className="text-accent-600 font-semibold mb-4">
                Yaşar University - Computer Engineering Department
              </p>
              <p className="text-gray-600">
                Supervised the development of AuraTwin as the COMP4910 Senior Design Project, ensuring academic rigor and adherence to research standards throughout the development process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* University */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Yaşar University
            </h2>
            <p className="text-lg text-gray-600">
              Computer Engineering Department
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200">
            <p className="text-gray-700 mb-6">
              AuraTwin was developed as a capstone senior design project (COMP4910) at Yaşar University's Computer Engineering Department in Izmir, Turkey. The project represents the culmination of four years of computer science education, combining theoretical knowledge with practical application.
            </p>
            <p className="text-gray-700 mb-6">
              The development process followed professional software engineering standards, including comprehensive requirements specification, detailed design documentation, systematic testing, and rigorous project management.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">6 months</div>
                <div className="text-sm text-gray-700">Development Time</div>
              </div>
              <div className="text-center p-4 bg-accent-50 rounded-lg">
                <div className="text-3xl font-bold text-accent-600 mb-2">4 members</div>
                <div className="text-sm text-gray-700">Team Size</div>
              </div>
              <div className="text-center p-4 bg-warm-50 rounded-lg">
                <div className="text-3xl font-bold text-warm-600 mb-2">1 advisor</div>
                <div className="text-sm text-gray-700">Academic Supervision</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">
                Your data belongs to you. We build privacy into every feature from the ground up, not as an afterthought.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Science-Backed</h3>
              <p className="text-gray-600">
                Every feature is grounded in research. We build on proven science, not hype or pseudoscience.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">User-Centric</h3>
              <p className="text-gray-600">
                We build for people, not metrics. Your well-being and experience guide our development priorities.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Open & Transparent</h3>
              <p className="text-gray-600">
                We're honest about what our technology can and cannot do. No marketing hype, just honest communication.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Continuous Improvement</h3>
              <p className="text-gray-600">
                We're committed to ongoing research and development, constantly improving our technology and insights.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-warm-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warm-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Emotional intelligence tools should be available to everyone, regardless of economic status or background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be part of the future of emotional well-being and self-awareness.
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

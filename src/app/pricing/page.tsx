'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual waitlist signup logic
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-accent-600 text-white pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join the Beta Program
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Be among the first to experience AuraTwin. Early access launching Q2 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Reserve Your Spot
              </h2>
              <p className="text-lg text-gray-600">
                Join our waitlist to get early access, exclusive updates, and special launch pricing.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Join the Waitlist
                </button>

                <p className="text-sm text-gray-600 text-center">
                  No credit card required. We'll never spam you or share your email.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h3>
                <p className="text-gray-600">
                  Check your email for confirmation. We'll keep you updated on our progress.
                </p>
              </div>
            )}
          </div>

          {/* Beta Benefits */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Early Access</h3>
              <p className="text-sm text-gray-600">
                Be among the first to use AuraTwin before public launch
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Special Pricing</h3>
              <p className="text-sm text-gray-600">
                Exclusive discounted pricing for early supporters
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Lifetime Benefits</h3>
              <p className="text-sm text-gray-600">
                Beta users receive permanent perks and priority support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Future Pricing Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing designed to fit your needs. Beta users get special lifetime discounts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for trying out AuraTwin and basic emotional tracking.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  '7-day emotional history',
                  'Basic emotion tracking',
                  'Daily summaries',
                  'Community support'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Coming Soon
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 p-8 rounded-2xl shadow-xl text-white relative transform md:scale-105">
              <div className="absolute top-0 right-0 bg-warm-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-primary-100">/month</span>
              </div>
              <p className="text-primary-100 mb-6">
                Full-featured emotional intelligence platform for serious users.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited emotional history',
                  'Advanced pattern analysis',
                  'Personalized insights & recommendations',
                  'Weekly detailed reports',
                  'Export your data anytime',
                  'Priority email support'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-white mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Waitlist for Pro
              </button>
            </div>

            {/* Teams Tier */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Teams</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <p className="text-gray-600 mb-6">
                For organizations interested in workplace well-being programs.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Pro',
                  'Team dashboards',
                  'Aggregated insights',
                  'Dedicated account manager',
                  'Custom integrations',
                  'On-premise deployment options'
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600">
              <strong>Beta Discount:</strong> Early access users will receive <strong>50% off</strong> for the first year on any paid plan.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: 'When will AuraTwin launch?',
                answer: 'We\'re targeting Q2 2026 for early access. Beta users on the waitlist will be the first to know and get access.'
              },
              {
                question: 'Is there a free trial?',
                answer: 'Yes! Beta users will get extended free trials of the Pro tier. After launch, we\'ll offer a 14-day free trial of Pro for new users.'
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. No long-term commitments. Cancel your subscription at any time and keep your data.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We\'ll accept all major credit cards, PayPal, and are exploring cryptocurrency options.'
              },
              {
                question: 'Do you offer student discounts?',
                answer: 'Yes! Students and educators will receive 40% off any paid plan with valid verification.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

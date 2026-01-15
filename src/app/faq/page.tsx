'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What is AuraTwin?',
          a: 'AuraTwin is an affective digital twin system that continuously monitors your facial expressions to create a virtual representation of your emotional state over time. It helps you understand patterns, triggers, and trends in your emotional life.'
        },
        {
          q: 'How does AuraTwin work?',
          a: 'AuraTwin uses your computer\'s webcam to capture facial expressions. These images are sent to our secure servers where an AI model analyzes them for emotional content. The images are immediately deleted, and only anonymized emotional metadata (emotion type, timestamp, confidence) is stored locally on your device.'
        },
        {
          q: 'What emotions can AuraTwin recognize?',
          a: 'AuraTwin recognizes 7 basic emotions: Happy, Sad, Angry, Surprised, Neutral, Fear, and Disgust. These categories are based on established emotion research and the FER-2013 dataset.'
        },
        {
          q: 'Is AuraTwin a medical device?',
          a: 'No. AuraTwin is a wellness and self-awareness tool, not a medical device. It should not be used for diagnosing or treating any medical or mental health conditions. Always consult qualified healthcare professionals for medical advice.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      questions: [
        {
          q: 'Do you store my facial images?',
          a: 'Absolutely not. Your facial images are processed on our servers and immediately deleted. We never store, archive, or retain your face. Only anonymized emotional metadata is kept, and that\'s stored locally on your device.'
        },
        {
          q: 'Where is my data stored?',
          a: 'All your emotional data is stored locally on your device in an encrypted SQLite database. We don\'t store your personal data on our servers. You have complete control over your data at all times.'
        },
        {
          q: 'Can I delete my data?',
          a: 'Yes! You can delete all your data at any time with a single click. Once deleted, it\'s permanently removed and cannot be recovered.'
        },
        {
          q: 'Is my data encrypted?',
          a: 'Yes. All data transmission uses TLS 1.3 with AES-256-GCM encryption. Your local database is also encrypted. We use military-grade encryption standards throughout the system.'
        },
        {
          q: 'Do you share or sell my data?',
          a: 'Never. We will never sell, rent, or share your data with third parties. Your trust is not for sale. Our business model is subscription-based, not data-based.'
        },
        {
          q: 'Is AuraTwin GDPR compliant?',
          a: 'Yes. AuraTwin is built to comply with GDPR, KVKK, and other major privacy regulations. We follow privacy-by-design principles and give you complete control over your data.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'What are the system requirements?',
          a: 'You need Windows 10 or 11, a webcam (720p or higher recommended), 4GB RAM (8GB recommended), 500MB free disk space, and an internet connection.'
        },
        {
          q: 'Does AuraTwin work on Mac or Linux?',
          a: 'Currently, AuraTwin only supports Windows 10/11. Mac and Linux support are on our roadmap for future releases.'
        },
        {
          q: 'Does AuraTwin run in the background?',
          a: 'Yes. AuraTwin is designed to run quietly in the background, using minimal system resources. You can pause or stop it at any time.'
        },
        {
          q: 'How much bandwidth does it use?',
          a: 'Very little. Images are small (48x48 pixels) and only sent periodically. Typical usage is less than 50MB per day.'
        },
        {
          q: 'Can I use AuraTwin offline?',
          a: 'Emotion recognition requires an internet connection to process images on our servers. However, you can view your historical data offline at any time.'
        },
        {
          q: 'How accurate is the emotion recognition?',
          a: 'Our Mini-Xception model achieves accuracy rates comparable to published research benchmarks on the FER-2013 dataset. However, no emotion recognition system is perfect. Accuracy can vary based on lighting, angle, and individual facial expressions.'
        }
      ]
    },
    {
      category: 'Usage',
      questions: [
        {
          q: 'How often does AuraTwin capture images?',
          a: 'By default, AuraTwin captures images every few minutes. This frequency can be adjusted in settings based on your preferences and needs.'
        },
        {
          q: 'Will AuraTwin slow down my computer?',
          a: 'No. AuraTwin is designed to be lightweight and use minimal CPU and memory. It should have no noticeable impact on system performance.'
        },
        {
          q: 'Can I see my webcam feed?',
          a: 'No. AuraTwin doesn\'t provide a live feed of your webcam. It captures individual frames for analysis only. You\'ll see a small indicator when capture is active.'
        },
        {
          q: 'How long before I see meaningful insights?',
          a: 'You\'ll start seeing basic patterns within a few days. More meaningful longitudinal insights require at least 2 weeks of data. The longer you use AuraTwin, the better it understands your patterns.'
        },
        {
          q: 'Can I export my data?',
          a: 'Yes! Pro users can export their complete emotional history in JSON or CSV format at any time.'
        },
        {
          q: 'Can I pause AuraTwin?',
          a: 'Yes. You have complete control. You can pause monitoring at any time and resume whenever you want.'
        }
      ]
    },
    {
      category: 'Pricing & Access',
      questions: [
        {
          q: 'How much does AuraTwin cost?',
          a: 'We\'ll offer a free tier with 7-day history, and a Pro tier at $9.99/month with unlimited history and advanced features. Beta users will receive 50% off for the first year.'
        },
        {
          q: 'When will AuraTwin launch?',
          a: 'We\'re targeting Q2 2026 for early access. Join our waitlist to be notified when we launch.'
        },
        {
          q: 'Is there a free trial?',
          a: 'Yes! Beta users will get extended free trials. After launch, new users will get a 14-day free trial of Pro.'
        },
        {
          q: 'Do you offer student discounts?',
          a: 'Yes! Students and educators receive 40% off any paid plan with valid verification.'
        },
        {
          q: 'Can I cancel anytime?',
          a: 'Yes. No long-term contracts. Cancel your subscription at any time.'
        }
      ]
    },
    {
      category: 'Support',
      questions: [
        {
          q: 'How do I get support?',
          a: 'Free users have access to community support. Pro users receive priority email support with response within 24 hours.'
        },
        {
          q: 'What if AuraTwin isn\'t working correctly?',
          a: 'Contact our support team at support@auratwin.com. We\'ll help troubleshoot and resolve any issues.'
        },
        {
          q: 'Can I suggest new features?',
          a: 'Absolutely! We love feedback. Email us at feedback@auratwin.com with your ideas.'
        },
        {
          q: 'Is there a community forum?',
          a: 'Yes! We\'ll launch a community forum where users can share experiences, tips, and insights (while maintaining privacy of course).'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about AuraTwin
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-8">
                          {faq.q}
                        </span>
                        <svg
                          className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help! Reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@auratwin.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Email Support
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors border-2 border-primary-600"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata = {
  title: 'Terms of Service - AuraTwin',
  description: 'AuraTwin Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> January 2026
          </p>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8">
            <p className="text-gray-700">
              This is a placeholder terms of service page. Comprehensive terms of service will be published before the public launch of AuraTwin.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
            <p className="text-gray-700 mb-4">
              AuraTwin is currently in development and not yet available for public use. These terms will govern the use of the AuraTwin service once it launches.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>AuraTwin is a wellness tool, not a medical device</li>
              <li>The service should not be used for diagnosing or treating medical conditions</li>
              <li>Users must be 18 years or older (or have parental consent)</li>
              <li>You own your data and can delete it at any time</li>
              <li>We reserve the right to modify these terms with notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For questions about our terms, please contact us at:{' '}
              <a href="mailto:legal@auratwin.com" className="text-primary-600 hover:underline">
                legal@auratwin.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-gray-600">
              Complete terms of service will be available before our public launch, covering all aspects of service usage, user responsibilities, and legal protections.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

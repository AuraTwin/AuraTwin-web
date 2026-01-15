export const metadata = {
  title: 'Privacy Policy - AuraTwin',
  description: 'AuraTwin Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> January 2026
          </p>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8">
            <p className="text-gray-700">
              This is a placeholder privacy policy. A comprehensive privacy policy will be published before the public launch of AuraTwin.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              At AuraTwin, privacy is not just a feature—it's the foundation of everything we build. We are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Never storing your facial images</li>
              <li>Keeping your emotional data locally on your device</li>
              <li>Never selling or sharing your personal information</li>
              <li>Providing complete transparency about our data practices</li>
              <li>Giving you full control over your data at all times</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700">
              For privacy-related questions or concerns, please contact us at:{' '}
              <a href="mailto:privacy@auratwin.com" className="text-primary-600 hover:underline">
                privacy@auratwin.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <p className="text-sm text-gray-600">
              A detailed privacy policy covering all aspects of data collection, processing, storage, and your rights will be available before our public launch.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

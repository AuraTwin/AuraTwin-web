export const metadata = {
  title: 'Privacy Policy - AuraTwin',
  description: 'AuraTwin Privacy Policy',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            <strong>Last Updated:</strong> March 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Data Collection</h2>
            <p className="text-gray-700 dark:text-gray-300">
              AuraTwin collects minimal personal information required for account creation (name, email). Emotional data is captured via facial expression analysis through your device's camera.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Processing & Storage</h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Facial images are never stored.</strong> All image processing occurs in real-time on our server and images are deleted from memory immediately after analysis. Only anonymized emotional metadata (e.g., "Happy: 80%") is stored — this data is saved securely in the cloud (Firebase Firestore) and is only accessible through your account.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Data Usage</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Your data is used solely to provide you with personal emotional insights and well-being reports. We do not sell, trade, or share your personal data with third parties for marketing or any other purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Rights</h2>
            <p className="text-gray-700 dark:text-gray-300">
              You have the right to access, export, or delete your data at any time through the Settings page. Deleting your account will permanently remove all associated data from our systems.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For any privacy-related inquiries, please reach out to the AuraTwin development team at Yaşar University.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

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
            <strong>Last Updated:</strong> April 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Data We Collect</h2>
            <p className="text-gray-700 dark:text-gray-300">
              AuraTwin collects the minimum amount of data needed to provide the service: your name and email address for account creation, and emotional metadata (emotion label and confidence score) captured via facial expression analysis through your device&apos;s webcam.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Process Data</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Facial images are never stored.</strong> When the desktop client captures a camera frame, it is sent over HTTPS to our server (AWS EC2), where the emotion recognition model analyses it and the image is deleted from memory immediately. Only the result — emotion label and confidence score — is written to your account.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Emotional metadata and AI well-being reports are stored in Google Firebase Firestore, accessible only through your authenticated account. When you generate a report, your anonymised emotion history is sent to the Google Gemini API to produce the analysis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Third-Party Services</h2>
            <p className="text-gray-700 dark:text-gray-300">
              AuraTwin uses the following third-party infrastructure: <strong>AWS EC2</strong> for server-side emotion analysis, <strong>Google Firebase</strong> (Authentication and Firestore) for account management and data storage, and <strong>Google Gemini AI</strong> for well-being report generation. No personal data is sold or shared with any other parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Your Rights & Data Deletion</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You can update your profile information at any time from the Settings page. You can delete your account from the Settings page at any time.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Account deletion is permanent and complete.</strong> When you delete your account, the following data is removed from our systems immediately: your profile (name, email, App Key), all emotion session logs, all AI well-being reports, and your login credentials.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Contact</h2>
            <p className="text-gray-700 dark:text-gray-300">
              For any privacy-related questions, please contact the AuraTwin development team at Yaşar University, Computer Engineering Department.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

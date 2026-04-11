export const metadata = {
  title: 'Terms of Service - AuraTwin',
  description: 'AuraTwin Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Terms of Service</h1>

        <div className="prose prose-lg max-w-none dark:prose-invert bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            <strong>Last Updated:</strong> April 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              By creating an account and using AuraTwin, you agree to these terms. AuraTwin is a graduation project developed at Yaşar University for educational and research purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-700 dark:text-gray-300">
              AuraTwin provides emotional awareness tools using facial expression analysis. This service is provided "as is" and is intended for wellness and self-reflection purposes only.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Not a Medical Device</h2>
            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              AuraTwin is NOT a medical device and is not intended for the diagnosis, treatment, or prevention of any mental health conditions or medical diseases. Always seek the advice of a qualified professional for health concerns.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. User Responsibilities</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Users are responsible for maintaining the security of their accounts and App Keys. You agree not to use the service for any illegal or unauthorized purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 dark:text-gray-300">
              As a student project, AuraTwin and its developers shall not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use the service.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Changes to Terms</h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify these terms as the project evolves. Continued use of the service constitutes acceptance of updated terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

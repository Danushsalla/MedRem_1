import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <Layout 
      title="Terms of Service" 
      showBackButton 
      onBack={() => navigate(-1)}
    >
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Terms of Service</h2>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-medium mb-2">1. Acceptance of Terms</h3>
              <p className="text-gray-600">
                By accessing and using MedRem, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this app.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">2. Use License</h3>
              <p className="text-gray-600">
                Permission is granted to temporarily download one copy of MedRem for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">3. Disclaimer</h3>
              <p className="text-gray-600">
                The materials on MedRem are provided on an 'as is' basis. MedRem makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">4. Limitations</h3>
              <p className="text-gray-600">
                In no event shall MedRem or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use MedRem.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">5. Privacy</h3>
              <p className="text-gray-600">
                Your use of MedRem is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the app and informs users of our data collection practices.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">6. Governing Law</h3>
              <p className="text-gray-600">
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Last updated: March 2025
        </p>
      </div>
    </Layout>
  );
};

export default TermsPage;
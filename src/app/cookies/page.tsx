import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export default function CookiesPage() {
  return (
    <StaticPageLayout title="Cookie Policy">
      <div className="prose lg:prose-xl max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
        </p>

        <h2>How We Use Cookies</h2>
        <p>
          SurplusConnect uses cookies to enhance your experience on our platform. We use cookies for the following purposes:
        </p>

        <h3>Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as:
        </p>
        <ul>
          <li>User authentication and login sessions</li>
          <li>Security features and fraud prevention</li>
          <li>Shopping cart functionality</li>
          <li>Form submission and data validation</li>
        </ul>

        <h3>Performance and Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:
        </p>
        <ul>
          <li>Page views and user navigation patterns</li>
          <li>Time spent on different pages</li>
          <li>Error messages and technical issues</li>
          <li>Website performance metrics</li>
        </ul>

        <h3>Functional Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization:
        </p>
        <ul>
          <li>Language and region preferences</li>
          <li>User interface customizations</li>
          <li>Accessibility settings</li>
          <li>Recently viewed items</li>
        </ul>

        <h3>Marketing and Advertising Cookies</h3>
        <p>
          These cookies are used to deliver relevant advertisements and track advertising effectiveness:
        </p>
        <ul>
          <li>Targeted advertising based on interests</li>
          <li>Social media integration</li>
          <li>Conversion tracking</li>
          <li>Retargeting campaigns</li>
        </ul>

        <h2>Types of Cookies We Use</h2>
        
        <h3>Session Cookies</h3>
        <p>
          These temporary cookies are deleted when you close your browser. They help maintain your session while navigating our website.
        </p>

        <h3>Persistent Cookies</h3>
        <p>
          These cookies remain on your device for a set period or until you delete them. They remember your preferences for future visits.
        </p>

        <h3>First-Party Cookies</h3>
        <p>
          These cookies are set directly by SurplusConnect and are used for website functionality and analytics.
        </p>

        <h3>Third-Party Cookies</h3>
        <p>
          These cookies are set by external services we use, such as:
        </p>
        <ul>
          <li>Google Analytics for website analytics</li>
          <li>Payment processors for secure transactions</li>
          <li>Social media platforms for sharing functionality</li>
          <li>Customer support tools</li>
        </ul>

        <h2>Cookie Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 my-6">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">session_token</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User authentication</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Session</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Essential</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">user_preferences</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Store user settings</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 year</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Functional</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_ga</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 years</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Analytics</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">cookie_consent</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Remember consent preferences</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 year</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Essential</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Managing Your Cookie Preferences</h2>
        
        <h3>Browser Settings</h3>
        <p>
          Most web browsers allow you to control cookies through their settings. You can:
        </p>
        <ul>
          <li>View which cookies are stored on your device</li>
          <li>Delete existing cookies</li>
          <li>Block cookies from specific websites</li>
          <li>Block all cookies (not recommended as it may affect website functionality)</li>
        </ul>

        <h3>Cookie Consent</h3>
        <p>
          When you first visit our website, you&apos;ll see a cookie consent banner. You can:
        </p>
        <ul>
          <li>Accept all cookies</li>
          <li>Reject non-essential cookies</li>
          <li>Customize your cookie preferences</li>
          <li>Change your preferences at any time through our cookie settings</li>
        </ul>

        <h3>Opt-Out Links</h3>
        <p>
          You can opt out of certain third-party cookies:
        </p>
        <ul>
          <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Google Analytics Opt-out</a></li>
          <li><a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Facebook Ad Preferences</a></li>
          <li><a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">Network Advertising Initiative Opt-out</a></li>
        </ul>

        <h2>Impact of Disabling Cookies</h2>
        <p>
          If you choose to disable cookies, some features of our website may not function properly:
        </p>
        <ul>
          <li>You may need to log in repeatedly</li>
          <li>Your preferences may not be saved</li>
          <li>Some pages may load more slowly</li>
          <li>Personalized content may not be available</li>
          <li>Shopping cart functionality may be limited</li>
        </ul>

        <h2>Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or this Cookie Policy, please contact us:
        </p>
        <ul>
          <li>Email: privacy@surplusconnect.com</li>
          <li>Phone: 1-800-SURPLUS</li>
          <li>Address: SurplusConnect Privacy Team</li>
        </ul>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have certain rights regarding cookies and personal data:
        </p>
        <ul>
          <li>Right to access information about cookies we use</li>
          <li>Right to withdraw consent for non-essential cookies</li>
          <li>Right to request deletion of certain data</li>
          <li>Right to data portability</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8">
          By continuing to use our website, you consent to our use of cookies as described in this policy.
        </p>
      </div>
    </StaticPageLayout>
  );
}
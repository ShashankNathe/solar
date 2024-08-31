import { Button } from "@/components/ui/button";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-12">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Basic</h2>
            <p className="text-4xl font-bold mb-6">
              $29<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="mb-8">
              <li className="mb-2">✓ Lead Management</li>
              <li className="mb-2">✓ Project Tracking</li>
              <li className="mb-2">✓ Basic Reporting</li>
              <li className="mb-2">✓ Up to 5 Users</li>
            </ul>
            <Button className="w-full">Choose Basic</Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md transform scale-105">
            <h2 className="text-2xl font-semibold mb-4">Pro</h2>
            <p className="text-4xl font-bold mb-6">
              $79<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="mb-8">
              <li className="mb-2">✓ All Basic Features</li>
              <li className="mb-2">✓ Advanced Analytics</li>
              <li className="mb-2">✓ Customer Portal</li>
              <li className="mb-2">✓ Up to 20 Users</li>
              <li className="mb-2">✓ Priority Support</li>
            </ul>
            <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
              Choose Pro
            </Button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
            <p className="text-4xl font-bold mb-6">Custom</p>
            <ul className="mb-8">
              <li className="mb-2">✓ All Pro Features</li>
              <li className="mb-2">✓ Custom Integrations</li>
              <li className="mb-2">✓ Dedicated Account Manager</li>
              <li className="mb-2">✓ Unlimited Users</li>
              <li className="mb-2">✓ 24/7 Premium Support</li>
            </ul>
            <Button className="w-full">Contact Sales</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;

import { Button } from "@/components/ui/button";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <section className="pt-24 pb-12 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mt-10">
              Revolutionize Your Solar Business
            </h1>
            <p className="text-lg sm:text-xl mb-8">Streamline your operations, boost sales, and grow your solar company with our powerful CRM solution.</p>
            <Link href="/login">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
                Get Started
              </Button>
            </Link>

            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 transform skew-y-3 rounded-3xl shadow-2xl"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-lg flex items-center justify-center">
                <Image src="/dashboard.png" alt="Solar CRM Dashboard" width={1918} height={866} className="rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-b from-gray-100 to-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Lead Management</h3>
                <p className="text-sm sm:text-base">Efficiently track and nurture leads through your sales pipeline.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Project Tracking</h3>
                <p className="text-sm sm:text-base">Monitor solar installations from proposal to completion.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Analytics Dashboard</h3>
                <p className="text-sm sm:text-base">Gain insights with powerful reporting and visualization tools.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to Grow Your Solar Business?</h2>
            <p className="text-base sm:text-lg mb-8">Join thousands of solar professionals who trust our CRM to power their success.</p>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

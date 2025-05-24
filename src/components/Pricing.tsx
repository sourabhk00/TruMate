import React from 'react';
import { Check } from 'lucide-react';
import PaymentForm from './PaymentForm';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Transparent Pricing Plans
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="mt-12 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-blue-900">Basic</h3>
              <p className="mt-4 text-gray-600">Access essential verification features.</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-blue-900">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {['Verified Identity System', 'Basic Matching', 'Limited Profile Views', 'Safety Alerts'].map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a href="#download" className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                Start Free
              </a>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-rose-500 relative transform scale-105">
            <div className="absolute top-0 -translate-y-1/2 inset-x-0 flex justify-center">
              <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-rose-500 text-white">
                Most Popular
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900">Premium</h3>
              <p className="mt-4 text-gray-600">Full access to all verification and matching features.</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-blue-900">$12.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {[
                'Everything in Basic',
                'Loyalty Check Engine',
                'Detailed Compatibility Reports',
                'Unlimited Profile Views',
                'Priority Matching',
                'Advanced SafeSpace Tools',
                'See Who Liked You'
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PaymentForm priceId="premium" amount={1299} />
            </div>
          </div>

          {/* Elite Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div>
              <h3 className="text-2xl font-bold text-blue-900">Elite</h3>
              <p className="mt-4 text-gray-600">Exclusive features for serious relationships.</p>
              <p className="mt-6">
                <span className="text-4xl font-extrabold text-blue-900">$24.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </p>
            </div>
            <ul className="mt-8 space-y-4">
              {[
                'Everything in Premium',
                'Elite Verified Badge',
                'Profile Boost',
                'VIP Customer Support',
                'Exclusive Events',
                'Advanced Loyalty Analytics',
                'Relationship Coaching'
              ].map((feature) => (
                <li key={feature} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="ml-3 text-gray-600">{feature}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PaymentForm priceId="elite" amount={2499} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
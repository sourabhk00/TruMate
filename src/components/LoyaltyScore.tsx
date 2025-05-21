import React from 'react';
import { Shield } from 'lucide-react';

const LoyaltyScore: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            Trust at a Glance: Loyalty Score
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Our proprietary algorithm measures trustworthiness with a transparent scoring system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 bg-green-500 text-white text-center">
              <Shield className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Loyal (80-100)</h3>
            </div>
            <div className="p-6">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
              <p className="text-center font-bold text-green-500 mt-2">90</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-gray-600">Consistent relationship history</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-gray-600">Strong endorsements from peers</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-gray-600">Transparent online presence</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-gray-600">Verified identity and information</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 bg-yellow-500 text-white text-center">
              <Shield className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Caution (50-79)</h3>
            </div>
            <div className="p-6">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-center font-bold text-yellow-500 mt-2">65</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  <span className="text-gray-600">Some inconsistencies in history</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  <span className="text-gray-600">Mixed feedback from references</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  <span className="text-gray-600">Some warning signs in communication</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  </span>
                  <span className="text-gray-600">Partial verification completed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6 bg-red-500 text-white text-center">
              <Shield className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Risky (Below 50)</h3>
            </div>
            <div className="p-6">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-center font-bold text-red-500 mt-2">35</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-gray-600">Multiple relationship red flags</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-gray-600">Negative reports from references</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-gray-600">Suspicious online behavior patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-gray-600">Incomplete or failed verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltyScore;
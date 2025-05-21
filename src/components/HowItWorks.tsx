import React from 'react';
import { UserCheck, Heart, BarChart, ShieldCheck } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            How TruMate Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Four simple steps to find authentic connections
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <div className="relative mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-md">
                <img 
                  className="w-full" 
                  src="https://images.pexels.com/photos/5257477/pexels-photo-5257477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Verification process" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-20"></div>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0 lg:pl-8">
              <ul className="space-y-10">
                <li className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                      <UserCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-900">1. Verify Your Identity</h3>
                    <p className="mt-2 text-base text-gray-600">Complete our secure ID verification process with government ID and facial recognition to prove you're a real person.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                      <BarChart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-900">2. Complete Personality Assessment</h3>
                    <p className="mt-2 text-base text-gray-600">Take our comprehensive personality test that analyzes your values, communication style, and relationship goals.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-900">3. Build Trust Score</h3>
                    <p className="mt-2 text-base text-gray-600">Increase your trustworthiness by completing verification steps and receiving vouches from friends.</p>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600">
                      <Heart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-900">4. Connect With Matches</h3>
                    <p className="mt-2 text-base text-gray-600">Browse profiles of verified users with compatible values and intentions to find meaningful connections.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
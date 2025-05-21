import React from 'react';
import { AppleIcon, AndroidIcon } from './Icons';

const CallToAction: React.FC = () => {
  return (
    <section id="download" className="py-16 bg-gradient-to-r from-blue-900 to-rose-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to find your authentic match?
            </h2>
            <p className="mt-4 text-lg">
              Download TruMate now and join thousands of users finding meaningful connections based on verified identities and genuine intentions.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-blue-900 hover:bg-gray-100 transition-colors"
              >
                <AppleIcon className="h-6 w-6 mr-2" />
                App Store
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-blue-900 hover:bg-gray-100 transition-colors"
              >
                <AndroidIcon className="h-6 w-6 mr-2" />
                Google Play
              </a>
            </div>
          </div>
          
          <div className="mt-10 lg:mt-0 relative">
            <div className="relative mx-auto w-full max-w-md">
              <img
                className="w-full rounded-xl shadow-2xl"
                src="https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="TruMate mobile app"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-20 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
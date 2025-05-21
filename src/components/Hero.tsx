import React from 'react';
import { Shield, Heart, CheckCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 bg-gradient-to-br from-blue-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-900 sm:text-5xl md:text-6xl">
              <span className="block">TruMate</span>
              <span className="block text-rose-600 mt-3 text-3xl sm:text-4xl">
                Real People, Real Intentions
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Where Authentic Love Begins. Find meaningful connections based on verified identities and genuine intentions.
            </p>
            <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <a
                href="#download"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-rose-600 hover:bg-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Download Now
              </a>
              <a
                href="#learn-more"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Learn More
              </a>
            </div>
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-sm text-gray-600">Verified Users</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-5 w-5 text-rose-500" />
                <span className="ml-2 text-sm text-gray-600">Authentic Matches</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Safety First</span>
              </div>
            </div>
          </div>
          <div className="mt-12 relative lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden lg:max-w-none">
              <img
                className="w-full object-cover"
                src="https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="TruMate App Interface"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
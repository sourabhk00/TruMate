import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut } from 'lucide-react';
import { signOut } from '../lib/supabase';

interface NavbarProps {
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-rose-600" />
              <span className="ml-2 text-xl font-bold text-blue-900">TruMate</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#features" className="text-blue-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-blue-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              How It Works
            </Link>
            <Link to="/#pricing" className="text-blue-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              Pricing
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/loyalty-test" className="text-blue-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Loyalty Test
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-rose-600 hover:text-rose-700 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-800 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-800 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/#features" 
              className="text-blue-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#how-it-works" 
              className="text-blue-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/#pricing" 
              className="text-blue-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/loyalty-test" 
                  className="text-blue-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Loyalty Test
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center text-rose-600 hover:text-rose-700 px-3 py-2 text-base font-medium"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-blue-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-rose-600 text-white px-4 py-2 rounded-full text-base font-medium hover:bg-rose-700 transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
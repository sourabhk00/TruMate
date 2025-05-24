import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import LoyaltyScore from './components/LoyaltyScore';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LoyaltyTest from './components/LoyaltyTest';
import MockInterview from './components/AITraining/MockInterview';
import CommunicationTraining from './components/AITraining/CommunicationTraining';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { user } = await getCurrentUser();
    setIsAuthenticated(!!user);
  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Features />
              <LoyaltyScore />
              <HowItWorks />
              <Pricing />
              <CallToAction />
            </main>
          } />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/loyalty-test" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isAuthenticated ? <Navigate to="/loyalty-test" /> : <Register />} 
          />
          <Route 
            path="/loyalty-test" 
            element={isAuthenticated ? <LoyaltyTest /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/mock-interview" 
            element={isAuthenticated ? <MockInterview /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/communication-training" 
            element={isAuthenticated ? <CommunicationTraining /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/payment-success" 
            element={isAuthenticated ? <PaymentSuccess /> : <Navigate to="/login" />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
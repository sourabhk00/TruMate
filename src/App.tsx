import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Navbar />
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loyalty-test" element={<LoyaltyTest />} />
          <Route path="/mock-interview" element={<MockInterview />} />
          <Route path="/communication-training" element={<CommunicationTraining />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/loyalty-test');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="mt-4 text-3xl font-bold text-blue-900">Payment Successful!</h2>
        <p className="mt-2 text-gray-600">
          Thank you for your purchase. Your premium features are now activated.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Redirecting to loyalty test in a few seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

// Move Stripe initialization inside the component
const PaymentForm: React.FC<{ priceId: string; amount: number }> = ({ priceId, amount }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    // Initialize Stripe only when the component mounts
    const initStripe = async () => {
      try {
        const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        if (!publishableKey) {
          throw new Error('Stripe publishable key is not configured');
        }
        const stripeInstance = await loadStripe(publishableKey);
        setStripe(stripeInstance);
      } catch (err: any) {
        setError('Failed to initialize payment system: ' + err.message);
      }
    };

    initStripe();
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!stripe) {
        throw new Error('Payment system is not initialized');
      }

      // Create payment intent
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ priceId }),
        }
      );

      const { clientSecret, error: intentError } = await response.json();
      if (intentError) throw new Error(intentError);

      // Confirm payment
      const { error: stripeError } = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

      if (stripeError) throw stripeError;

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      {error && (
        <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading || !stripe}
        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          (loading || !stripe) ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : !stripe ? 'Loading...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </div>
  );
};

export default PaymentForm;
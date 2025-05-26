import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Upload, Mail, Phone } from 'lucide-react';
import { supabase, createProfile, createVerification } from '../../lib/supabase';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [verificationSent, setVerificationSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    occupation: '',
    bio: '',
    interests: [] as string[],
    profilePhoto: null as File | null,
    governmentId: null as File | null,
    phoneNumber: '',
    emailVerificationCode: '',
    phoneVerificationCode: '',
  });

  useEffect(() => {
    let timer: number;
    if (cooldown > 0) {
      timer = window.setInterval(() => {
        setCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
      setVerificationSent(false);
      setCooldown(0);
      setError(null);
    };
  }, [cooldown]);

  const sendVerificationCode = async (type: 'email' | 'phone') => {
    try {
      if (cooldown > 0) {
        setError(`Please wait ${cooldown} seconds before requesting another code`);
        return;
      }

      setError(null);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`Verification code for ${type}: ${code}`);
      
      const { error: verificationError } = await createVerification({
        type: type,
        status: 'pending',
        code: code
      });

      if (verificationError) throw verificationError;
      
      setVerificationSent(true);
      setCooldown(55);
    } catch (error: any) {
      console.error('Error sending verification code:', error);
      setError(error.message);
    }
  };

  const verifyCode = async (type: 'email' | 'phone') => {
    try {
      setError(null);
      const code = type === 'email' ? formData.emailVerificationCode : formData.phoneVerificationCode;
      
      const { data: verificationData } = await supabase
        .from('verifications')
        .select('*')
        .eq('type', type)
        .eq('status', 'pending')
        .single();

      if (verificationData?.code === code) {
        await supabase
          .from('verifications')
          .update({ status: 'verified', verified_at: new Date().toISOString() })
          .eq('id', verificationData.id);
          
        if (type === 'email') {
          setEmailVerified(true);
        } else {
          setPhoneVerified(true);
        }
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (error: any) {
      console.error('Error verifying code:', error);
      setError(error.message);
    }
  };

  const handleNext = () => {
    setError(null);
    
    if (step === 1 && (!emailVerified || !phoneVerified)) {
      setError('Please verify both email and phone number before proceeding');
      return;
    }
    
    setStep(step + 1);
    setVerificationSent(false);
    setCooldown(0);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!emailVerified || !phoneVerified) {
        throw new Error('Please verify both email and phone number');
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (!authData.session) {
        throw new Error('No authenticated session');
      }

      const userId = authData.user?.id;
      if (!userId) throw new Error('No user ID returned from signup');

      // Upload files if provided
      if (formData.profilePhoto) {
        const { error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(`${userId}/profile`, formData.profilePhoto);
        if (uploadError) throw uploadError;
      }

      if (formData.governmentId) {
        const { error: uploadError } = await supabase.storage
          .from('government-ids')
          .upload(`${userId}/id`, formData.governmentId);
        if (uploadError) throw uploadError;
      }

      // Create user profile
      const { error: profileError } = await createProfile({
        user_id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
        location: formData.location,
        occupation: formData.occupation || '',
        bio: formData.bio || '',
        interests: formData.interests,
        phone_number: formData.phoneNumber,
        loyalty_score: 0
      });

      if (profileError) throw profileError;

      // Navigate to loyalty test
      navigate('/loyalty-test');
    } catch (error: any) {
      console.error('Error during registration:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-rose-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900">Join TruMate</h2>
          <p className="mt-2 text-gray-600">Step {step} of 4</p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <button
                    type="button"
                    disabled={cooldown > 0 || emailVerified}
                    onClick={() => sendVerificationCode('email')}
                    className={`absolute inset-y-0 right-0 px-3 flex items-center ${(cooldown > 0 || emailVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Mail className={`h-5 w-5 ${emailVerified ? 'text-green-500' : 'text-gray-400'}`} />
                    {cooldown > 0 && <span className="ml-2">{cooldown}s</span>}
                  </button>
                </div>
              </div>

              {verificationSent && !emailVerified && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Verification Code</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      required
                      className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.emailVerificationCode}
                      onChange={(e) => setFormData({...formData, emailVerificationCode: e.target.value})}
                    />
                    <button
                      type="button"
                      onClick={() => verifyCode('email')}
                      className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="tel"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                  <button
                    type="button"
                    disabled={cooldown > 0 || phoneVerified}
                    onClick={() => sendVerificationCode('phone')}
                    className={`absolute inset-y-0 right-0 px-3 flex items-center ${(cooldown > 0 || phoneVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Phone className={`h-5 w-5 ${phoneVerified ? 'text-green-500' : 'text-gray-400'}`} />
                    {cooldown > 0 && <span className="ml-2">{cooldown}s</span>}
                  </button>
                </div>
              </div>

              {verificationSent && !phoneVerified && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Verification Code</label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="text"
                      required
                      className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.phoneVerificationCode}
                      onChange={(e) => setFormData({...formData, phoneVerificationCode: e.target.value})}
                    />
                    <button
                      type="button"
                      onClick={() => verifyCode('phone')}
                      className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Occupation</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interests</label>
                <div className="mt-2 space-y-2">
                  {['Reading', 'Travel', 'Music', 'Sports', 'Cooking', 'Art', 'Technology', 'Nature'].map((interest) => (
                    <label key={interest} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.interests.includes(interest)}
                        onChange={(e) => {
                          const newInterests = e.target.checked
                            ? [...formData.interests, interest]
                            : formData.interests.filter(i => i !== interest);
                          setFormData({...formData, interests: newInterests});
                        }}
                      />
                      <span className="ml-2">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a photo</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, profilePhoto: e.target.files?.[0] || null})}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Government ID</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload ID</span>
                        <input
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, governmentId: e.target.files?.[0] || null})}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Complete Registration
              </button>
            )}
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
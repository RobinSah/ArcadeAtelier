import React, { useState, useEffect } from 'react';
import { X, User, Shield, LogIn, UserPlus, Eye, EyeOff, CheckCircle, AlertCircle, Mail, Phone, Building } from 'lucide-react';
import { supabase } from '../config/supabase';


interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: 'customer' | 'admin') => void;
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'customer' | 'admin'>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Login form data
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // Registration form data
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  if (!isOpen) return null;

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateLogin = () => {
    if (!loginData.email || !loginData.password) {
      setErrorMessage('Please fill in all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateRegistration = () => {
    if (!registerData.firstName || !registerData.lastName || !registerData.email || !registerData.password) {
      setErrorMessage('Please fill in all required fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (registerData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    if (!registerData.agreeToTerms) {
      setErrorMessage('Please agree to the terms and conditions');
      return false;
    }
    return true;
  };

  // Only showing the changed functions - rest of the component stays the same

// Update these specific functions in your LoginModal.tsx:

const handleLogin = async () => {
  setErrorMessage('');
  if (!validateLogin()) return;

  setIsSubmitting(true);

  try {
    // Sign in with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    });

    if (authError) throw authError;

    // Get user profile to determine user type
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('user_type, is_active')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      throw new Error('Unable to load user profile. Please contact support.');
    }

    if (!profile.is_active) {
      throw new Error('Your account has been deactivated. Please contact support.');
    }

    // Check if user type matches selected type
    if (profile.user_type !== userType) {
      throw new Error(`This account is registered as a ${profile.user_type}. Please select the correct account type.`);
    }

    setSubmitStatus('success');
    
    // Clear forms immediately after successful login
    resetForms();
    
    setTimeout(() => {
      onLogin(profile.user_type);
      onClose();
    }, 1000);

  } catch (error) {
    console.error('Login error:', error);
    setErrorMessage(error instanceof Error ? error.message : 'Login failed. Please try again.');
    setSubmitStatus('error');
    setTimeout(() => setSubmitStatus('idle'), 3000);
  } finally {
    setIsSubmitting(false);
  }
};

const handleRegister = async () => {
  setErrorMessage('');
  if (!validateRegistration()) return;

  setIsSubmitting(true);

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', registerData.email)
      .single();

    if (existingUser) {
      throw new Error('An account with this email already exists. Please try logging in instead.');
    }

    // Sign up with Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: registerData.email,
      password: registerData.password,
      options: {
        data: {
          first_name: registerData.firstName,
          last_name: registerData.lastName,
          user_type: userType,
          phone: registerData.phone,
          company: registerData.company
        }
      }
    });

    if (authError) throw authError;

    if (!authData.user) {
      throw new Error('Registration failed. Please try again.');
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert([
        {
          id: authData.user.id,
          email: registerData.email,
          first_name: registerData.firstName,
          last_name: registerData.lastName,
          phone: registerData.phone,
          company: registerData.company,
          user_type: userType,
          is_active: true
        }
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    setSubmitStatus('success');
    
    // Clear forms immediately after successful registration
    resetForms();
    
    // Check if email confirmation is required
    if (!authData.session) {
      setErrorMessage('Please check your email and click the confirmation link to activate your account.');
      setTimeout(() => {
        setMode('login');
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } else {
      // Auto-login if no email confirmation required
      setTimeout(() => {
        onLogin(userType);
        onClose();
      }, 2000);
    }

  } catch (error) {
    console.error('Registration error:', error);
    setErrorMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    setSubmitStatus('error');
    setTimeout(() => setSubmitStatus('idle'), 3000);
  } finally {
    setIsSubmitting(false);
  }
};

// Add this new function to clear forms when modal opens
const handleModalOpen = () => {
  if (isOpen) {
    resetForms();
  }
};

// Add this useEffect to clear forms when modal opens
useEffect(() => {
  handleModalOpen();
}, [isOpen]);

  const resetForms = () => {
    setLoginData({ email: '', password: '', rememberMe: false });
    setRegisterData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
    setMode('login');
    setSubmitStatus('idle');
    setErrorMessage('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>

          {/* Mode Toggle */}
          <div className="flex space-x-2 mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={isSubmitting}
            >
              <LogIn size={16} />
              <span>Login</span>
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                mode === 'register'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              disabled={isSubmitting}
            >
              <UserPlus size={16} />
              <span>Register</span>
            </button>
          </div>

          {/* User Type Selection */}
          <div className="flex space-x-2 mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUserType('customer')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                userType === 'customer'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              disabled={isSubmitting}
            >
              <User size={16} />
              <span>Customer</span>
            </button>
            <button
              onClick={() => setUserType('admin')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                userType === 'admin'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              disabled={isSubmitting}
            >
              <Shield size={16} />
              <span>Admin</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-green-700 text-sm">
                {mode === 'login' ? 'Login successful! Redirecting...' : 'Account created successfully!'}
              </p>
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginInputChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 pr-12"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    disabled={isSubmitting}
                  />
                  <span>Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleLogin}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  userType === 'customer'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Login as {userType === 'customer' ? 'Customer' : 'Admin'}</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Registration Form */
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterInputChange}
                    placeholder="First name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={registerData.lastName}
                    onChange={handleRegisterInputChange}
                    placeholder="Last name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <Mail className="inline mr-2" size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <Phone className="inline mr-2" size={16} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  <Building className="inline mr-2" size={16} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={registerData.company}
                  onChange={handleRegisterInputChange}
                  placeholder="Enter your company name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                    placeholder="Create a password (min. 8 characters)"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 pr-12"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterInputChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 pr-12"
                    disabled={isSubmitting}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={registerData.agreeToTerms}
                  onChange={handleRegisterInputChange}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  disabled={isSubmitting}
                  required
                />
                <label className="text-sm text-gray-600 leading-relaxed">
                  I agree to the <button type="button" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</button> and <button type="button" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</button>
                </label>
              </div>

              <button
                onClick={handleRegister}
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  userType === 'customer'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    <span>Create {userType === 'customer' ? 'Customer' : 'Admin'} Account</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
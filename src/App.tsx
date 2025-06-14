import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import Dashboard from './components/Dashboard';
import AboutPage from './components/AboutPage';
import ResourcesPage from './components/ResourcesPage';
import PricingPage from './components/PricingPage';
import LoginModal from './components/LoginModal';
import { supabase } from './config/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userType, setUserType] = useState<'guest' | 'customer' | 'admin'>('guest');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication session on app load
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get user profile to determine user type
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.user_type) {
          setUserType(profile.user_type);
          // Don't auto-navigate to dashboard, keep current page
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (type: 'customer' | 'admin') => {
    setUserType(type);
    setCurrentPage('dashboard');
    setShowLoginModal(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserType('guest');
      setCurrentPage('home');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handlePageChange = (page: string) => {
    if (page === 'dashboard' && userType === 'guest') {
      setShowLoginModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  // New function to handle "Start Your Project" button clicks
  const handleStartProject = () => {
    if (userType !== 'guest') {
      // User is authenticated, go to dashboard
      setCurrentPage('dashboard');
    } else {
      // User is not authenticated, show login modal
      setShowLoginModal(true);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} onLogin={handleStartProject} />;
      case 'services':
        return <ServicesPage onLogin={handleStartProject} />;
      case 'dashboard':
        return userType !== 'guest' ? <Dashboard userType={userType} /> : <HomePage onPageChange={handlePageChange} onLogin={handleStartProject} />;
      case 'about':
        return <AboutPage onLogin={handleStartProject} />;
      case 'resources':
        return <ResourcesPage />;
      case 'pricing':
        return <PricingPage onLogin={handleStartProject} />;
      default:
        return <HomePage onPageChange={handlePageChange} onLogin={handleStartProject} />;
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        currentPage={currentPage}
        onPageChange={handlePageChange}
        userType={userType}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />
      
      {renderPage()}
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ArcadeAtelier
              </div>
              <p className="text-gray-600 leading-relaxed">
                Empowering the built world with digital precision through advanced BIM and CAD solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => handlePageChange('services')} className="hover:text-blue-600 transition-colors duration-200">BIM Modeling</button></li>
                <li><button onClick={() => handlePageChange('services')} className="hover:text-blue-600 transition-colors duration-200">CAD Drafting</button></li>
                <li><button onClick={() => handlePageChange('services')} className="hover:text-blue-600 transition-colors duration-200">Xactimate (Soon)</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><button onClick={() => handlePageChange('about')} className="hover:text-blue-600 transition-colors duration-200">About Us</button></li>
                <li><button onClick={() => handlePageChange('resources')} className="hover:text-blue-600 transition-colors duration-200">Resources</button></li>
                <li><button onClick={() => handlePageChange('pricing')} className="hover:text-blue-600 transition-colors duration-200">Pricing</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-600">
                <li>support@arcadeatelier.com</li>
                <li>+1 (571) 604-9012</li>
                <li>24/7 Support Available</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 ArcadeAtelier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
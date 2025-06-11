import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userType: 'guest' | 'customer' | 'admin';
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({ currentPage, onPageChange, userType, onLogin, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'services', label: 'SERVICES' },
    ...(userType !== 'guest' ? [{ id: 'dashboard', label: 'DASHBOARD' }] : []),
    { id: 'about', label: 'ABOUT' },
    { id: 'resources', label: 'RESOURCES' },
    { id: 'pricing', label: 'PRICING' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              ArcadeAtelier
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userType === 'guest' ? (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
              >
                <LogIn size={16} />
                <span>LOGIN</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={16} />
                  <span className="text-sm">{userType === 'admin' ? 'Admin' : 'Customer'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 p-4 border border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsOpen(false);
                  }}
                  className={`text-left px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-gray-200">
                {userType === 'guest' ? (
                  <button
                    onClick={() => {
                      onLogin();
                      setIsOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    <LogIn size={16} />
                    <span>LOGIN</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-300"
                  >
                    Logout ({userType})
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
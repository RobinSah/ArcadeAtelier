import React from 'react';
import { ArrowRight, Zap, Shield, Clock, Users, Building, Layers, FileText } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onLogin: () => void;
}

export default function HomePage({ onPageChange, onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23006064' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="text-blue-600">
                Professional
              </span>
              <br />
              <span className="text-gray-900">BIM & CAD Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empowering the built world with digital precision. Advanced BIM modeling, CAD drafting, 
              and cutting-edge construction technology solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3"
              >
                <span>Request Quote</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <button
                onClick={() => onPageChange('services')}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-lg rotate-12 opacity-50"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-200 rounded-lg rotate-45 opacity-50"></div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions for architecture, engineering, and construction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Building className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">BIM Services</h3>
              <p className="text-gray-600 mb-6">
                Advanced 3D modeling, clash detection, coordination, and quantity take-offs using Revit, Navisworks, and IFC standards.
              </p>
              <div className="text-blue-600 font-semibold">Starting from $60</div>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
              <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <Layers className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">CAD Services</h3>
              <p className="text-gray-600 mb-6">
                Precision 2D drafting, 3D rendering, construction drawings, and conversions using AutoCAD and MicroStation.
              </p>
              <div className="text-blue-600 font-semibold">Starting from $45</div>
            </div>

            <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300">
                <FileText className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Xactimate</h3>
              <p className="text-gray-600 mb-6">
                Professional sketching and estimation services for insurance, construction, and restoration industries.
              </p>
              <div className="text-gray-500 font-semibold">Notify me when available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-blue-600">ArcadeAtelier</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">Quick turnaround times without compromising quality</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600">Advanced security measures and reliable project delivery</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support and project tracking</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Team</h3>
              <p className="text-gray-600">Certified professionals with years of industry experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Projects?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied clients who trust ArcadeAtelier for their digital construction needs.
          </p>
          <button
            onClick={onLogin}
            className="px-12 py-4 bg-white text-blue-600 rounded-xl font-semibold text-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
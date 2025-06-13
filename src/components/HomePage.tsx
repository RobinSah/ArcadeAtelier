import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Building, 
  Layers, 
  Wrench,
  Play,
  Pause,
  Volume2,
  Maximize,
  Star,
  Award,
  CheckCircle,
  Eye,
  Scan,
  Home,
  TrendingUp,
  Globe,
  Camera,
  Download
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onLogin: () => void;
}

export default function HomePage({ onPageChange, onLogin }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const featuredServices = [
    {
      icon: Scan,
      title: 'Scan to BIM',
      description: 'Transform point cloud data into precise 3D BIM models',
      price: 'From $70',
      color: 'from-cyan-500 to-blue-600',
      popular: true
    },
    {
      icon: Building,
      title: 'BIM Modeling',
      description: 'Comprehensive architectural and structural BIM services',
      price: 'From $60',
      color: 'from-blue-500 to-indigo-600',
      popular: false
    },
    {
      icon: Eye,
      title: '3D Visualization',
      description: 'Photorealistic renders and immersive walkthroughs',
      price: 'From $45',
      color: 'from-purple-500 to-pink-600',
      popular: false
    }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Delivered', icon: Award },
    { number: '150+', label: 'Happy Clients', icon: Users },
    { number: '99.5%', label: 'Accuracy Rate', icon: CheckCircle },
    { number: '24/7', label: 'Support', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Project Manager, ConstructCorp',
      avatar: 'SM',
      rating: 5,
      text: 'ArcadeAtelier transformed our project workflow. Their scan-to-BIM services saved us months of work and delivered incredible accuracy.'
    },
    {
      name: 'David Chen',
      role: 'Architect, Urban Design Studio',
      avatar: 'DC',
      rating: 5,
      text: 'The 3D visualizations exceeded our expectations. Clients were amazed by the photorealistic quality and attention to detail.'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Engineering Director, MegaBuild',
      avatar: 'MR',
      rating: 5,
      text: 'Outstanding MEPFP coordination services. The clash detection saved us significant time and costs during construction.'
    }
  ];

  const portfolioHighlights = [
    {
      title: 'Manhattan Office Complex',
      type: 'Scan to BIM',
      description: '50-story commercial building converted from point cloud to detailed BIM model',
      image: 'building-scan',
      stats: '2.5M sq ft',
      duration: '45 days'
    },
    {
      title: 'Luxury Resort Visualization',
      type: '3D Rendering',
      description: 'Immersive walkthrough for premium hospitality development',
      image: 'resort-render',
      stats: '120 rooms',
      duration: '2 weeks'
    },
    {
      title: 'Industrial Facility MEP',
      type: 'MEPFP Modeling',
      description: 'Complete MEP coordination for manufacturing plant',
      image: 'industrial-mep',
      stats: '500K sq ft',
      duration: '30 days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with 3D Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Animated 3D Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/30 rounded-lg rotate-45 animate-spin-slow"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-cyan-400/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-blue-500/20 rounded-lg animate-bounce"></div>
          </div>

          {/* Video Overlay Controls */}
          <div className="absolute bottom-8 right-8 flex space-x-4">
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <Volume2 size={20} />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <Maximize size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-white leading-tight">
              <span className="block">Transform Your</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Vision
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              From scan-to-BIM precision to breathtaking 3D visualizations, we bring architectural dreams to life with cutting-edge technology and unmatched expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={onLogin}
                className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/25 flex items-center space-x-3 transform hover:scale-105"
              >
                <span>Start Your Project</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </button>
              
              <button
                onClick={() => onPageChange('services')}
                className="px-10 py-5 border-2 border-white/50 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
              >
                Explore Services
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <achievement.icon className="text-cyan-400" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{achievement.number}</div>
                  <div className="text-blue-200 text-sm">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Services - Simplified */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized services that set the industry standard
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div key={index} className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                {service.popular && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`h-48 bg-gradient-to-br ${service.color} p-8 flex items-center justify-center relative`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <service.icon className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300" size={64} />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    <span className="text-2xl font-bold text-green-600">{service.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <button
                    onClick={onLogin}
                    className="w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onPageChange('services')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center space-x-3 mx-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase with Large Visuals */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Project <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Witness precision in action through our latest projects
            </p>
          </div>

          <div className="space-y-16">
            {portfolioHighlights.map((project, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative group">
                    <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-2xl overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
                      
                      {/* Placeholder for project image/video */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <Building className="text-white/70 mx-auto mb-4" size={64} />
                          <p className="text-white/70 text-lg">{project.image}</p>
                        </div>
                      </div>
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                          <Play size={24} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Project stats overlay */}
                    <div className="absolute -bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-white font-bold">{project.stats}</div>
                        <div className="text-white/70 text-sm">Size</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold">{project.duration}</div>
                        <div className="text-white/70 text-sm">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-400 font-bold">{project.type}</div>
                        <div className="text-white/70 text-sm">Service</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-6`}>
                  <div className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold">
                    {project.type}
                  </div>
                  <h3 className="text-4xl font-bold text-white">{project.title}</h3>
                  <p className="text-xl text-gray-300 leading-relaxed">{project.description}</p>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 backdrop-blur-sm">
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 border border-white/30 hover:border-white/50 text-white rounded-xl transition-all duration-300">
                      <Download size={16} />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials with Large Format */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Client <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stories from industry leaders who trust ArcadeAtelier
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed font-light">
                "{testimonials[currentSlide].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {testimonials[currentSlide].avatar}
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">{testimonials[currentSlide].name}</div>
                  <div className="text-gray-600">{testimonials[currentSlide].role}</div>
                </div>
              </div>
            </div>

            {/* Testimonial navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Powered by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Innovation</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We leverage cutting-edge technology and industry-leading software to deliver unparalleled precision and quality in every project.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Zap, title: 'Lightning Fast', desc: 'Advanced processing power' },
                  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security' },
                  { icon: Globe, title: 'Global Standards', desc: 'Industry compliance' },
                  { icon: TrendingUp, title: 'Continuous Innovation', desc: 'Always evolving' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => onPageChange('about')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
            </div>
            
            <div className="relative">
              {/* Placeholder for technology showcase */}
              <div className="aspect-square bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                <div className="text-center relative z-10">
                  <Camera className="mx-auto mb-4" size={64} />
                  <h3 className="text-2xl font-bold mb-2">3D Technology Demo</h3>
                  <p className="text-blue-100">Interactive visualization</p>
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-lg animate-float"></div>
                <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/10 rounded-full animate-float-delayed"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Vision?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join hundreds of satisfied clients who trust ArcadeAtelier to bring their architectural visions to life with precision, innovation, and unmatched quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onLogin}
              className="px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              Start Your Project Today
            </button>
            <button
              onClick={() => onPageChange('pricing')}
              className="px-12 py-5 border-2 border-white/50 text-white rounded-2xl font-bold text-xl hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite 2s;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
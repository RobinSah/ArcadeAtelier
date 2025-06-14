import React, { useState, useEffect, useRef } from 'react';
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
  VolumeX,
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
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
  onLogin: () => void; // This now handles authentication check
}

export default function InteractiveHomePage({ onPageChange, onLogin }: HomePageProps) {
  const [activeTab, setActiveTab] = useState('scan-to-bim');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Interactive mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stats animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Video controls
  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const services = {
    'scan-to-bim': {
      title: 'Scan to BIM',
      description: 'Transform point cloud data into precise 3D BIM models with industry-leading accuracy. Our advanced scanning technology captures every detail.',
      image: '/images/homepage/point_cloud_to_bim.png',
      icon: Scan,
      features: ['99.5% Accuracy', 'Fast Processing', 'Detailed Models', 'Quality Assurance'],
      price: 'From $70'
    },
    'bim-modeling': {
      title: 'BIM Modeling',
      description: 'Comprehensive architectural and structural BIM services for modern construction projects. Full lifecycle support from concept to completion.',
      image: '/images/homepage/bim_modeling.png',
      icon: Building,
      features: ['LOD 100-500', 'Clash Detection', 'MEP Integration', '4D Scheduling'],
      price: 'From $60'
    },
    '3d-visualization': {
      title: '3D Visualization',
      description: 'Photorealistic renders and immersive walkthroughs that bring your designs to life. Perfect for presentations and marketing.',
      image: '/images/homepage/3D_visualization.png',
      icon: Eye,
      features: ['Photorealistic', 'VR Ready', 'Animation', 'Interactive Tours'],
      price: 'From $45'
    }
  };

  const achievements = [
    { number: '500+', label: 'Projects Delivered', icon: Award, color: 'from-blue-500 to-cyan-500' },
    { number: '150+', label: 'Happy Clients', icon: Users, color: 'from-green-500 to-emerald-500' },
    { number: '99.5%', label: 'Accuracy Rate', icon: CheckCircle, color: 'from-purple-500 to-pink-500' },
    { number: '24/7', label: 'Support Available', icon: Clock, color: 'from-orange-500 to-red-500' }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Project Manager, ConstructCorp',
      avatar: '/images/homepage/point_cloud_to_bim.png',
      rating: 5,
      text: 'ArcadeAtelier transformed our project workflow. Their scan-to-BIM services saved us months of work and delivered incredible accuracy.',
      company: 'ConstructCorp'
    },
    {
      name: 'David Chen',
      role: 'Architect, Urban Design Studio',
      avatar: '/images/homepage/bim_modeling.png',
      rating: 5,
      text: 'The 3D visualizations exceeded our expectations. Clients were amazed by the photorealistic quality and attention to detail.',
      company: 'Urban Design Studio'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Engineering Director, MegaBuild',
      avatar: '/images/homepage/3D_visualization.png',
      rating: 5,
      text: 'Outstanding MEPFP coordination services. The clash detection saved us significant time and costs during construction.',
      company: 'MegaBuild Inc.'
    }
  ];

  const projects = [
    {
      title: 'Manhattan Office Complex',
      category: 'Scan to BIM',
      description: '50-story commercial building converted from point cloud to detailed BIM model',
      stats: { size: '2.5M sq ft', duration: '45 days', accuracy: '99.8%' },
      image: '/images/homepage/point_cloud_to_bim.png'
    },
    {
      title: 'Luxury Resort Development',
      category: '3D Visualization',
      description: 'Immersive walkthrough for premium hospitality development',
      stats: { size: '120 rooms', duration: '2 weeks', views: '50K+' },
      image: '/images/homepage/3D_visualization.png'
    },
    {
      title: 'Industrial Manufacturing Plant',
      category: 'BIM Modeling',
      description: 'Complete MEP coordination for manufacturing facility',
      stats: { size: '500K sq ft', duration: '30 days', systems: '1200+' },
      image: '/images/homepage/bim_modeling.png'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Interactive cursor follower */}
      <div 
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isMenuOpen ? 2 : 1})`
        }}
      />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="ArcadeAtelier" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-900">ArcadeAtelier</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => onPageChange(item.toLowerCase())}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                Get Started
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300">
            <div className="p-6 pt-20 space-y-6">
              {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    onPageChange(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Interactive Video */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/homepage/3D_video.mp4"
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
            }
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        
        {/* Video Controls */}
        <div className="absolute bottom-8 right-8 flex space-x-3 z-20">
          <button 
            onClick={handleVideoToggle}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          >
            {isVideoPlaying ? <Pause size={20} className="group-hover:scale-110 transition-transform" /> : <Play size={20} className="group-hover:scale-110 transition-transform ml-1" />}
          </button>
          <button 
            onClick={handleMuteToggle}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          >
            {isMuted ? <VolumeX size={20} className="group-hover:scale-110 transition-transform" /> : <Volume2 size={20} className="group-hover:scale-110 transition-transform" />}
          </button>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group">
            <Maximize size={20} className="group-hover:scale-110 transition-transform" />
          </button>
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
              From scan-to-BIM precision to breathtaking 3D visualizations, we bring architectural dreams to life with cutting-edge technology.
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
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose a service to explore our capabilities
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(services).map(([key, service]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                  activeTab === key 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
              >
                <service.icon className={`mb-4 ${activeTab === key ? 'text-white' : 'text-blue-600'}`} size={32} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className={`text-sm ${activeTab === key ? 'text-blue-100' : 'text-gray-600'}`}>
                  {service.description.split('.')[0]}...
                </p>
                <div className={`mt-4 font-bold ${activeTab === key ? 'text-cyan-300' : 'text-blue-600'}`}>
                  {service.price}
                </div>
              </button>
            ))}
          </div>

          {/* Active Service Details */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-6">
                  {React.createElement(services[activeTab].icon, { 
                    className: "text-blue-600 mr-4", 
                    size: 48 
                  })}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{services[activeTab].title}</h3>
                    <p className="text-blue-600 font-semibold">{services[activeTab].price}</p>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {services[activeTab].description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {services[activeTab].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={onLogin}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                >
                  Get Quote for {services[activeTab].title}
                </button>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={services[activeTab].image} 
                    alt={services[activeTab].title}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
                  {services[activeTab].price.split(' ')[1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Proven Excellence</h2>
            <p className="text-xl text-blue-200">Numbers that speak for themselves</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`text-center p-8 rounded-2xl bg-gradient-to-br ${achievement.color} transform transition-all duration-500 hover:scale-110 ${
                  statsVisible ? 'animate-bounce-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <achievement.icon className="text-white mx-auto mb-4" size={48} />
                <div className="text-4xl font-bold text-white mb-2">
                  {statsVisible && (
                    <AnimatedCounter 
                      target={achievement.number.includes('+') ? parseInt(achievement.number) : achievement.number} 
                      suffix={achievement.number.includes('+') ? '+' : achievement.number.includes('%') ? '%' : ''} 
                    />
                  )}
                </div>
                <div className="text-white/90">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Project <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-xl text-gray-600">Explore our recent successes</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="grid lg:grid-cols-2">
                <div className="p-12 flex flex-col justify-center">
                  <div className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-6">
                    {projects[activeProject].category}
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-6">{projects[activeProject].title}</h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">{projects[activeProject].description}</p>
                  
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    {Object.entries(projects[activeProject].stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-gray-600 text-sm capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 transition-colors">
                      <Download size={16} />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
                
                <div className="relative h-96 lg:h-auto">
                  <img 
                    src={projects[activeProject].image} 
                    alt={projects[activeProject].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Project Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setActiveProject(prev => (prev - 1 + projects.length) % projects.length)}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeProject === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setActiveProject(prev => (prev + 1) % projects.length)}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Testimonials */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Client <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Success</span>
            </h2>
            <p className="text-xl text-gray-600">What our clients say about us</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform transition-all duration-500">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={24} />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed font-light">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex items-center justify-center space-x-6">
                <div className="relative">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  <div className="text-blue-600 text-sm font-medium">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            {/* Testimonial navigation */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Vision?
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join hundreds of satisfied clients who trust ArcadeAtelier to bring their architectural visions to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
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

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <Phone size={20} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <Mail size={20} />
              <span>hello@arcadeatelier.com</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-blue-200">
              <MapPin size={20} />
              <span>New York, NY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Styles */}
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
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
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
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
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

// Animated Counter Component
function AnimatedCounter({ target, suffix = '' }: { target: string | number, suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (typeof target === 'string' && target.includes('/')) {
      setCount(target as any);
      return;
    }
    
    const numericTarget = typeof target === 'string' ? parseInt(target) : target;
    if (isNaN(numericTarget)) {
      setCount(target as any);
      return;
    }
    
    const duration = 2000;
    const steps = 60;
    const stepValue = numericTarget / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.floor(stepValue * currentStep), numericTarget));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count}{suffix}</span>;
}
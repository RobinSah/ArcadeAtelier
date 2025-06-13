import React, { useState } from 'react';
import { 
  ArrowRight, 
  Building, 
  Layers, 
  FileText, 
  CheckCircle, 
  Zap, 
  Shield, 
  Users, 
  Award, 
  Star, 
  Clock,
  Scan,
  Eye,
  Lightbulb,
  Activity,
  Compass,
  Grid,
  Camera,
  Wrench,
  Home,
  Cpu,
  Download,
  Play
} from 'lucide-react';

interface ServicesPageProps {
  onLogin: () => void;
}

export default function ServicesPage({ onLogin }: ServicesPageProps) {
  const [activeService, setActiveService] = useState('bim');

  const serviceCategories = {
    bim: {
      title: 'BIM Services',
      icon: Building,
      color: 'blue',
      price: 'Starting from $60',
      services: [
        {
          name: 'BIM Modeling',
          description: 'Comprehensive BIM modeling for Architectural, Structural, and MEPFP disciplines',
          features: ['3D BIM models with LOD 100-200', 'Multi-discipline coordination', 'Clash detection integration'],
          icon: Building
        },
        {
          name: 'PDF/CAD to BIM',
          description: 'Convert existing drawings to intelligent BIM models',
          features: ['Accurate model creation', 'Data integration', 'Version control'],
          icon: FileText
        },
        {
          name: 'Scan to BIM',
          description: 'Point cloud to BIM conversion with precise accuracy',
          features: ['Point cloud processing', 'As-built documentation', 'Accurate measurements'],
          icon: Scan
        },
        {
          name: 'BIM Coordination',
          description: 'Multi-discipline coordination and clash detection',
          features: ['Clash detection & resolution', 'Model coordination', 'Issue tracking'],
          icon: Users
        }
      ]
    },
    architecture: {
      title: 'Architecture Services',
      icon: Home,
      color: 'indigo',
      price: 'Starting from $45',
      services: [
        {
          name: 'Architectural BIM/CAD',
          description: 'Complete architectural modeling and drafting services',
          features: ['Floor plans & elevations', 'Sections & details', 'Construction documentation'],
          icon: Home
        },
        {
          name: 'Architectural Drafting',
          description: 'Professional 2D drafting with furniture layouts and RCP',
          features: ['General plan layouts', 'Furniture arrangements', 'Dimensioned drawings'],
          icon: Layers
        },
        {
          name: '3D Rendering & Visualization',
          description: 'High-fidelity visualizations and immersive walkthroughs',
          features: ['Photorealistic renders', 'Virtual walkthroughs', 'Design presentations'],
          icon: Eye
        }
      ]
    },
    mepfp: {
      title: 'MEPFP Services',
      icon: Wrench,
      color: 'purple',
      price: 'Starting from $70',
      services: [
        {
          name: 'MEPFP Modeling',
          description: 'Detailed MEP modeling with accurate specifications',
          features: ['LOD 100-200 models', 'System coordination', 'Equipment specifications'],
          icon: Cpu
        },
        {
          name: 'Electrical Design',
          description: 'Comprehensive electrical BIM modeling and documentation',
          features: ['Electrical layouts', 'Load calculations', 'Panel schedules'],
          icon: Zap
        },
        {
          name: 'MEP Coordination',
          description: 'Cross-discipline MEP coordination and clash resolution',
          features: ['System integration', 'Clash detection', 'Coordination drawings'],
          icon: Grid
        }
      ]
    }
  };

  const processSteps = [
    {
      step: '01',
      title: 'Project Submission',
      description: 'Submit your project through our secure portal with all requirements',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      step: '02',
      title: 'Analysis & Planning',
      description: 'Our experts analyze your project and create a detailed execution plan',
      icon: Compass,
      color: 'bg-indigo-500'
    },
    {
      step: '03',
      title: 'Production Phase',
      description: 'Skilled professionals work on your project using industry-standard tools',
      icon: Wrench,
      color: 'bg-purple-500'
    },
    {
      step: '04',
      title: 'Quality Assurance',
      description: 'Rigorous quality checks ensure accuracy and compliance',
      icon: Shield,
      color: 'bg-green-500'
    },
    {
      step: '05',
      title: 'Delivery & Support',
      description: 'On-time delivery with comprehensive documentation and support',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const specialServices = [
    {
      name: 'Scan to BIM/CAD',
      description: 'Transform point cloud data into accurate BIM models and CAD drawings',
      features: ['Accurate point cloud processing', '3D BIM models with LOD 100-200', 'As-built 2D drawings (Architectural, Furniture, RCP, Electrical)', 'On-time delivery guarantee'],
      icon: Scan,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      popular: true
    },
    {
      name: 'As-Built Drawing Services',
      description: 'Comprehensive as-built documentation for existing structures',
      features: ['Field verification', 'Accurate measurements', 'Updated drawings', 'Digital documentation'],
      icon: Camera,
      color: 'bg-gradient-to-br from-green-500 to-teal-600',
      popular: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        text: 'text-blue-600',
        border: 'border-blue-600',
        gradient: 'from-blue-500 to-blue-600'
      },
      indigo: {
        bg: 'bg-indigo-600',
        hover: 'hover:bg-indigo-700',
        text: 'text-indigo-600',
        border: 'border-indigo-600',
        gradient: 'from-indigo-500 to-indigo-600'
      },
      purple: {
        bg: 'bg-purple-600',
        hover: 'hover:bg-purple-700',
        text: 'text-purple-600',
        border: 'border-purple-600',
        gradient: 'from-purple-500 to-purple-600'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section with Animation */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-purple-300 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white">
              Professional
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                BIM & CAD Solutions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12">
              Comprehensive digital solutions for architecture, engineering, and construction industries. 
              From scan-to-BIM to architectural visualization, we deliver precision and excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3 transform hover:scale-105"
              >
                <span>Start Your Project</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-blue-600">Service Categories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of specialized services
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(serviceCategories).map(([key, category]) => {
              const colorClasses = getColorClasses(category.color);
              const IconComponent = category.icon;
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveService(key)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeService === key
                      ? `${colorClasses.bg} text-white shadow-lg`
                      : `bg-gray-100 text-gray-700 hover:bg-gray-200`
                  }`}
                >
                  <IconComponent size={20} />
                  <span>{category.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Service Content */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${getColorClasses(serviceCategories[activeService as keyof typeof serviceCategories].color).gradient} p-8 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    {React.createElement(serviceCategories[activeService as keyof typeof serviceCategories].icon, { size: 32 })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{serviceCategories[activeService as keyof typeof serviceCategories].title}</h3>
                    <p className="text-lg opacity-90">{serviceCategories[activeService as keyof typeof serviceCategories].price}</p>
                  </div>
                </div>
                <button
                  onClick={onLogin}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                >
                  Get Quote
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceCategories[activeService as keyof typeof serviceCategories].services.map((service, index) => (
                  <div key={index} className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 ${getColorClasses(serviceCategories[activeService as keyof typeof serviceCategories].color).bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(service.icon, { size: 20, className: 'text-white' })}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">{service.name}</h4>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className={`${getColorClasses(serviceCategories[activeService as keyof typeof serviceCategories].color).text} flex-shrink-0 mt-0.5`} size={14} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Services Highlight */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Specialized <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced solutions for complex project requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {specialServices.map((service, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 ${service.popular ? 'ring-4 ring-blue-400 ring-opacity-50' : ''}`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className={`${service.color} p-8 text-white`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <service.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{service.name}</h3>
                      <p className="text-lg opacity-90">{service.description}</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="text-white/80 flex-shrink-0 mt-1" size={16} />
                        <span className="text-sm text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onLogin}
                    className="w-full bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined workflow designed for maximum efficiency and quality
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full hidden lg:block"></div>
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col lg:space-x-12 space-y-6 lg:space-y-0`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-center lg:justify-start mb-4">
                        <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mr-4`}>
                          <step.icon className="text-white" size={24} />
                        </div>
                        <span className="text-4xl font-bold text-gray-300">{step.step}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="relative z-10 hidden lg:block">
                    <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="lg:w-80 lg:h-48 w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center">
                      <step.icon className="text-blue-600" size={48} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Project <span className="text-blue-600">Showcase</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Examples of our precision and quality in BIM and CAD projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Commercial Complex BIM', type: 'BIM Modeling', image: 'building' },
              { title: 'Residential Development', type: 'Architectural', image: 'home' },
              { title: 'Industrial Facility MEP', type: 'MEPFP', image: 'factory' },
              { title: 'Point Cloud Processing', type: 'Scan to BIM', image: 'scan' },
              { title: '3D Visualization', type: 'Rendering', image: 'render' },
              { title: 'As-Built Documentation', type: 'CAD Drafting', image: 'blueprint' }
            ].map((project, index) => (
              <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <Building className="text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300" size={48} />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-600 text-sm font-medium">{project.type}</span>
                    <Star className="text-yellow-400" size={16} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">High-quality {project.type.toLowerCase()} project delivered on time with exceptional attention to detail.</p>
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Building className="text-white" size={32} />
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Layers className="text-white" size={32} />
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Wrench className="text-white" size={32} />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Experience the precision and quality that sets ArcadeAtelier apart. 
            From scan-to-BIM to architectural visualization, we deliver excellence on every project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onLogin}
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button className="px-12 py-4 border-2 border-white text-white rounded-xl font-semibold text-xl hover:bg-white hover:text-blue-900 transition-all duration-300 backdrop-blur-sm">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  X, 
  Mail, 
  Phone, 
  Building, 
  User, 
  MessageSquare, 
  Send,
  Clock,
  Zap,
  Shield,
  Heart
} from 'lucide-react';

interface AboutPageProps {
  onLogin: () => void;
}

export default function AboutPage({ onLogin }: AboutPageProps) {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // EmailJS configuration - Using environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      
      // Prepare email data
      const emailData = {
        to_email: 'your-email@company.com', // Your email address
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        reply_to: formData.email
      };
      
      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, emailData, publicKey);
      
      setSubmitStatus('success');
      setIsSubmitting(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          budget: '',
          timeline: ''
        });
      }, 3000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setIsSubmitting(false);
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every project delivered with meticulous attention to detail and accuracy.',
      color: 'bg-blue-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Industry-leading standards and best practices in every solution we deliver.',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients to understand and exceed their expectations.',
      color: 'bg-green-500'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology to transform the construction industry.',
      color: 'bg-orange-500'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed', icon: Building },
    { number: '150+', label: 'Happy Clients', icon: Heart },
    { number: '99.5%', label: 'On-Time Delivery', icon: Clock },
    { number: '24/7', label: 'Support Available', icon: Zap }
  ];

  const services = [
    'BIM Modeling Services',
    'Scan to BIM/CAD Services',
    'Architectural Drafting',
    '3D Visualization & Rendering',
    'MEPFP Modeling',
    'As-Built Drawing Services',
    'BIM Coordination',
    'CAD Conversion Services',
    'Other (Please specify in message)'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300 rounded-lg rotate-45 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-300 rounded-full animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            About
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              ArcadeAtelier
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Empowering the built world with digital precision through advanced BIM modeling, 
            CAD drafting, and cutting-edge construction technology solutions.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
              <p className="text-xl text-gray-700 leading-relaxed">
                To revolutionize the architecture, engineering, and construction industry by delivering 
                innovative digital solutions that enhance project efficiency, reduce costs, and enable 
                sustainable building practices for a better tomorrow.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <achievement.icon className="text-white" size={24} />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape the future of digital construction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 text-center group hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
                <div className={`w-16 h-16 ${value.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <value.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded in 2020, ArcadeAtelier emerged from a vision to bridge the gap between 
                  traditional construction practices and the digital future. Our team of certified 
                  professionals brings decades of combined experience in BIM, CAD, and construction technology.
                </p>
                <p>
                  We recognized the industry's need for reliable, high-quality digital services 
                  that could adapt to the rapidly evolving construction landscape. Today, we serve 
                  clients across multiple industries, from small architectural firms to large 
                  construction companies.
                </p>
                <p>
                  Our commitment to innovation, quality, and customer satisfaction has made us 
                  a trusted partner for hundreds of successful projects worldwide.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onLogin}
                  className="group flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </button>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                <div className="space-y-4">
                  {[
                    'Certified BIM and CAD professionals',
                    'Industry-leading software and technology',
                    'Rigorous quality assurance processes',
                    'Flexible project delivery timelines',
                    'Comprehensive post-delivery support',
                    'Competitive pricing with transparent costs'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Meet Our <span className="text-blue-600">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Lead BIM Specialist',
                credentials: 'Autodesk Certified Professional',
                image: 'SJ',
                color: 'from-blue-500 to-indigo-600'
              },
              {
                name: 'Mike Wilson',
                role: 'Senior CAD Designer',
                credentials: 'AutoCAD Certified Professional',
                image: 'MW',
                color: 'from-purple-500 to-pink-600'
              },
              {
                name: 'Emily Chen',
                role: 'Project Manager',
                credentials: 'PMP Certified',
                image: 'EC',
                color: 'from-green-500 to-teal-600'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 text-center group hover:transform hover:scale-105 shadow-sm hover:shadow-xl">
                <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <span className="text-white text-xl font-bold">{member.image}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let's discuss how we can help bring your construction projects to life with our digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onLogin}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Start Your Project
            </button>
            <button 
              onClick={() => setShowContactForm(true)}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">Get In Touch</h3>
                  <p className="text-gray-600 mt-2">Tell us about your project and we'll get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                  disabled={isSubmitting}
                >
                  <X size={24} />
                </button>
              </div>

              {submitStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Clock size={16} />
                    <span>This window will close automatically...</span>
                  </div>
                </div>
              ) : submitStatus === 'error' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <X className="text-red-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't send your message. Please try again or contact us directly.
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <User className="inline mr-2" size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Mail className="inline mr-2" size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Phone className="inline mr-2" size={16} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Building className="inline mr-2" size={16} />
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        placeholder="Enter your company name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Service Needed *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Project Budget
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-1000">Under $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="10000-25000">$10,000 - $25,000</option>
                        <option value="25000-50000">$25,000 - $50,000</option>
                        <option value="over-50000">Over $50,000</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Clock className="inline mr-2" size={16} />
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="1-month">1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <MessageSquare className="inline mr-2" size={16} />
                        Project Details *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 resize-none"
                        placeholder="Please describe your project requirements, scope, and any specific details..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="text-white" size={14} />
                      </div>
                      <div>
                        <h4 className="text-blue-900 font-semibold mb-1">What happens next?</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• We'll review your project requirements within 24 hours</li>
                          <li>• Our team will prepare a detailed proposal and timeline</li>
                          <li>• We'll schedule a consultation call to discuss your project</li>
                          <li>• Upon approval, we'll begin work immediately</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="group flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
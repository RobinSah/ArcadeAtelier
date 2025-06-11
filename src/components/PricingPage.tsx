import React from 'react';
import { Check, Star, ArrowRight, Building, Layers, FileText } from 'lucide-react';

interface PricingPageProps {
  onLogin: () => void;
}

export default function PricingPage({ onLogin }: PricingPageProps) {
  const plans = [
    {
      name: 'CAD Essentials',
      icon: Layers,
      price: '$45',
      period: 'per project',
      description: 'Perfect for basic 2D drafting and simple 3D modeling needs',
      features: [
        '2D Technical Drawings',
        'Basic 3D Modeling',
        'DWG/DXF File Formats',
        'Standard Delivery (5-7 days)',
        'Email Support',
        '2 Revisions Included'
      ],
      popular: false,
      color: 'bg-indigo-600'
    },
    {
      name: 'BIM Professional',
      icon: Building,
      price: '$60',
      period: 'per project',
      description: 'Comprehensive BIM services for complex construction projects',
      features: [
        'Advanced 3D BIM Modeling',
        'Clash Detection & Resolution',
        'Quantity Take-offs',
        'MEP Coordination',
        'Priority Delivery (3-5 days)',
        'Phone & Email Support',
        '3 Revisions Included',
        'IFC File Export',
        'As-Built Documentation'
      ],
      popular: true,
      color: 'bg-blue-600'
    },
    {
      name: 'Enterprise Solution',
      icon: Star,
      price: 'Custom',
      period: 'contact us',
      description: 'Tailored solutions for large-scale projects and ongoing partnerships',
      features: [
        'All BIM & CAD Services',
        'Dedicated Project Manager',
        'Custom Delivery Timeline',
        '24/7 Priority Support',
        'Unlimited Revisions',
        'Custom File Formats',
        'Team Training Sessions',
        'Volume Discounts',
        'API Integration Available'
      ],
      popular: false,
      color: 'bg-purple-600'
    }
  ];

  const addOns = [
    {
      name: 'Rush Delivery',
      description: '24-48 hour delivery for urgent projects',
      price: '+50%'
    },
    {
      name: 'Additional Revisions',
      description: 'Extra revisions beyond included limit',
      price: '$25 each'
    },
    {
      name: 'Site Survey Support',
      description: 'On-site measurement and documentation',
      price: '$50/day'
    },
    {
      name: 'Training Session',
      description: 'Custom training for your team',
      price: '$10/hour'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-blue-600">
              Transparent Pricing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Choose the perfect plan for your project needs. No hidden fees, 
            no surprises - just quality work at fair prices.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg ${
                plan.popular 
                  ? 'border-blue-300 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-2">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onLogin}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <span>{plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Additional <span className="text-blue-600">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your project with our optional add-on services for specialized requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{addon.name}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{addon.description}</p>
                <div className="text-blue-600 font-semibold">{addon.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Xactimate Coming Soon */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-50 rounded-2xl p-8 md:p-12 border border-purple-200 text-center">
            <div className="w-20 h-20 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
              <FileText className="text-white" size={32} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Xactimate Services <span className="text-orange-500">Coming Soon</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Professional Xactimate sketching and estimation services for insurance claims and restoration projects. 
              Starting from $75 per project.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                'Insurance Claim Sketches',
                'Property Damage Assessment', 
                'Restoration Estimates'
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-purple-600">
                  <Check size={16} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg">
                Join Waitlist
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300">
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: 'How do you calculate project pricing?',
                answer: 'Our pricing is based on project complexity, scope, and delivery timeline. We provide transparent quotes before starting any work.'
              },
              {
                question: 'What file formats do you deliver?',
                answer: 'We deliver in all standard formats including DWG, DXF, RVT, IFC, PDF, and custom formats as requested.'
              },
              {
                question: 'Do you offer volume discounts?',
                answer: 'Yes, we offer competitive volume discounts for multiple projects and ongoing partnerships. Contact us for custom pricing.'
              },
              {
                question: 'What is your revision policy?',
                answer: 'Each plan includes a specific number of revisions. Additional revisions are available at $25 each.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Choose your plan and start your first project today. No setup fees, no long-term contracts.
          </p>
          <button
            onClick={onLogin}
            className="px-12 py-4 bg-white text-blue-600 rounded-xl font-semibold text-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
          >
            Start Your Project
          </button>
        </div>
      </section>
    </div>
  );
}
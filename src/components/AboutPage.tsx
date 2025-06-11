import React from 'react';
import { Users, Target, Award, Globe, CheckCircle, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onLogin: () => void;
}

export default function AboutPage({ onLogin }: AboutPageProps) {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every project delivered with meticulous attention to detail and accuracy.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Industry-leading standards and best practices in every solution we deliver.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients to understand and exceed their expectations.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology to transform the construction industry.'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '99%', label: 'On-Time Delivery' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-blue-600">
              About ArcadeAtelier
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empowering the built world with digital precision through advanced BIM modeling, 
            CAD drafting, and cutting-edge construction technology solutions.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <p className="text-xl text-gray-600 leading-relaxed">
                To revolutionize the architecture, engineering, and construction industry by delivering 
                innovative digital solutions that enhance project efficiency, reduce costs, and enable 
                sustainable building practices for a better tomorrow.
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
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
      <section className="py-20 bg-white">
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
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 text-center group hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
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
      <section className="py-20 bg-gray-50">
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
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
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
      <section className="py-20 bg-white">
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
                image: 'SJ'
              },
              {
                name: 'Mike Wilson',
                role: 'Senior CAD Designer',
                credentials: 'AutoCAD Certified Professional',
                image: 'MW'
              },
              {
                name: 'Emily Chen',
                role: 'Project Manager',
                credentials: 'PMP Certified',
                image: 'EC'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 text-center group hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
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
      <section className="py-20 bg-blue-600">
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
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              Start Your Project
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
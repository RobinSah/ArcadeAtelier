import React from 'react';
import { ArrowRight, Building, Layers, FileText, CheckCircle } from 'lucide-react';

interface ServicesPageProps {
  onLogin: () => void;
}

export default function ServicesPage({ onLogin }: ServicesPageProps) {
  const bimFeatures = [
    '3D Architectural Modeling',
    'Structural BIM Modeling',
    'MEP Coordination',
    'Clash Detection & Resolution',
    'Quantity Take-offs',
    'As-Built Documentation',
    '4D Scheduling Integration',
    'IFC File Management'
  ];

  const cadFeatures = [
    '2D Technical Drawings',
    '3D Rendering & Visualization',
    'Construction Documentation',
    'DWG/DXF Conversions',
    'Site Plans & Layouts',
    'Detail Drawings',
    'Electrical Schematics',
    'Piping & Instrumentation'
  ];

  const xactimateFeatures = [
    'Insurance Claim Sketches',
    'Property Damage Assessment',
    'Restoration Estimates',
    'Roof & Floor Plans',
    'Material Calculations',
    'Labor Cost Analysis',
    'Supplement Creation',
    'Photo Integration'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-blue-600">
              Professional Services
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored for architecture, engineering, and construction industries
          </p>
        </div>
      </section>

      {/* BIM Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                  <Building className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">BIM Services</h2>
                  <p className="text-blue-600 text-xl font-semibold">Starting from $60.00</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Building Information Modeling (BIM) services using advanced software solutions like Revit and Navisworks. 
                Our expert team delivers comprehensive 3D models with integrated data for enhanced project coordination 
                and lifecycle management.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {bimFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0" size={20} />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span>Order BIM Service</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </button>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="aspect-video bg-blue-50 rounded-xl flex items-center justify-center">
                  <Building className="text-blue-600" size={64} />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-blue-200 rounded-full"></div>
                  <div className="h-3 bg-blue-100 rounded-full w-3/4"></div>
                  <div className="h-3 bg-blue-50 rounded-full w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAD Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                <div className="aspect-video bg-indigo-50 rounded-xl flex items-center justify-center">
                  <Layers className="text-indigo-600" size={64} />
                </div>
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-indigo-200 rounded-full"></div>
                  <div className="h-3 bg-indigo-100 rounded-full w-4/5"></div>
                  <div className="h-3 bg-indigo-50 rounded-full w-2/3"></div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <Layers className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">CAD Services</h2>
                  <p className="text-indigo-600 text-xl font-semibold">Starting from $45.00</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Computer-Aided Design (CAD) services for precise technical drawings and 3D visualizations. 
                We utilize industry-standard software like AutoCAD and MicroStation to deliver accurate 
                construction documentation and engineering drawings.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {cadFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-indigo-600 flex-shrink-0" size={20} />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={onLogin}
                className="group px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg flex items-center space-x-3"
              >
                <span>Order CAD Service</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Xactimate Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="text-white" size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">Xactimate Services</h2>
                  <div className="flex items-center space-x-3">
                    <p className="text-purple-600 text-xl font-semibold">Starting from $75.00</p>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Professional Xactimate sketching and estimation services designed specifically for insurance, 
                construction, and restoration industries. Our certified estimators provide accurate property 
                damage assessments and detailed restoration estimates.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {xactimateFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-purple-600 flex-shrink-0" size={20} />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all duration-300">
                  Join Waitlist
                </button>
                <button className="px-8 py-4 bg-gray-200 text-gray-500 rounded-xl font-semibold cursor-not-allowed">
                  Available Q2 2025
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-50 opacity-50"></div>
                <div className="relative aspect-video bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="text-purple-600" size={64} />
                </div>
                <div className="relative mt-6 space-y-3">
                  <div className="h-3 bg-purple-200 rounded-full"></div>
                  <div className="h-3 bg-purple-100 rounded-full w-3/5"></div>
                  <div className="h-3 bg-purple-50 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Service <span className="text-blue-600">Comparison</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-gray-600">Feature</th>
                  <th className="px-6 py-4 text-center text-blue-600">BIM</th>
                  <th className="px-6 py-4 text-center text-indigo-600">CAD</th>
                  <th className="px-6 py-4 text-center text-purple-600">Xactimate</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4">3D Modeling</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-blue-600 mx-auto" size={20} /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-indigo-600 mx-auto" size={20} /></td>
                  <td className="px-6 py-4 text-center">-</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4">Technical Drawings</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-blue-600 mx-auto" size={20} /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-indigo-600 mx-auto" size={20} /></td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-purple-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="px-6 py-4">Cost Estimation</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-blue-600 mx-auto" size={20} /></td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-purple-600 mx-auto" size={20} /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4">Insurance Claims</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center">-</td>
                  <td className="px-6 py-4 text-center"><CheckCircle className="text-purple-600 mx-auto" size={20} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
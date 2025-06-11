import React from 'react';
import { BookOpen, Video, Download, FileText, ExternalLink, Clock, User } from 'lucide-react';

export default function ResourcesPage() {
  const articles = [
    {
      title: 'BIM Best Practices for Modern Construction',
      excerpt: 'Learn the essential BIM workflows and standards that drive successful project delivery.',
      readTime: '8 min read',
      author: 'Sarah Johnson',
      category: 'BIM',
      featured: true
    },
    {
      title: 'CAD to BIM Migration: A Complete Guide',
      excerpt: 'Step-by-step process for transitioning from traditional CAD workflows to BIM methodologies.',
      readTime: '12 min read',
      author: 'Mike Wilson',
      category: 'BIM',
      featured: false
    },
    {
      title: 'Understanding LOD in BIM Projects',
      excerpt: 'Level of Detail specifications and their impact on project outcomes and deliverables.',
      readTime: '6 min read',
      author: 'Emily Chen',
      category: 'BIM',
      featured: false
    },
    {
      title: 'AutoCAD Standards and Layer Management',
      excerpt: 'Best practices for organizing CAD drawings and maintaining consistency across projects.',
      readTime: '10 min read',
      author: 'David Kumar',
      category: 'CAD',
      featured: false
    }
  ];

  const guides = [
    {
      title: 'BIM Implementation Roadmap',
      description: 'Complete guide to implementing BIM in your organization',
      pages: '45 pages',
      format: 'PDF'
    },
    {
      title: 'CAD Standards Manual',
      description: 'Industry-standard CAD practices and conventions',
      pages: '32 pages',
      format: 'PDF'
    },
    {
      title: 'Project Delivery Checklist',
      description: 'Quality assurance checklist for BIM/CAD projects',
      pages: '8 pages',
      format: 'PDF'
    }
  ];

  const videos = [
    {
      title: 'Introduction to BIM Workflows',
      duration: '15:30',
      views: '2.1K views',
      thumbnail: 'BIM'
    },
    {
      title: 'Advanced CAD Techniques',
      duration: '22:45',
      views: '1.8K views',
      thumbnail: 'CAD'
    },
    {
      title: 'Clash Detection Best Practices',
      duration: '18:20',
      views: '1.5K views',
      thumbnail: 'CD'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            <span className="text-blue-600">
              Resources
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive library of guides, tutorials, and best practices 
            for BIM, CAD, and construction technology.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {articles.filter(article => article.featured).map((article, index) => (
        <section key={index} className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="text-blue-600 text-sm font-medium">{article.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{article.title}</h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>
                  
                  <div className="flex items-center space-x-6 mb-8 text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <button className="group flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg">
                    <BookOpen size={16} />
                    <span>Read Article</span>
                    <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </button>
                </div>

                <div className="relative bg-blue-50 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <BookOpen className="text-white" size={48} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Articles Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Latest <span className="text-blue-600">Articles</span>
            </h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <span>View All</span>
              <ExternalLink size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.filter(article => !article.featured).map((article, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-blue-600 text-sm font-medium">{article.category}</span>
                  <BookOpen className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300" size={20} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Video <span className="text-blue-600">Tutorials</span>
            </h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <span>View Playlist</span>
              <ExternalLink size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 group hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                <div className="aspect-video bg-purple-50 flex items-center justify-center relative">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{video.thumbnail}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Video className="text-white" size={32} />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Guides */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Downloadable <span className="text-blue-600">Guides</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and checklists to help you implement best practices in your projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300 group hover:transform hover:scale-105 shadow-sm hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <FileText className="text-white"  size={24} />
                  </div>
                  <span className="text-green-600 text-sm font-medium">{guide.format}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {guide.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{guide.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{guide.pages}</span>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm">
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest articles, tutorials, and industry insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
            />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
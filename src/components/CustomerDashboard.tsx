import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  X, 
  Package, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Download
} from 'lucide-react';

interface Order {
  id: string;
  title: string;
  service: string;
  status: 'submitted' | 'in-progress' | 'for-revision' | 'delivered' | 'cancelled';
  deliveryDate: string;
  amount: number;
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateOrder, setShowCreateOrder] = useState(false);

  // Mock data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      title: 'Commercial Building - Main Street',
      service: 'BIM Modeling',
      status: 'in-progress',
      deliveryDate: '2024-01-15',
      amount: 2500
    },
    {
      id: 'ORD-002',
      title: 'Residential Complex - Oak Avenue',
      service: 'CAD Drafting',
      status: 'delivered',
      deliveryDate: '2024-01-10',
      amount: 1200
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Package className="text-blue-500" size={20} />;
      case 'in-progress': return <Clock className="text-yellow-500" size={20} />;
      case 'for-revision': return <AlertCircle className="text-orange-500" size={20} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled': return <X className="text-red-500" size={20} />;
      default: return <Package className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'in-progress': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'for-revision': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const statsData = [
    { label: 'Total Orders', value: 12, icon: Package, color: 'bg-blue-600' },
    { label: 'In Progress', value: 3, icon: Clock, color: 'bg-yellow-500' },
    { label: 'Delivered', value: 8, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'For Revision', value: 1, icon: AlertCircle, color: 'bg-orange-500' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customer <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-gray-600">Welcome back! Track your orders and manage your projects.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 w-fit border border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            All Orders
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
                    <FileText className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Orders in Progress</h3>
                    <p className="text-green-600">Total Amount</p>
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">$3,700</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <CheckCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Completed Orders</h3>
                    <p className="text-blue-600">Total Amount</p>
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900">$12,500</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
                  <button
                    onClick={() => setShowCreateOrder(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                  >
                    <Plus size={16} />
                    <span>Create New Order</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Order ID</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Project Title</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Service</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Delivery Date</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-blue-600 font-medium">{order.id}</td>
                        <td className="px-6 py-4 text-gray-900">{order.title}</td>
                        <td className="px-6 py-4 text-gray-600">{order.service}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.deliveryDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                              <Edit3 size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                              <Download size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by Order ID or Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="for-revision">For Revision</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => setShowCreateOrder(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                >
                  <Plus size={16} />
                  <span>Create New Order</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Order ID</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Project Title</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Service</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Delivery Date</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Amount</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 text-blue-600 font-medium">{order.id}</td>
                          <td className="px-6 py-4 text-gray-900">{order.title}</td>
                          <td className="px-6 py-4 text-gray-600">{order.service}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status.replace('-', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{order.deliveryDate}</td>
                          <td className="px-6 py-4 text-green-600 font-semibold">${order.amount}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                                <Download size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No orders found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Create Order Modal */}
        {showCreateOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl border border-gray-200 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create New Order</h3>
                <button
                  onClick={() => setShowCreateOrder(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Project Title</label>
                  <input
                    type="text"
                    placeholder="Enter project title"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Service Type</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200">
                    <option value="">Select service</option>
                    <option value="bim">BIM Services</option>
                    <option value="cad">CAD Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Project Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your project requirements"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Delivery Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowCreateOrder(false)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowCreateOrder(false)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                  >
                    Create Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
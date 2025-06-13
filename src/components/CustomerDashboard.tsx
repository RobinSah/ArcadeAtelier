import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Building,
  Eye,
  Download,
  Edit3,
  Link,
  FileText,
  DollarSign,
  TrendingUp,
  BarChart3,
  Activity,
  Upload,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { orderService, profileService } from '../services/orderService';
import { slackService } from '../config/slack';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Order creation state
  const [orderData, setOrderData] = useState({
    polycamLink: '',
    projectTitle: '',
    service: '',
    description: '',
    urgency: 'standard',
    budget: ''
  });

  // Data from Supabase
  const [stats, setStats] = useState({
    totalOrders: 0,
    submitted: 0,
    inProgress: 0,
    forRevision: 0,
    delivered: 0,
    cancelled: 0,
    totalAmount: 0,
    completedAmount: 0
  });

  const [orders, setOrders] = useState([]);
  const [customerProfile, setCustomerProfile] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Subscribe to real-time order updates
  useEffect(() => {
    const subscription = orderService.subscribeToOrders((payload) => {
      console.log('Real-time order update:', payload);
      loadDashboardData(); // Refresh data when orders change
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load orders and stats in parallel
      const [ordersData, statsData, profileData] = await Promise.all([
        orderService.getUserOrders(),
        orderService.getOrderStats(),
        profileService.getProfile().catch(() => null) // Profile might not exist yet
      ]);

      setOrders(ordersData);
      setStats(statsData);
      setCustomerProfile(profileData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // You might want to show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 'scan-to-bim',
      name: 'Scan to BIM',
      description: 'Convert point cloud data to precise BIM models',
      price: 'From $70',
      icon: '🏗️',
      popular: true
    },
    {
      id: 'bim-modeling',
      name: 'BIM Modeling',
      description: 'Comprehensive architectural and structural BIM services',
      price: 'From $60',
      icon: '🏢',
      popular: false
    },
    {
      id: 'cad-drafting',
      name: 'CAD Drafting',
      description: 'Precision 2D drafting and technical drawings',
      price: 'From $45',
      icon: '📐',
      popular: false
    },
    {
      id: '3d-visualization',
      name: '3D Visualization',
      description: 'Photorealistic renders and immersive walkthroughs',
      price: 'From $55',
      icon: '🎨',
      popular: false
    },
    {
      id: 'mepfp-modeling',
      name: 'MEPFP Modeling',
      description: 'Detailed MEP modeling and coordination',
      price: 'From $75',
      icon: '⚡',
      popular: false
    },
    {
      id: 'as-built-drawings',
      name: 'As-Built Drawings',
      description: 'Accurate as-built documentation services',
      price: 'From $50',
      icon: '📋',
      popular: false
    }
  ];

  const urgencyOptions = [
    { id: 'standard', name: 'Standard (5-7 days)', extra: '+$0' },
    { id: 'priority', name: 'Priority (3-4 days)', extra: '+25%' },
    { id: 'rush', name: 'Rush (1-2 days)', extra: '+50%' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return <Package className="text-blue-500" size={20} />;
      case 'in-progress': return <Clock className="text-yellow-500" size={20} />;
      case 'for-revision': return <AlertCircle className="text-orange-500" size={20} />;
      case 'delivered': return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled': return <X className="text-red-500" size={20} />;
      default: return <Package className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'in-progress': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'for-revision': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const handleCreateOrder = async () => {
    if (!orderData.projectTitle || !orderData.service || !orderData.description) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitLoading(true);
    try {
      // Create order in Supabase
      const newOrder = await orderService.createOrder(orderData);
      console.log('Order created successfully:', newOrder);

      // Send Slack notification
      try {
        await slackService.sendOrderNotification(newOrder, customerProfile);
        console.log('Slack notification sent successfully');
      } catch (slackError) {
        console.error('Failed to send Slack notification:', slackError);
        // Don't fail the entire process if Slack fails
      }

      // Reset form and close modal
      setOrderData({
        polycamLink: '',
        projectTitle: '',
        service: '',
        description: '',
        urgency: 'standard',
        budget: ''
      });
      setShowCreateOrder(false);
      setActiveTab('orders');

      // Refresh dashboard data
      await loadDashboardData();

      // Show success message (you might want to use a proper toast library)
      alert(`Order ${newOrder.order_number} created successfully!`);
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.project_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    // Date filtering
    let matchesDate = true;
    if (dateRange.from || dateRange.to) {
      const orderDate = new Date(order.created_at);
      if (dateRange.from) {
        matchesDate = matchesDate && orderDate >= new Date(dateRange.from);
      }
      if (dateRange.to) {
        matchesDate = matchesDate && orderDate <= new Date(dateRange.to);
      }
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatServiceName = (service) => {
    const serviceNames = {
      'scan-to-bim': 'Scan to BIM',
      'bim-modeling': 'BIM Modeling',
      'cad-drafting': 'CAD Drafting',
      '3d-visualization': '3D Visualization',
      'mepfp-modeling': 'MEPFP Modeling',
      'as-built-drawings': 'As-Built Drawings'
    };
    return serviceNames[service] || service;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Dashboard <span className="text-blue-600">Overview</span>
            </h1>
            <p className="text-gray-600 mt-2">Manage your projects and track progress</p>
          </div>
          <button
            onClick={() => setShowCreateOrder(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <Plus size={20} />
            <span>Create New Order</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-xl p-1 w-fit border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 size={16} />
              <span>Overview</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Package size={16} />
              <span>My Orders</span>
            </div>
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-blue-600" size={32} />
                <span className="ml-2 text-gray-600">Loading dashboard data...</span>
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Package className="text-blue-600" size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">This Month</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalOrders}</div>
                    <div className="text-gray-600 text-sm">Total Orders</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="text-yellow-600" size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">Active</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.inProgress}</div>
                    <div className="text-gray-600 text-sm">In Progress</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="text-green-600" size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">Completed</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.delivered}</div>
                    <div className="text-gray-600 text-sm">Delivered</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <AlertCircle className="text-orange-600" size={24} />
                      </div>
                      <span className="text-sm font-medium text-gray-500">Pending</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stats.forRevision}</div>
                    <div className="text-gray-600 text-sm">For Revision</div>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Orders in Progress</h3>
                        <p className="text-blue-600">Current Value</p>
                      </div>
                      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                        <Activity className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">${stats.totalAmount.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <TrendingUp size={16} />
                      <span className="text-sm font-medium">Active projects</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Completed Orders</h3>
                        <p className="text-green-600">Total Invested</p>
                      </div>
                      <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                        <DollarSign className="text-white" size={32} />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">${stats.completedAmount.toLocaleString()}</div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Successfully delivered</span>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                      >
                        View All Orders →
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Package className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders Yet</h3>
                        <p className="text-gray-600 mb-6">Create your first order to get started with our professional services.</p>
                        <button
                          onClick={() => setShowCreateOrder(true)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                        >
                          Create Your First Order
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.slice(0, 5).map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center space-x-4">
                              {getStatusIcon(order.status)}
                              <div>
                                <h4 className="font-semibold text-gray-900">{order.project_title}</h4>
                                <p className="text-sm text-gray-600">{order.order_number} • {formatServiceName(order.service)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status.replace('-', ' ').toUpperCase()}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{formatDate(order.created_at)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter Orders</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by Order ID or Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  />
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                >
                  <option value="all">All Statuses</option>
                  <option value="submitted">Submitted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="for-revision">For Revision</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  placeholder="From Date"
                />

                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                  placeholder="To Date"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Order ID</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Project Title</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Service</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Delivery Target</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Amount</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 text-blue-600 font-medium">{order.order_number}</td>
                          <td className="px-6 py-4 text-gray-900">{order.project_title}</td>
                          <td className="px-6 py-4 text-gray-600">{formatServiceName(order.service)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status.replace('-', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(order.delivery_date)}</td>
                          <td className="px-6 py-4 text-green-600 font-semibold">
                            {order.amount ? `${order.amount.toLocaleString()}` : 'TBD'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              {order.status === 'delivered' && (
                                <button 
                                  className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                                  title="Download Files"
                                >
                                  <Download size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="text-gray-500">
                            <Package className="mx-auto mb-4" size={48} />
                            <h3 className="text-lg font-medium mb-2">No Orders Found</h3>
                            <p>No orders match your current search criteria</p>
                          </div>
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
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">Create New Order</h3>
                    <p className="text-gray-600 mt-2">Tell us about your project requirements</p>
                  </div>
                  <button
                    onClick={() => setShowCreateOrder(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Project Details */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Project Details</h4>
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          <Link className="inline mr-2" size={16} />
                          Polycam Link (Optional)
                        </label>
                        <input
                          type="url"
                          value={orderData.polycamLink}
                          onChange={(e) => setOrderData(prev => ({ ...prev, polycamLink: e.target.value }))}
                          placeholder="Paste your Polycam 3D scan link here..."
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                        />
                        <p className="text-sm text-gray-500 mt-2">If you have a 3D scan from Polycam, paste the link here for better accuracy</p>
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          <Building className="inline mr-2" size={16} />
                          Project Title *
                        </label>
                        <input
                          type="text"
                          value={orderData.projectTitle}
                          onChange={(e) => setOrderData(prev => ({ ...prev, projectTitle: e.target.value }))}
                          placeholder="e.g., Commercial Building - Main Street"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">
                          <FileText className="inline mr-2" size={16} />
                          Project Description *
                        </label>
                        <textarea
                          value={orderData.description}
                          onChange={(e) => setOrderData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your project requirements, scope, dimensions, and any specific details..."
                          rows={4}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 resize-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Select Service *</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => setOrderData(prev => ({ ...prev, service: service.id }))}
                          className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            orderData.service === service.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {service.popular && (
                            <div className="absolute -top-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Popular
                            </div>
                          )}
                          <div className="text-3xl mb-3">{service.icon}</div>
                          <h5 className="font-bold text-gray-900 mb-2">{service.name}</h5>
                          <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                          <div className="text-blue-600 font-semibold">{service.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Urgency and Budget */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Clock className="inline mr-2" size={16} />
                        Urgency Level
                      </label>
                      <select
                        value={orderData.urgency}
                        onChange={(e) => setOrderData(prev => ({ ...prev, urgency: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                      >
                        {urgencyOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name} {option.extra}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <DollarSign className="inline mr-2" size={16} />
                        Budget Range
                      </label>
                      <select
                        value={orderData.budget}
                        onChange={(e) => setOrderData(prev => ({ ...prev, budget: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-500">Under $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value="over-10000">Over $10,000</option>
                      </select>
                    </div>
                  </div>

                  {/* Next Steps Info */}
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                        <ArrowRight className="text-white" size={16} />
                      </div>
                      <div>
                        <h5 className="font-semibold text-blue-900 mb-2">What happens next?</h5>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• We'll review your project details within 2-4 hours</li>
                          <li>• You'll receive a detailed quote and timeline</li>
                          <li>• Once approved, our team will start working on your project</li>
                          <li>• Regular updates will be provided throughout the process</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      onClick={() => setShowCreateOrder(false)}
                      className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateOrder}
                      disabled={!orderData.projectTitle || !orderData.service || !orderData.description || submitLoading}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          <span>Creating Order...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Order</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
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
  User,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Download,
  UserCheck
} from 'lucide-react';

interface Order {
  id: string;
  title: string;
  customer: string;
  customerEmail: string;
  service: string;
  status: 'submitted' | 'assigned' | 'in-progress' | 'for-revision' | 'delivered' | 'cancelled';
  assignedTo: string;
  deliveryDate: string;
  amount: number;
  priority: 'low' | 'medium' | 'high';
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock data
  const orders: Order[] = [
    {
      id: 'ORD-001',
      title: 'Commercial Building - Main Street',
      customer: 'John Smith',
      customerEmail: 'john@company.com',
      service: 'BIM Modeling',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      deliveryDate: '2024-01-15',
      amount: 2500,
      priority: 'high'
    },
    {
      id: 'ORD-002',
      title: 'Residential Complex - Oak Avenue',
      customer: 'Emily Davis',
      customerEmail: 'emily@construction.com',
      service: 'CAD Drafting',
      status: 'delivered',
      assignedTo: 'Mike Wilson',
      deliveryDate: '2024-01-10',
      amount: 1200,
      priority: 'medium'
    },
    {
      id: 'ORD-003',
      title: 'Office Building - Tech Park',
      customer: 'Robert Chen',
      customerEmail: 'robert@techcorp.com',
      service: 'BIM Modeling',
      status: 'submitted',
      assignedTo: 'Unassigned',
      deliveryDate: '2024-01-20',
      amount: 3500,
      priority: 'high'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Package className="text-blue-500" size={20} />;
      case 'assigned': return <UserCheck className="text-purple-500" size={20} />;
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
      case 'assigned': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'in-progress': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'for-revision': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'delivered': return 'text-green-700 bg-green-100 border-green-200';
      case 'cancelled': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-700 bg-green-100 border-green-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const statsData = [
    { label: 'Total Orders', value: 48, icon: Package, color: 'bg-blue-600', change: '+12%' },
    { label: 'Active Projects', value: 15, icon: Clock, color: 'bg-yellow-500', change: '+8%' },
    { label: 'Completed', value: 32, icon: CheckCircle, color: 'bg-green-500', change: '+15%' },
    { label: 'Revenue', value: '$125K', icon: DollarSign, color: 'bg-purple-600', change: '+22%' }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Admin <span className="text-blue-600">Dashboard</span>
          </h1>
          <p className="text-gray-600">Manage orders, track progress, and oversee operations.</p>
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
            Order Management
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <span className="text-green-600 text-sm font-semibold flex items-center">
                      <TrendingUp size={14} className="mr-1" />
                      {stat.change}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900">Recent Orders</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Order ID</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Customer</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Project</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Assigned To</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Priority</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 text-blue-600 font-medium">{order.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-gray-900 font-medium">{order.customer}</div>
                            <div className="text-gray-500 text-sm">{order.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{order.title}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{order.assignedTo}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setShowOrderDetails(true)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                              <Eye size={16} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                              <Edit3 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team Performance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Team Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">SJ</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">Sarah Johnson</div>
                        <div className="text-gray-500 text-sm">BIM Specialist</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">12 Projects</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">MW</span>
                      </div>
                      <div>
                        <div className="text-gray-900 font-medium">Mike Wilson</div>
                        <div className="text-gray-500 text-sm">CAD Designer</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">8 Projects</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all duration-200">
                    <Plus size={20} />
                    <span>Assign New Order</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all duration-200">
                    <Users size={20} />
                    <span>Manage Team</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200">
                    <FileText size={20} />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    placeholder="Search orders..."
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
                  <option value="assigned">Assigned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="for-revision">For Revision</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-sm">
                  <Filter size={16} />
                  <span>Advanced Filter</span>
                </button>

                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm">
                  <Download size={16} />
                  <span>Export</span>
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
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Customer</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Project</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Service</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Assigned To</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Priority</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Amount</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 text-blue-600 font-medium">{order.id}</td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-gray-900 font-medium">{order.customer}</div>
                              <div className="text-gray-500 text-sm">{order.customerEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-900">{order.title}</td>
                          <td className="px-6 py-4 text-gray-600">{order.service}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status.replace('-', ' ')}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{order.assignedTo}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(order.priority)}`}>
                              {order.priority.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-green-600 font-semibold">${order.amount}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => setShowOrderDetails(true)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              >
                                <Eye size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                                <UserCheck size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="px-6 py-12 text-center text-gray-500">
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

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Comprehensive analytics and reporting features are coming soon. 
                Track performance metrics, revenue trends, and team productivity.
              </p>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {showOrderDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-4xl border border-gray-200 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Order Details - ORD-001</h3>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Information</h4>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="text-blue-600">Title:</span> Commercial Building - Main Street</p>
                      <p><span className="text-blue-600">Service:</span> BIM Modeling</p>
                      <p><span className="text-blue-600">Priority:</span> High</p>
                      <p><span className="text-blue-600">Delivery Date:</span> January 15, 2024</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Details</h4>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="text-blue-600">Name:</span> John Smith</p>
                      <p><span className="text-blue-600">Email:</span> john@company.com</p>
                      <p><span className="text-blue-600">Company:</span> Smith Construction Co.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Assignment</h4>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="text-blue-600">Assigned To:</span> Sarah Johnson</p>
                      <p><span className="text-blue-600">Team:</span> BIM Team Alpha</p>
                      <p><span className="text-blue-600">Start Date:</span> January 5, 2024</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Status & Progress</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="text-blue-600 font-semibold">75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Financial Details</h4>
                    <div className="space-y-2 text-gray-600">
                      <p><span className="text-blue-600">Project Value:</span> $2,500</p>
                      <p><span className="text-blue-600">Paid Amount:</span> $1,250</p>
                      <p><span className="text-blue-600">Remaining:</span> $1,250</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm">
                        Update Status
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 text-sm">
                        Reassign
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm">
                        Contact Customer
                      </button>
                    </div>
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
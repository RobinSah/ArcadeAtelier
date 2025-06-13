// src/services/orderService.js
import { supabase } from '../config/supabase.js'

// Order service functions
export const orderService = {
  // Create new order
  async createOrder(orderData) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const newOrder = {
      customer_id: user.id,
      project_title: orderData.projectTitle,
      description: orderData.description,
      service: orderData.service,
      polycam_link: orderData.polycamLink || null,
      urgency: orderData.urgency,
      budget: orderData.budget || null,
      status: 'submitted'
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([newOrder])
      .select()
      .single()

    if (error) {
      console.error('Error creating order:', error)
      throw error
    }

    return data
  },

  // Get all orders for current user
  async getUserOrders() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      throw error
    }

    return data || []
  },

  // Get order statistics
  async getOrderStats() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('orders')
      .select('status, amount')
      .eq('customer_id', user.id)

    if (error) {
      console.error('Error fetching order stats:', error)
      throw error
    }

    const stats = {
      totalOrders: data?.length || 0,
      submitted: data?.filter(order => order.status === 'submitted').length || 0,
      inProgress: data?.filter(order => order.status === 'in-progress').length || 0,
      forRevision: data?.filter(order => order.status === 'for-revision').length || 0,
      delivered: data?.filter(order => order.status === 'delivered').length || 0,
      cancelled: data?.filter(order => order.status === 'cancelled').length || 0,
      totalAmount: data?.filter(order => ['submitted', 'in-progress', 'for-revision'].includes(order.status))
        .reduce((sum, order) => sum + (order.amount || 0), 0) || 0,
      completedAmount: data?.filter(order => order.status === 'delivered')
        .reduce((sum, order) => sum + (order.amount || 0), 0) || 0
    }

    return stats
  },

  // Subscribe to order changes
  subscribeToOrders(callback) {
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders'
      }, callback)
      .subscribe()

    return subscription
  },

  // Get single order by ID
  async getOrderById(orderId) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .eq('customer_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching order:', error)
      throw error
    }

    return data
  },

  // Update order status (for admin use)
  async updateOrderStatus(orderId, newStatus) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date() })
      .eq('id', orderId)
      .select()
      .single()

    if (error) {
      console.error('Error updating order status:', error)
      throw error
    }

    return data
  }
}

// Customer profile service functions  
export const profileService = {
  // Get user profile (works with your existing user_profiles table)
  async getProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get from your existing user_profiles table
    const { data: profileData, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error)
      // Return basic user data if profile doesn't exist
      return {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || '',
        first_name: user.user_metadata?.first_name || '',
        last_name: user.user_metadata?.last_name || '',
        company: user.user_metadata?.company || ''
      }
    }

    return profileData || {
      id: user.id,
      email: user.email,
      full_name: profileData?.first_name && profileData?.last_name 
        ? `${profileData.first_name} ${profileData.last_name}` 
        : user.user_metadata?.full_name || '',
      first_name: user.user_metadata?.first_name || '',
      last_name: user.user_metadata?.last_name || '',
      company: user.user_metadata?.company || ''
    }
  },

  // Create or update profile (works with your existing structure)
  async upsertProfile(profileData) {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{
        id: user.id,
        email: user.email,
        ...profileData,
        updated_at: new Date()
      }])
      .select()
      .single()

    if (error) {
      console.error('Error updating profile:', error)
      throw error
    }

    return data
  }
}
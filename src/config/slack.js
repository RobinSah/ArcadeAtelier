// src/config/slack.js
// Slack service that uses Netlify Functions (no CORS issues!)

export const slackService = {
  // Send notification via Netlify function
  async sendOrderNotification(orderData, customerData = null) {
    try {
      console.log('🔄 Sending Slack notification via Netlify function...');
      
      // Call your Netlify function
      const functionUrl = `${window.location.origin}/.netlify/functions/send-slack-notification`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          customerData
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Slack notification sent successfully via Netlify function!');
        return true;
      } else {
        throw new Error(result.error || `Function error: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Failed to send Slack notification via Netlify function:', error);
      
      // Fallback: Log the notification details so you don't lose info
      console.log('🔔 [FALLBACK] Order notification details:', {
        orderNumber: orderData.order_number,
        projectTitle: orderData.project_title,
        service: orderData.service,
        urgency: orderData.urgency,
        deliveryDate: orderData.delivery_date,
        customer: customerData?.first_name || customerData?.email || 'Unknown',
        error: error.message
      });

      // Don't break the order creation flow
      return false;
    }
  },

  // Send order status update notification
  async sendOrderUpdateNotification(orderData, oldStatus, newStatus) {
    try {
      console.log('🔄 Sending Slack update notification...');
      
      // For updates, you can use a simpler message or create another function
      const functionUrl = `${window.location.origin}/.netlify/functions/send-slack-notification`;
      
      // Create a simplified order data for status updates
      const updateOrderData = {
        ...orderData,
        project_title: `Status Update: ${orderData.project_title}`,
        description: `Order status changed from "${oldStatus}" to "${newStatus}"`
      };
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData: updateOrderData,
          customerData: null
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Slack update notification sent successfully!');
        return true;
      } else {
        throw new Error(result.error || `Function error: ${response.status}`);
      }

    } catch (error) {
      console.error('❌ Failed to send Slack update notification:', error);
      
      // Fallback logging
      console.log('🔔 [FALLBACK] Order status update:', {
        orderNumber: orderData.order_number,
        oldStatus,
        newStatus,
        error: error.message
      });
      
      return false;
    }
  }
}
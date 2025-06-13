// src/config/slack.js
// Slack integration for sending order notifications

export const slackService = {
  // Send new order notification to Slack
  async sendOrderNotification(orderData, customerData = null) {
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Slack webhook URL not configured')
      return false
    }

    const formatCurrency = (amount) => {
      return amount ? `$${amount.toLocaleString()}` : 'TBD'
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const serviceEmojis = {
      'scan-to-bim': '🏗️',
      'bim-modeling': '🏢',
      'cad-drafting': '📐',
      '3d-visualization': '🎨',
      'mepfp-modeling': '⚡',
      'as-built-drawings': '📋'
    }

    const urgencyEmojis = {
      'standard': '🟢',
      'priority': '🟡',
      'rush': '🔴'
    }

    const serviceNames = {
      'scan-to-bim': 'Scan to BIM',
      'bim-modeling': 'BIM Modeling',
      'cad-drafting': 'CAD Drafting',
      '3d-visualization': '3D Visualization',
      'mepfp-modeling': 'MEPFP Modeling',
      'as-built-drawings': 'As-Built Drawings'
    }

    const message = {
      text: `🎉 New Order Received! Order #${orderData.order_number}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `🎉 New Order Received!`,
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Order ID:*\n${orderData.order_number}`
            },
            {
              type: "mrkdwn",
              text: `*Status:*\n📝 Submitted`
            },
            {
              type: "mrkdwn",
              text: `*Service:*\n${serviceEmojis[orderData.service] || '📋'} ${serviceNames[orderData.service] || orderData.service}`
            },
            {
              type: "mrkdwn",
              text: `*Urgency:*\n${urgencyEmojis[orderData.urgency]} ${orderData.urgency.charAt(0).toUpperCase() + orderData.urgency.slice(1)}`
            }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Project Title:*\n${orderData.project_title}`
          }
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Description:*\n${orderData.description}`
          }
        }
      ]
    }

    // Add customer information if available
    if (customerData) {
      const customerName = customerData.first_name && customerData.last_name 
        ? `${customerData.first_name} ${customerData.last_name}`
        : customerData.full_name || customerData.email || 'N/A'
      
      message.blocks.push({
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*Customer:*\n${customerName}`
          },
          {
            type: "mrkdwn",
            text: `*Company:*\n${customerData.company || 'N/A'}`
          }
        ]
      })
    }

    // Add optional fields
    const optionalFields = []
    
    if (orderData.polycam_link) {
      optionalFields.push({
        type: "mrkdwn",
        text: `*Polycam Link:*\n<${orderData.polycam_link}|View 3D Scan>`
      })
    }

    if (orderData.budget) {
      optionalFields.push({
        type: "mrkdwn",
        text: `*Budget Range:*\n${orderData.budget.replace('-', ' - $').replace('under', 'Under $').replace('over', 'Over $')}`
      })
    }

    if (optionalFields.length > 0) {
      message.blocks.push({
        type: "section",
        fields: optionalFields
      })
    }

    // Add delivery information
    message.blocks.push({
      type: "section",
      fields: [
        {
          type: "mrkdwn",
          text: `*Estimated Delivery:*\n📅 ${formatDate(orderData.delivery_date)}`
        },
        {
          type: "mrkdwn",
          text: `*Order Date:*\n📆 ${formatDate(orderData.created_at)}`
        }
      ]
    })

    // Add action buttons
    message.blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "View Order Details",
            emoji: true
          },
          style: "primary",
          url: `${import.meta.env.VITE_APP_URL || 'http://localhost:5173'}/admin/orders/${orderData.id}`,
          action_id: "view_order"
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Mark In Progress",
            emoji: true
          },
          style: "default",
          action_id: "mark_in_progress",
          value: orderData.id
        }
      ]
    })

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      })

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status}`)
      }

      console.log('✅ Slack notification sent successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to send Slack notification:', error)
      return false
    }
  },

  // Send order status update notification
  async sendOrderUpdateNotification(orderData, oldStatus, newStatus) {
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Slack webhook URL not configured')
      return false
    }

    const statusEmojis = {
      'submitted': '📝',
      'in-progress': '⚙️',
      'for-revision': '🔄',
      'delivered': '✅',
      'cancelled': '❌'
    }

    const message = {
      text: `Order #${orderData.order_number} status updated`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Order Status Updated*\n\nOrder #${orderData.order_number} - ${orderData.project_title}\n\n${statusEmojis[oldStatus]} ${oldStatus.replace('-', ' ')} → ${statusEmojis[newStatus]} ${newStatus.replace('-', ' ')}`
          }
        }
      ]
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      })

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status}`)
      }

      console.log('✅ Slack update notification sent successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to send Slack update notification:', error)
      return false
    }
  }
}
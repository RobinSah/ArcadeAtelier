// This should be created as a backend API route
// For Next.js: pages/api/send-slack-notification.js or app/api/send-slack-notification/route.js
// For Express: app.post('/api/send-slack-notification', ...)
// For Netlify: netlify/functions/send-slack-notification.js

export default async function handler(req, res) {
  // Handle CORS for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { orderData, customerData } = req.body;

    if (!orderData) {
      res.status(400).json({ error: 'Order data is required' });
      return;
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL; // Note: No VITE_ prefix for backend

    if (!webhookUrl) {
      console.error('Slack webhook URL not configured');
      res.status(500).json({ error: 'Slack webhook not configured' });
      return;
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    const serviceEmojis = {
      'scan-to-bim': '🏗️',
      'bim-modeling': '🏢',
      'cad-drafting': '📐',
      '3d-visualization': '🎨',
      'mepfp-modeling': '⚡',
      'as-built-drawings': '📋'
    };

    const urgencyEmojis = {
      'standard': '🟢',
      'priority': '🟡',
      'rush': '🔴'
    };

    const serviceNames = {
      'scan-to-bim': 'Scan to BIM',
      'bim-modeling': 'BIM Modeling',
      'cad-drafting': 'CAD Drafting',
      '3d-visualization': '3D Visualization',
      'mepfp-modeling': 'MEPFP Modeling',
      'as-built-drawings': 'As-Built Drawings'
    };

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
    };

    // Add customer information if available
    if (customerData) {
      const customerName = customerData.first_name && customerData.last_name 
        ? `${customerData.first_name} ${customerData.last_name}`
        : customerData.full_name || customerData.email || 'N/A';
      
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
      });
    }

    // Add optional fields
    const optionalFields = [];
    
    if (orderData.polycam_link) {
      optionalFields.push({
        type: "mrkdwn",
        text: `*Polycam Link:*\n<${orderData.polycam_link}|View 3D Scan>`
      });
    }

    if (orderData.budget) {
      optionalFields.push({
        type: "mrkdwn",
        text: `*Budget Range:*\n${orderData.budget.replace('-', ' - $').replace('under', 'Under $').replace('over', 'Over $')}`
      });
    }

    if (optionalFields.length > 0) {
      message.blocks.push({
        type: "section",
        fields: optionalFields
      });
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
    });

    // Send to Slack
    const slackResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack API error: ${slackResponse.status}`);
    }

    console.log('✅ Slack notification sent successfully');
    res.status(200).json({ success: true, message: 'Slack notification sent successfully' });

  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
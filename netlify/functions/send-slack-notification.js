// netlify/functions/send-slack-notification.js
const https = require('https');
const url = require('url');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { orderData, customerData } = JSON.parse(event.body);

    if (!orderData) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Order data is required' }),
      };
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('Slack webhook URL not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Slack webhook not configured' }),
      };
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

    // Create the Slack message
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

    // Send to Slack using native https module (more reliable in Netlify)
    const slackUrl = url.parse(webhookUrl);
    const postData = JSON.stringify(message);

    const options = {
      hostname: slackUrl.hostname,
      port: 443,
      path: slackUrl.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const slackResponse = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: data
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });

    if (slackResponse.statusCode !== 200) {
      throw new Error(`Slack API error: ${slackResponse.statusCode}`);
    }

    console.log('✅ Slack notification sent successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Slack notification sent successfully' 
      }),
    };

  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
    };
  }
};
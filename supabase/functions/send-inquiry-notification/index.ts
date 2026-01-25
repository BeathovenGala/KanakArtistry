import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

// CORS headers for browser preflight requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

serve(async (req) => {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }
    console.log("=== DIAGNOSTIC: Function invoked ===");

    // Get all secrets
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    console.log("Secret check - RESEND_API_KEY:", RESEND_API_KEY ? "✓ SET" : "✗ MISSING");
    console.log("Secret check - SUPABASE_URL:", SUPABASE_URL ? "✓ SET" : "✗ MISSING");
    console.log("Secret check - SUPABASE_SERVICE_KEY:", SUPABASE_SERVICE_KEY ? "✓ SET" : "✗ MISSING");

    // Validate all secrets are present
    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      const missing = [
        !RESEND_API_KEY && "RESEND_API_KEY",
        !SUPABASE_URL && "SUPABASE_URL",
        !SUPABASE_SERVICE_KEY && "SUPABASE_SERVICE_ROLE_KEY"
      ].filter(Boolean);

      const errorMsg = `❌ MISSING SECRETS: ${missing.join(", ")}. Go to Supabase Dashboard → Settings → Vault and add them.`;
      console.error(errorMsg);
      return new Response(JSON.stringify({ error: errorMsg }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      });
    }

    // Parse request
    const inquiry = await req.json();
    console.log("✓ Inquiry data received");

    // Initialize Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Get email recipient from config
    const { data: config, error: configError } = await supabase
      .from('email_config')
      .select('recipient_email')
      .single();

    if (configError) {
      console.warn("⚠️ Could not fetch email_config:", configError.message);
    }

    const recipientEmail = config?.recipient_email || 'kanakartistry.art@gmail.com';
    console.log("📧 Recipient email:", recipientEmail);

    // Format date in IST (use current time if submitted_at is missing)
    const submittedDate = inquiry.submitted_at ? new Date(inquiry.submitted_at) : new Date();
    const istDate = Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    }).format(submittedDate);

    // Send instant notification email via Resend API
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 0;
              background-color: #f5f5f5;
            }
            .container { background: white; margin: 20px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 16px; }
            .content { padding: 30px; }
            .info-card { 
              background: #f9fafb; 
              padding: 20px; 
              margin: 20px 0; 
              border-radius: 8px; 
              border: 1px solid #e5e7eb;
            }
            .info-row { margin-bottom: 16px; }
            .info-row:last-child { margin-bottom: 0; }
            .label { 
              font-weight: 600; 
              color: #667eea; 
              margin-bottom: 4px; 
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .value { color: #1f2937; font-size: 15px; }
            .value a { color: #667eea; text-decoration: none; }
            .value a:hover { text-decoration: underline; }
            .message-box { 
              background: #f0f4ff; 
              padding: 20px; 
              border-left: 4px solid #667eea; 
              border-radius: 6px; 
              margin: 20px 0;
            }
            .message-box .label { color: #4338ca; }
            .message-box .value { 
              color: #374151; 
              font-size: 15px; 
              line-height: 1.7;
              white-space: pre-wrap;
            }
            .cta-section { 
              text-align: center; 
              margin: 30px 0;
              padding: 20px;
              background: #fafafa;
              border-radius: 8px;
            }
            .cta-button { 
              display: inline-block; 
              padding: 14px 32px; 
              background: #667eea; 
              color: white !important; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 8px;
              font-weight: 600;
              font-size: 14px;
              transition: background 0.2s;
            }
            .cta-button:hover { background: #5568d3; }
            .badge { 
              display: inline-block; 
              padding: 6px 14px; 
              background: #10b981; 
              color: white; 
              border-radius: 20px; 
              font-size: 13px;
              font-weight: 600;
            }
            .meta-info { 
              margin-top: 20px; 
              padding: 20px; 
              background: #fafafa; 
              border-radius: 8px; 
              font-size: 13px; 
              color: #6b7280;
              border: 1px solid #e5e7eb;
            }
            .meta-info strong { color: #374151; display: block; margin-bottom: 8px; }
            .footer { 
              text-align: center; 
              padding: 30px; 
              color: #6b7280; 
              font-size: 13px;
              background: #fafafa;
              border-top: 1px solid #e5e7eb;
            }
            .footer p { margin: 5px 0; }
            .urgent { 
              background: #fef3c7; 
              border: 1px solid #fbbf24;
              padding: 12px; 
              border-radius: 6px; 
              margin: 20px 0;
              text-align: center;
              font-size: 14px;
              color: #92400e;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎨 New Art Inquiry!</h1>
              <p>You have a new custom art commission request</p>
            </div>
            
            <div class="content">
              <div class="urgent">
                ⚡ Respond within 24 hours for best customer experience
              </div>

              <div class="info-card">
                <div class="info-row">
                  <div class="label">👤 Client Name</div>
                  <div class="value">${inquiry.name}</div>
                </div>
                
                <div class="info-row">
                  <div class="label">📧 Email Address</div>
                  <div class="value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
                </div>
                
                <div class="info-row">
                  <div class="label">📞 Phone Number</div>
                  <div class="value"><a href="tel:${inquiry.phone}">${inquiry.phone}</a></div>
                </div>
              </div>
              
              <div class="info-card">
                <div class="info-row">
                  <div class="label">🎨 Art Type Requested</div>
                  <div class="value">${inquiry.art_type}</div>
                </div>
                
                <div class="info-row">
                  <div class="label">📏 Preferred Size</div>
                  <div class="value">${inquiry.size || 'Not specified'}</div>
                </div>
                
                <div class="info-row">
                  <div class="label">💰 Budget Range</div>
                  <div class="value">${inquiry.budget || 'Not specified'}</div>
                </div>
                
                <div class="info-row">
                  <div class="label">⏰ Timeline</div>
                  <div class="value"><span class="badge">${inquiry.timeline}</span></div>
                </div>
              </div>
              
              <div class="message-box">
                <div class="label">💬 Client's Vision & Message</div>
                <div class="value">${inquiry.message}</div>
              </div>
              
              <div class="cta-section">
                <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">Quick Actions</p>
                <a href="mailto:${inquiry.email}?subject=Re: Your Art Commission Inquiry&body=Hi ${inquiry.name},%0A%0AThank you for your interest in commissioning a custom artwork!" class="cta-button">📧 Reply to ${inquiry.name}</a>
                <a href="tel:${inquiry.phone}" class="cta-button">📞 Call Now</a>
              </div>
              
              <div class="meta-info">
                <strong>📊 Submission Details</strong>
                <div>📅 Submitted: ${istDate}</div>
                <div>🌐 IP Address: ${inquiry.ip_address || 'Unknown'}</div>
                <div>💻 Device: ${inquiry.user_agent ? inquiry.user_agent.substring(0, 80) + '...' : 'Unknown'}</div>
              </div>
            </div>
            
            <div class="footer">
              <p><strong>This is an instant notification from KanakArtistry</strong></p>
              <p>You'll also receive a daily summary email at midnight IST</p>
              <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
                To manage email preferences, press Ctrl+Shift+A in your dashboard
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

    // Call Resend API
    console.log("📤 Calling Resend API with from: onboarding@resend.dev");

    const resendPayload = {
      from: "KanakArtistry <onboarding@resend.dev>",
      to: recipientEmail,
      subject: `🎨 New Art Inquiry from ${inquiry.name}`,
      html: emailHtml,
    };

    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    // Get response details
    const responseText = await result.text();
    const responseStatus = result.status;

    console.log("=== RESEND RESPONSE ===");
    console.log("Status:", responseStatus);
    console.log("Body:", responseText);

    // Handle non-OK responses
    if (!result.ok) {
      console.error("❌ Resend API error:");
      console.error("Status code:", responseStatus);
      console.error("Response:", responseText);

      return new Response(
        JSON.stringify({
          error: "Resend API failed",
          status: responseStatus,
          body: responseText,
          hint: responseStatus === 401 ? "Invalid API key in Vault" : "Check Resend dashboard for details"
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    try {
      const resendData = JSON.parse(responseText);
      console.log("✅ Email sent successfully. Message ID:", resendData.id);

      return new Response(JSON.stringify({ success: true, messageId: resendData.id, sentTo: recipientEmail }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      });
    } catch (parseError) {
      console.log("✅ Email sent (could not parse response ID)");
      return new Response(JSON.stringify({ success: true, sentTo: recipientEmail }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      });
    }
  } catch (error) {
    console.error('=== FATAL ERROR ===');
    console.error('Error:', error instanceof Error ? error.message : String(error));
    console.error('Stack:', error instanceof Error ? error.stack : 'N/A');

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});

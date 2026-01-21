// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  try {
    // Initialize Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!);

    // Get data from last 24 hours
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Fetch queries
    const { data: queries } = await supabase
      .from('queries')
      .select('*')
      .gte('submitted_at', twentyFourHoursAgo.toISOString())
      .order('submitted_at', { ascending: false });

    // Fetch visitor stats
    const { data: visitors } = await supabase
      .from('visitors')
      .select('*')
      .gte('visited_at', twentyFourHoursAgo.toISOString());

    const uniqueVisitors = new Set(visitors?.map(v => v.ip_address) || []).size;
    const totalVisits = visitors?.length || 0;
    const queriesCount = queries?.length || 0;

    // Generate email HTML
    let emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #17a2b8 0%, #117a8b 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
            .stats { display: flex; gap: 15px; margin: 20px 0; }
            .stat-box { background: #f0f7ff; padding: 20px; border-radius: 8px; flex: 1; text-align: center; border-left: 4px solid #17a2b8; }
            .stat-number { font-size: 32px; font-weight: bold; color: #17a2b8; }
            .stat-label { color: #666; margin-top: 5px; }
            .inquiry-card { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffd700; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📊 Daily Report - KanakArtistry</h1>
              <p>${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <h2>📈 Visitor Statistics (Last 24 Hours)</h2>
            <div class="stats">
              <div class="stat-box">
                <div class="stat-number">${uniqueVisitors}</div>
                <div class="stat-label">Unique Visitors</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">${totalVisits}</div>
                <div class="stat-label">Total Visits</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">${queriesCount}</div>
                <div class="stat-label">New Inquiries</div>
              </div>
            </div>`;

    if (queriesCount === 0) {
      emailHTML += `
            <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50; margin: 20px 0;">
              <h3 style="color: #2e7d32; margin: 0;">✓ No New Inquiries</h3>
              <p style="margin: 10px 0 0 0; color: #555;">No new art inquiries in the last 24 hours.</p>
            </div>`;
    } else {
      emailHTML += `<h2>🎨 New Art Inquiries</h2>`;
      queries?.forEach(q => {
        emailHTML += `
            <div class="inquiry-card">
              <h3>${q.name}</h3>
              <p><strong>📧 Email:</strong> ${q.email}</p>
              <p><strong>📱 Phone:</strong> ${q.phone || 'N/A'}</p>
              <p><strong>🎨 Art Type:</strong> ${q.art_type || 'Not specified'}</p>
              <p><strong>📏 Size:</strong> ${q.size || 'N/A'}</p>
              <p><strong>💰 Budget:</strong> ${q.budget || 'N/A'}</p>
              <p><strong>⏱️ Timeline:</strong> ${q.timeline || 'N/A'}</p>
              <p><strong>💬 Message:</strong> ${q.message}</p>
              <p style="margin-top: 10px;"><small>🕐 Submitted: ${new Date(q.submitted_at).toLocaleString('en-IN')}</small></p>
            </div>`;
      });
    }

    emailHTML += `
            <div class="footer">
              <p>This is an automated daily report from KanakArtistry</p>
              <p>Report generated on ${new Date().toLocaleString('en-IN')}</p>
            </div>
          </div>
        </body>
      </html>`;

    // Send email
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "KanakArtistry <onboarding@resend.dev>",
        to: "has132006@gmail.com",
        subject: `📊 Daily Report: ${queriesCount} ${queriesCount === 1 ? 'Inquiry' : 'Inquiries'} | ${uniqueVisitors} Visitors`,
        html: emailHTML,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ 
        success: true,
        emailId: result.id,
        stats: { uniqueVisitors, totalVisits, queriesCount }
      }), 
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});

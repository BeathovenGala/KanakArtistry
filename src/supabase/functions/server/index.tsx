import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-ac147f29/health", (c) => {
  return c.json({ status: "ok" });
});

// Submit inquiry endpoint
app.post("/make-server-ac147f29/inquiries", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.artType || !body.message) {
      return c.json({ 
        success: false, 
        error: "Missing required fields: name, email, artType, and message are required" 
      }, 400);
    }

    // Generate unique inquiry ID
    const inquiryId = `inquiry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store inquiry in KV store
    const inquiryData = {
      id: inquiryId,
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      artType: body.artType,
      size: body.size || '',
      budget: body.budget || '',
      timeline: body.timeline || '',
      message: body.message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await kv.set(inquiryId, inquiryData);

    console.log('New inquiry received:', inquiryId, inquiryData);

    return c.json({ 
      success: true, 
      inquiryId,
      message: "Inquiry submitted successfully" 
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return c.json({ 
      success: false, 
      error: `Error submitting inquiry: ${error.message}` 
    }, 500);
  }
});

// Email inquiry via Resend
app.post("/make-server-ac147f29/inquiries/email", async (c) => {
  try {
    const body = await c.req.json();

    // Required fields
    const required = ["name", "email", "artType", "message"] as const;
    for (const f of required) {
      if (!body[f] || typeof body[f] !== "string") {
        return c.json({ success: false, error: `Missing field: ${f}` }, 400);
      }
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const DESTINATION_EMAIL = Deno.env.get("DESTINATION_EMAIL") || "contact@kanakartistry.com";

    if (!RESEND_API_KEY) {
      return c.json({ success: false, error: "RESEND_API_KEY not configured" }, 500);
    }

    const subject = `New Inquiry from ${body.name}`;
    const html = `
      <h2>New Inquiry</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Phone:</strong> ${body.phone || "-"}</p>
      <p><strong>Art Type:</strong> ${body.artType}</p>
      <p><strong>Size:</strong> ${body.size || "-"}</p>
      <p><strong>Budget:</strong> ${body.budget || "-"}</p>
      <p><strong>Timeline:</strong> ${body.timeline || "-"}</p>
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;font-family:inherit;">${body.message}</pre>
    `;

    const payload = {
      from: "KanakArtistry <no-reply@kanakartistry.com>",
      to: DESTINATION_EMAIL,
      subject,
      html,
    };

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Resend error:", text);
      return c.json({ success: false, error: "Failed to send email" }, 500);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return c.json({ success: false, error: `Error: ${error.message}` }, 500);
  }
});

// Get all inquiries endpoint (for viewing all inquiries)
app.get("/make-server-ac147f29/inquiries", async (c) => {
  try {
    const inquiries = await kv.getByPrefix('inquiry_');
    
    // Sort by creation date (newest first)
    const sortedInquiries = inquiries.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ 
      success: true, 
      inquiries: sortedInquiries,
      count: sortedInquiries.length
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return c.json({ 
      success: false, 
      error: `Error fetching inquiries: ${error.message}` 
    }, 500);
  }
});

// Get single inquiry by ID
app.get("/make-server-ac147f29/inquiries/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const inquiry = await kv.get(id);

    if (!inquiry) {
      return c.json({ 
        success: false, 
        error: "Inquiry not found" 
      }, 404);
    }

    return c.json({ 
      success: true, 
      inquiry 
    });
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return c.json({ 
      success: false, 
      error: `Error fetching inquiry: ${error.message}` 
    }, 500);
  }
});

// Update inquiry status
app.put("/make-server-ac147f29/inquiries/:id/status", async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    
    const inquiry = await kv.get(id);
    if (!inquiry) {
      return c.json({ 
        success: false, 
        error: "Inquiry not found" 
      }, 404);
    }

    const updatedInquiry = {
      ...inquiry,
      status: body.status,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updatedInquiry);

    return c.json({ 
      success: true, 
      inquiry: updatedInquiry 
    });
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return c.json({ 
      success: false, 
      error: `Error updating inquiry status: ${error.message}` 
    }, 500);
  }
});

Deno.serve(app.fetch);
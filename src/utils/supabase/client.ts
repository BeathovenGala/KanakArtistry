import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cxdilpipsfdkihcfwbha.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get visitor IP
export async function getVisitorIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
}

// Function to track visitor
export async function trackVisitor() {
  try {
    const ip = await getVisitorIP();
    const timestamp = new Date().toISOString();

    const { data, error } = await supabase
      .from('visitors')
      .insert([
        {
          ip_address: ip,
          visited_at: timestamp,
          user_agent: navigator.userAgent,
        }
      ]);

    if (error) {
      console.error('Error tracking visitor:', error);
    }
  } catch (err) {
    console.error('Failed to track visitor:', err);
  }
}

// Function to save inquiry/query to database
export async function saveInquiry(formData: {
  name: string;
  email: string;
  phone: string;
  artType: string;
  size: string;
  budget: string;
  message: string;
  timeline: string;
}) {
  try {
    const ip = await getVisitorIP();
    const timestamp = new Date().toISOString();

    const { data, error } = await supabase
      .from('queries')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          art_type: formData.artType,
          size: formData.size,
          budget: formData.budget,
          message: formData.message,
          timeline: formData.timeline,
          ip_address: ip,
          submitted_at: timestamp,
          user_agent: navigator.userAgent,
          status: 'pending',
        }
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (err) {
    console.error('Error saving inquiry:', err);
    throw err;
  }
}

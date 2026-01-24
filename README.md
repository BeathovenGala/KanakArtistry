
  # Art Display Website

  This is a code bundle for Art Display Website. The original project is available at https://www.figma.com/design/h94OgATYe8m1urAQX9gOXW/Art-Display-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Email on Form Submission
  
  Each inquiry (from the Commission form) is saved to Supabase and then emailed via a Supabase Functions endpoint using the Resend API.
  
  Configure these environment variables on the functions runtime:
  - RESEND_API_KEY: Your Resend API key
  - DESTINATION_EMAIL: Inbox to receive inquiry emails (e.g., you@example.com)
  
  Optional (front-end):
  - VITE_FUNCTIONS_URL: Explicit functions base (e.g., https://<project-ref>.functions.supabase.co). If not set, it’s derived from VITE_SUPABASE_URL.
  
  After configuration, submissions from `InquiryModal` are emailed automatically.
  
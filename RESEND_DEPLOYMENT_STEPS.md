# Resend Deployment - Step by Step Guide

## Step 1: Add Environment Secrets

1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project (cxdilpipsfdkihcfwbha)
2. Click **Settings** → **API** (left sidebar)
3. Copy your **Service Role Key** (starts with `eyJhbG...`)
4. Now go to **Settings** → **Vault** (left sidebar under "Configuration")
5. Click **New Secret** and add these 3 secrets:

   **Secret 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_fUHbV3RV_7WwJGyZdo1d4Ywb59CE3yAWa`

   **Secret 2:**
   - Name: `SUPABASE_URL`
   - Value: `https://cxdilpipsfdkihcfwbha.supabase.co`

   **Secret 3:**
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: (paste the Service Role Key you copied above)

✅ Save each secret by clicking "Add Secret"

---

## Step 2: Deploy Edge Function

1. Go to [Supabase Dashboard](https://app.supabase.com) → Your Project
2. Click **Edge Functions** (left sidebar)
3. Click **Create a new function**
4. Name it: `send-inquiry-notification`
5. Choose **TypeScript** template
6. Click **Create function**
7. Delete all the template code and **paste the complete code** from:
   - `supabase/functions/send-inquiry-notification/index.ts`
8. Click **Deploy** button (bottom right)
9. Wait for "Function deployed successfully" message

✅ Your function is now live!

---

## Step 3: Test the Function

1. In Edge Functions, find `send-inquiry-notification`
2. Click on it
3. Click **Invoke** button
4. Paste this test data in the JSON field:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "phone": "+91-9999999999",
  "art_type": "Landscape Painting",
  "size": "Large",
  "budget": "₹50,000",
  "timeline": "Immediate",
  "message": "This is a test inquiry",
  "submitted_at": "2026-01-24T10:30:00Z"
}
```
5. Click **Invoke**
6. Check your email (has132006@gmail.com) for the notification

✅ If you got an email, it's working!

---

## Step 4: The InquiryModal is Already Updated

Your `src/components/InquiryModal.tsx` already has the code to call this function when form is submitted. No additional changes needed!

---

## Troubleshooting

**If you get an error in the function:**
- Check that all 3 secrets are added in Vault
- Check function logs: Click function → **Logs** tab
- Make sure the `email_config` table has a row with `recipient_email`

**If email doesn't arrive:**
- Check Resend dashboard at https://dashboard.resend.com - look for failed deliveries
- Verify recipient email is correct in `email_config` table
- Wait 2-3 minutes (sometimes takes a moment)

**If Invoke button shows error:**
- Likely missing secrets - go back to Step 1 and verify all 3 are added
- Refresh the page and try again

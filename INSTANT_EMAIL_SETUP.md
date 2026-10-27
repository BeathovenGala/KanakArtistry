# Instant Email Notification Setup Guide

## ✅ What Was Implemented

You now have **TWO email systems** working together:

1. **🚀 Instant Notification** - Immediate email when form is submitted
2. **📊 Daily Summary** - Midnight IST email with all inquiries (existing)

---

## 📧 Email Types You'll Receive

### 1. Instant Email (NEW)
**Subject:** `🎨 New Art Inquiry from [Client Name]`  
**When:** Immediately after form submission  
**Contains:**
- Client details (name, email, phone)
- Art specifications (type, size, budget, timeline)
- Full message/vision
- Quick action buttons (reply, call)
- Submission timestamp & IP

### 2. Daily Summary (EXISTING)
**Subject:** `📊 Daily Report - [Date]`  
**When:** Midnight IST (00:00 IST / 18:30 UTC)  
**Contains:**
- Visitor statistics (24 hours)
- All new inquiries from last 24 hours
- "No new inquiries" if empty

---

## 🚀 Deployment Steps

### Option A: Via Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard/project/cxdilpipsfdkihcfwbha
   - Navigate to: **Edge Functions** section

2. **Create New Function**
   - Click "Create a new function"
   - Name: `send-inquiry-notification`
   - Copy the entire content from:
     ```
     supabase/functions/send-inquiry-notification/index.ts
     ```
   - Paste it in the editor
   - Click "Deploy"

3. **Verify Deployment**
   - Function should appear in your functions list
   - Status should be "Deployed"

### Option B: Via Supabase CLI (If Installed)

```bash
# If you have Supabase CLI installed
supabase functions deploy send-inquiry-notification

# Check if deployed
supabase functions list
```

---

## 🧪 Testing the Setup

### Test 1: Verify Function is Deployed

1. Go to Supabase Dashboard → Edge Functions
2. Find `send-inquiry-notification`
3. Click "Invoke" to test manually
4. Use this test payload:
```json
{
  "name": "Test Client",
  "email": "test@example.com",
  "phone": "+91-9876543210",
  "art_type": "Tree of Life - Test",
  "size": "24x36 inches",
  "budget": "₹5000",
  "timeline": "2 weeks",
  "message": "This is a test inquiry to verify instant notifications work.",
  "submitted_at": "2026-01-24T18:30:00Z",
  "ip_address": "192.168.1.1",
  "user_agent": "Test Browser"
}
```
5. Check `has132006@gmail.com` for test email (check spam!)

### Test 2: Full Form Submission

1. Open your website in browser
2. Click "Start Your Custom Commission"
3. Fill out the entire form
4. Submit
5. You should receive instant email within 1-2 minutes
6. Check your Supabase queries table to verify it saved

### Test 3: Verify Daily Summary Still Works

- Wait until midnight IST (00:00 IST)
- You should receive the daily summary email as before
- OR manually invoke `send-daily-report` function in Supabase

---

## 📊 What Happens When Form is Submitted

```
User fills form
      ↓
Form submitted
      ↓
1. Data saved to Supabase `queries` table ✅
      ↓
2. Instant email sent via Edge Function ✅
      ↓
3. User sees success message ✅
      ↓
(At midnight) Daily summary email sent ✅
```

---

## 🔧 Configuration

### Change Email Recipient

### Change Email Recipient
You can manage email recipients directly in your Supabase database. The system now supports **multiple recipients** - simply add more rows to the table!

**Via Supabase Dashboard**
1. Go to **Table Editor** → `email_config` table
2. **To change:** Update the `recipient_email` field of an existing row
3. **To add more:** Click "Insert new row" and add another email address
4. Both instant and daily emails will be sent to ALL addresses in this table

### Current Settings
- **Recipient**: `has132006@gmail.com`
- **Instant emails**: Enabled ✅
- **Daily summary**: Midnight IST ✅
- **Email provider**: Resend API

---

## 🎨 Email Preview

### Instant Notification Email
```
┌─────────────────────────────────────────┐
│   🎨 New Art Inquiry!                   │
│   You have a new custom commission      │
│                                          │
│   ⚡ Respond within 24 hours            │
│                                          │
│   👤 Client: John Doe                   │
│   📧 john@email.com                     │
│   📞 +91-9876543210                     │
│                                          │
│   🎨 Art Type: Tree of Life            │
│   📏 Size: 24x36 inches                │
│   💰 Budget: ₹5000                     │
│   ⏰ Timeline: 2 weeks                 │
│                                          │
│   💬 Message:                           │
│   "I would like a vibrant Tree of      │
│   Life painting similar to your        │
│   Living Tree of Grace..."             │
│                                          │
│   [📧 Reply to John] [📞 Call Now]     │
└─────────────────────────────────────────┘
```

---

## ⚠️ Troubleshooting

### Not receiving instant emails?

1. **Check Spam Folder**
   - Look for emails from "KanakArtistry <onboarding@resend.dev>"

2. **Verify Function Deployment**
   - Go to Supabase Dashboard → Edge Functions
   - Ensure `send-inquiry-notification` shows "Deployed"

3. **Check Function Logs**
   - In Supabase Dashboard → send-inquiry-notification → Logs
   - Look for errors or successful invocations

4. **Verify Environment Variables**
   - Supabase Dashboard → Settings → Vault
   - Ensure `RESEND_API_KEY` is set

5. **Test Form Submission**
   - Open browser console (F12)
   - Submit form
   - Check for any errors in console
   - Look for "Instant email notification sent" message

### Form submits but no email?

1. Check browser console for errors
2. Verify internet connection
3. Test the function manually in Supabase Dashboard
4. Check Resend API logs (if you have access)

### Daily summary stopped working?

Don't worry! The daily summary is completely separate:
- Function: `send-daily-report`
- Schedule: Managed by pg_cron
- Check: Supabase Dashboard → Database → Cron Jobs

---

## 📈 Monitoring

### Check Recent Inquiries
1. Press `Ctrl + Shift + A` on website
2. View all inquiries in table
3. Click for full details

### Check Email Delivery
- **Instant emails**: Check function logs in Supabase
- **Daily summary**: Check cron job history
- **All emails**: Check `has132006@gmail.com` inbox

### Database Queries
```sql
-- View recent inquiries
SELECT * FROM queries 
ORDER BY submitted_at DESC 
LIMIT 10;

-- Count today's inquiries
SELECT COUNT(*) FROM queries 
WHERE submitted_at >= CURRENT_DATE;

-- Check email config
SELECT * FROM email_config;
```

---

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Form submissions save to database
- ✅ Instant email arrives within 1-2 minutes
- ✅ Daily summary arrives at midnight IST
- ✅ Admin dashboard shows all inquiries
- ✅ No errors in browser console

---

## 🎉 You're All Set!

Your KanakArtistry website now has:
- ✅ **Instant email notifications** for every inquiry
- ✅ **Daily summary emails** for overview
- ✅ **Admin dashboard** to view all inquiries
- ✅ **Visitor tracking** for analytics
- ✅ **Professional email templates**

**Next Step:** Deploy the function using Option A above and test!

---

## 📞 Quick Reference

| Action | Method |
|--------|--------|
| View inquiries | Press `Ctrl + Shift + A` |
| Change email | Admin Dashboard → Email Config |
| Test instant email | Submit form on website |
| Test daily summary | Invoke `send-daily-report` in Supabase |
| Check logs | Supabase → Edge Functions → Logs |

---

**Status**: ✅ Code implemented, ready to deploy!

**Deployment Required**: Deploy `send-inquiry-notification` function via Supabase Dashboard

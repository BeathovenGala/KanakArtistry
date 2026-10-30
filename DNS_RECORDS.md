# DNS Records for kanakartistry.in

Please add the following records to your domain provider (GoDaddy, Namecheap, Hostinger, etc.) to verify your domain for email sending.

## 1. MX Record (Mail Exchange)
*If you already have MX records for Google/Gmail, you might not need this if you only want to SEND. However, Resend recommends it for the `send` subdomain.*

| Type | Name | Value | TTL | Priority |
|------|------|-------|-----|----------|
| MX   | send | feedback-smtp.ap-northeast-1.amazonses.com | Auto / 1 Hour | 10 |

## 2. TXT Record (SPF - Sender Policy Framework)
*This authorizes Resend to send emails on your behalf.*

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT  | send | `v=spf1 include:amazonses.com ~all` | Auto / 1 Hour |

## 3. TXT Record (DKIM - DomainKeys Identified Mail)
*This signs your emails to prove they weren't tampered with.*

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT  | resend._domainkey | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC96q2DApGN+H2soqLJgvCJmeFUIvyaSlT7I2PocCiKJmZTsuYDsOcThK6KyYBLJNToJdPfL3P+BRZVdKwSdIS22pRzZpkUAySsnkb5Q1BRLpmvdyTFjjDz1crkUbWp4SqZCJUHOc3PKPNWeJYcsOnrgg7p8du/aKbzjwUqIU7WTwIDAQAB` | Auto / 1 Hour |

## 4. TXT Record (DMARC)
*Recommended for better deliverability.*

| Type | Name | Value | TTL |
|------|------|-------|-----|
| TXT  | _dmarc | `v=DMARC1; p=none;` | Auto / 1 Hour |

---

## ⏳ After Adding Records
1. Go to your **Resend Dashboard** → **Domains**.
2. Click on **kanakartistry.in**.
3. Click **Verify DNS Records**.
4. Status should change to **Verified** (can take anywhere from a few minutes to 24 hours).

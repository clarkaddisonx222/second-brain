# Google Drive Service Account Setup Guide

**Purpose:** Secure server-to-server access to Google Drive (for OpenClaw to access shared Psalm MP3s)

**Advantages over OAuth:**
- No browser authentication flow
- No risk of credentials being disabled
- Designed for automated/server access
- Simpler to set up and maintain

---

## Step-by-Step Setup

### 1. Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with: `clarkaddisonx222@gmail.com`
3. Select project: `openclaw-drive-access-486915`

### 2. Create a Service Account

1. Go to **"IAM & Admin" > "Service Accounts"** (left sidebar)
2. Click **"+ CREATE SERVICE ACCOUNT"**
3. **Service account name:** `openclaw-drive-service`
4. **Service account ID:** (auto-generated, keep it)
5. **Description:** `Service account for OpenClaw to access shared Drive files`
6. Click **"CREATE AND CONTINUE"**

### 3. Grant Access (Optional)

1. For **"Select a role"**, choose: **"Project" > "Viewer"** (or skip for now)
2. Click **"CONTINUE"**
3. Click **"DONE"**

### 4. Create a Key (Critical Step)

1. You should now see your new service account in the list
2. Click on the service account email (looks like: `openclaw-drive-service@openclaw-drive-access-486915.iam.gserviceaccount.com`)
3. Go to the **"KEYS"** tab
4. Click **"ADD KEY" > "Create new key"**
5. Select **"JSON"** format
6. Click **"CREATE"**
7. **A JSON file will download automatically** (keep this safe!)

### 5. Securely Share the Key

**The downloaded file contains:**
- Service account email
- Private key
- Project ID
- Client ID

**Important:** This file grants access to your Google Drive. Share it securely.

**Secure sharing options:**
- Send via encrypted email
- Use 1Password secure note
- Or simply tell me you've downloaded it and I'll guide you through manual setup

### 6. Enable Domain-Wide Delegation (Optional, for accessing any Drive file)

If you want the service account to access files shared with it:

1. In the service account details, click **"Advanced settings"**
2. Look for **"Domain-wide delegation"**
3. Click **"View Google Workspace Admin Console"** (requires admin access)

**OR simpler approach:** Just share specific folders/files with the service account email (Step 7)

### 7. Share Drive Files with Service Account

1. In Google Drive, go to the folder with your Psalm MP3s
2. Click **"Share"**
3. Add the service account email: `openclaw-drive-service@openclaw-drive-access-486915.iam.gserviceaccount.com`
4. Grant **"Viewer"** permission
5. Click **"Share"**

---

## What the JSON File Looks Like

```json
{
  "type": "service_account",
  "project_id": "openclaw-drive-access-486915",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMII...\n-----END PRIVATE KEY-----\n",
  "client_email": "openclaw-drive-service@openclaw-drive-access-486915.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/openclaw-drive-service%40openclaw-drive-access-486915.iam.gserviceaccount.com"
}
```

---

## Authentication Flow (Once I Have the Key)

1. You provide the JSON file securely
2. I place it in `/data/.openclaw/.secrets/`
3. Python uses the service account to authenticate automatically
4. Access Drive files shared with the service account
5. Download Psalm MP3s for transcription

**No browser windows. No tokens. Just works.**

---

## Testing Checklist

Once setup is complete:

- [ ] Service account created
- [ ] JSON key downloaded
- [ ] Key shared securely with Clark
- [ ] Psalm MP3 folder shared with service account
- [ ] Drive access tested successfully
- [ ] File download working

---

## Next Steps

1. **Scott:** Follow steps 1-7 above
2. **Scott:** Share the JSON key file securely (not via Telegram this time)
3. **Clark:** Place key and test Drive access
4. **Clark:** Download first Psalm MP3 for transcription

---

**Estimated time:** 5 minutes
**Security level:** High (proper server-to-server auth)

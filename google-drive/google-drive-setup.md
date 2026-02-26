# Google Drive API Setup Guide

**Purpose:** Enable programmatic access to Google Drive for file operations (e.g., accessing shared Psalm MP3s for transcription)

**Date Created:** 2026-02-09
**Status:** Pending credentials

---

## Prerequisites

- Google account (Scott has clarkaddisonx222@gmail.com)
- Access to Google Cloud Console

---

## Step-by-Step Setup Instructions

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with the Google account (clarkaddisonx222@gmail.com)
3. Click the project dropdown at the top of the page
4. Click **"New Project"**
5. Enter project name: `openclaw-drive-access`
6. Click **"Create"**

### 2. Enable Google Drive API

1. In the Google Cloud Console, make sure your project is selected
2. Navigate to **"APIs & Services" > "Library"** (left sidebar)
3. Search for **"Google Drive API"**
4. Click on **"Google Drive API"** in the results
5. Click **"Enable"**

### 3. Configure OAuth Consent Screen

1. Go to **"APIs & Services" > "OAuth consent screen"**
2. Select **"External"** (for personal use) and click **"Create"**
3. Fill in the app information:
   - **App name:** OpenClaw Drive Access
   - **User support email:** clarkaddisonx222@gmail.com
   - **Developer contact email:** clarkaddisonx222@gmail.com
4. Click **"Save and Continue"**
5. On the **Scopes** page, click **"Add or Remove Scopes"**
6. Search for and select:
   - `drive.readonly` - See and download all your Google Drive files
   - OR `drive.file` - View and manage Google Drive files and folders that you have opened or created with this app
7. Click **"Update"** then **"Save and Continue"**
8. On **Test users**, add `clarkaddisonx222@gmail.com`
9. Click **"Save and Continue"** then **"Back to Dashboard"**

### 4. Create OAuth 2.0 Credentials (Desktop App)

1. Go to **"APIs & Services" > "Credentials"**
2. Click **"+ Create Credentials"** > **"OAuth client ID"**
3. For **Application type**, select **"Desktop app"**
4. Enter name: `OpenClaw Desktop Client`
5. Click **"Create"**
6. You'll see a popup with your **Client ID** and **Client Secret**
7. Click **"Download JSON"** - this saves a file like `client_secret_xxx.json`

### 5. Securely Share Credentials

**Important:** The downloaded JSON contains sensitive credentials. Share it securely:

**Option A - Secure File Transfer (Recommended):**
- Send via encrypted messaging
- Use a secure file sharing service with password protection
- Or paste the contents in a secure 1Password note

**Option B - Manual Entry:**
- Open the downloaded JSON file
- Copy the entire contents
- Share via secure channel

**Credential Storage Location:**
Once received, credentials should be placed at:
```
/data/.openclaw/.secrets/google-drive-credentials.json
```

---

## Post-Setup: Authentication Flow

Once credentials are in place, the following will happen:

1. **First-time authentication:**
   - A browser window will open
   - You'll sign in with Google
   - Grant permission for the selected scopes
   - Authorization code will be exchanged for access/refresh tokens

2. **Token storage:**
   - Tokens stored securely at: `/data/.openclaw/.secrets/google-drive-token.json`
   - Refresh token allows automatic re-authentication

3. **Usage:**
   - System can now list, download, and manage Drive files
   - Access limited to the scopes granted

---

## Security Notes

- **Scopes used:** Minimal permissions (`drive.readonly` recommended)
- **Token storage:** Encrypted/separated from code
- **Refresh handling:** Automatic token refresh before expiry
- **Access logging:** All Drive operations are logged

---

## Testing Checklist

Once credentials are provided:

- [ ] Credentials file placed in `.secrets/` directory
- [ ] Initial OAuth flow completed successfully
- [ ] Token file generated
- [ ] Test API call: List files in Drive
- [ ] Test API call: Download a file
- [ ] Verify refresh token works (after 1 hour)

---

## Files Generated

| File | Purpose | Location |
|------|---------|----------|
| `google-drive-credentials.json` | OAuth client credentials | `/data/.openclaw/.secrets/` |
| `google-drive-token.json` | Access & refresh tokens | `/data/.openclaw/.secrets/` |
| `google-drive-setup.md` | This guide | `/second-brain/google-drive/` |

---

## Next Steps

1. **Scott:** Follow steps 1-5 above
2. **Scott:** Share `client_secret_xxx.json` securely with Clark
3. **Clark:** Place credentials and run authentication
4. **Clark:** Test Drive access
5. **Clark:** Update this document with "Completed" status

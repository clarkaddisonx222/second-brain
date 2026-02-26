# Google Drive Integration

Quick reference for OpenClaw Google Drive access.

## Setup Status

- [x] Setup guide created
- [ ] Credentials provided by Scott
- [ ] Authentication completed
- [ ] Access tested

## Quick Commands

```bash
# Install dependencies
cd /data/.openclaw/workspace/second-brain/google-drive
npm install

# Authenticate (run once)
npm run auth

# Test access
npm run test
```

## Using in Code

```javascript
const drive = require('./google-drive-helper');

// List files
const files = await drive.listFiles({ limit: 10 });

// Find MP3s (for transcription)
const mp3s = await drive.findMp3Files();

// Download a file
await drive.downloadFile(fileId, '/path/to/save.mp3');

// Search by name
const results = await drive.findFiles('Psalm');
```

## File Locations

| File | Path |
|------|------|
| Credentials | `/data/.openclaw/.secrets/google-drive-credentials.json` |
| Tokens | `/data/.openclaw/.secrets/google-drive-token.json` |
| Auth script | `google-drive-auth.js` |
| Helper module | `google-drive-helper.js` |

## Security

- Credentials stored with 0600 permissions
- Read-only scope by default
- Tokens auto-refresh

## Troubleshooting

**"Credentials not found"**
→ Place the client_secret JSON from Google Cloud Console in `.secrets/`

**"Tokens expired"**  
→ Run `npm run auth` again to refresh

**"Access denied"**
→ Check that Drive API is enabled in Google Cloud Console

#!/usr/bin/env node
/**
 * Google Drive Authentication Handler for OpenClaw
 * 
 * Usage:
 *   node google-drive-auth.js [credentials-path]
 * 
 * Flow:
 *   1. Reads client credentials from .secrets/
 *   2. Opens browser for OAuth consent
 *   3. Exchanges auth code for tokens
 *   4. Saves tokens for future use
 *   5. Tests API access
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const { google } = require('googleapis');

const CREDENTIALS_PATH = process.argv[2] || '/data/.openclaw/.secrets/google-drive-credentials.json';
const TOKEN_PATH = '/data/.openclaw/.secrets/google-drive-token.json';
const PORT = 3456;

// Minimal scope - read-only access to files
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

async function authenticate() {
  console.log('🔐 Google Drive Authentication');
  console.log('================================\n');

  // Check for credentials
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`❌ Credentials file not found at: ${CREDENTIALS_PATH}`);
    console.log('\n📋 To set up:');
    console.log('   1. Follow the guide in /second-brain/google-drive/google-drive-setup.md');
    console.log('   2. Place the downloaded credentials at the path above');
    console.log('   3. Run this script again');
    process.exit(1);
  }

  // Load credentials
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  
  console.log(`✓ Credentials loaded: ${credentials.installed?.project_id || credentials.web?.project_id || 'unknown'}`);
  console.log(`  Client ID: ${client_id.substring(0, 20)}...`);

  // Create OAuth2 client
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    `http://localhost:${PORT}/oauth2callback`
  );

  // Check for existing tokens
  if (fs.existsSync(TOKEN_PATH)) {
    console.log('\n📁 Found existing tokens, validating...');
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oAuth2Client.setCredentials(tokens);
    
    try {
      await testAccess(oAuth2Client);
      console.log('✅ Existing tokens are valid!');
      return;
    } catch (err) {
      console.log('⚠️  Tokens expired, re-authenticating...');
    }
  }

  // Generate auth URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Force to get refresh token
  });

  console.log('\n🔗 Opening browser for authorization...');
  console.log(`   URL: ${authUrl}\n`);

  // Start local server to receive callback
  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/oauth2callback') {
      const code = parsedUrl.query.code;
      
      if (!code) {
        res.writeHead(400);
        res.end('Authorization code not received');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>✅ Authorization Successful!</h1>
            <p>You can close this window and return to the terminal.</p>
          </body>
        </html>
      `);

      try {
        // Exchange code for tokens
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Save tokens
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        fs.chmodSync(TOKEN_PATH, 0o600); // Restrict permissions

        console.log('\n✅ Tokens saved successfully!');
        console.log(`   Location: ${TOKEN_PATH}`);
        
        if (tokens.refresh_token) {
          console.log('   Refresh token: ✓ (auto-renewal enabled)');
        }

        // Test the connection
        await testAccess(oAuth2Client);

        server.close();
        process.exit(0);
      } catch (err) {
        console.error('\n❌ Token exchange failed:', err.message);
        server.close();
        process.exit(1);
      }
    }
  });

  server.listen(PORT, () => {
    console.log(`🌐 Callback server listening on port ${PORT}`);
  });

  // Open browser (try multiple methods)
  const openCommands = [
    `xdg-open "${authUrl}"`,
    `google-chrome "${authUrl}"`,
    `chromium "${authUrl}"`,
    `firefox "${authUrl}"`
  ];

  let opened = false;
  for (const cmd of openCommands) {
    try {
      require('child_process').execSync(cmd, { stdio: 'ignore' });
      opened = true;
      break;
    } catch (e) {
      // Try next
    }
  }

  if (!opened) {
    console.log('\n⚠️  Could not open browser automatically.');
    console.log('   Please manually open this URL:');
    console.log(`   ${authUrl}`);
  }
}

async function testAccess(auth) {
  console.log('\n🧪 Testing Drive API access...');
  
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    // List files (limit 10)
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, modifiedTime)'
    });

    const files = response.data.files;
    
    console.log(`✅ API test successful!`);
    console.log(`   Found ${files.length} files in Drive:\n`);
    
    files.forEach((file, i) => {
      const icon = file.mimeType === 'application/vnd.google-apps.folder' ? '📁' : '📄';
      console.log(`   ${i + 1}. ${icon} ${file.name}`);
      console.log(`      ID: ${file.id}`);
      console.log(`      Modified: ${new Date(file.modifiedTime).toLocaleString()}`);
    });

    return true;
  } catch (err) {
    console.error('❌ API test failed:', err.message);
    throw err;
  }
}

// Run authentication
authenticate().catch(err => {
  console.error('\n❌ Authentication failed:', err.message);
  process.exit(1);
});

/**
 * Google Drive API Helper Module
 * 
 * Provides convenient access to Google Drive operations.
 * 
 * Usage:
 *   const drive = require('./google-drive-helper');
 *   const files = await drive.listFiles();
 *   const content = await drive.downloadFile(fileId);
 */

const fs = require('fs');
const { google } = require('googleapis');

const TOKEN_PATH = '/data/.openclaw/.secrets/google-drive-token.json';
const CREDENTIALS_PATH = '/data/.openclaw/.secrets/google-drive-credentials.json';

class GoogleDriveHelper {
  constructor() {
    this.drive = null;
    this.auth = null;
  }

  /**
   * Initialize the Drive API client
   */
  async init() {
    if (this.drive) return this.drive;

    if (!fs.existsSync(CREDENTIALS_PATH)) {
      throw new Error(`Credentials not found at ${CREDENTIALS_PATH}. Run google-drive-auth.js first.`);
    }

    if (!fs.existsSync(TOKEN_PATH)) {
      throw new Error(`Tokens not found at ${TOKEN_PATH}. Run google-drive-auth.js first.`);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));

    const { client_secret, client_id } = credentials.installed || credentials.web;

    const { OAuth2Client } = require('google-auth-library');
    this.auth = new OAuth2Client(client_id, client_secret);
    this.auth.setCredentials(tokens);

    // Handle token refresh
    this.auth.on('tokens', (newTokens) => {
      if (newTokens.refresh_token) {
        tokens.refresh_token = newTokens.refresh_token;
      }
      tokens.access_token = newTokens.access_token;
      tokens.expiry_date = newTokens.expiry_date;
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
      console.log('🔄 Tokens refreshed and saved');
    });

    this.drive = google.drive({ version: 'v3', auth: this.auth });
    return this.drive;
  }

  /**
   * List files in Drive
   * @param {Object} options - Query options
   * @param {string} options.query - Search query (optional)
   * @param {number} options.limit - Max results (default 100)
   * @param {string} options.fields - Fields to return
   */
  async listFiles(options = {}) {
    const drive = await this.init();
    
    const params = {
      pageSize: options.limit || 100,
      fields: options.fields || 'files(id, name, mimeType, size, modifiedTime, parents, webViewLink)'
    };

    if (options.query) {
      params.q = options.query;
    }

    const response = await drive.files.list(params);
    return response.data.files || [];
  }

  /**
   * Find files by name pattern
   * @param {string} pattern - Name pattern to search for
   */
  async findFiles(pattern) {
    return this.listFiles({ query: `name contains '${pattern}'` });
  }

  /**
   * Get file metadata
   * @param {string} fileId - Drive file ID
   */
  async getFile(fileId) {
    const drive = await this.init();
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size, modifiedTime, webViewLink, parents'
    });
    return response.data;
  }

  /**
   * Download file content
   * @param {string} fileId - Drive file ID
   * @param {string} destPath - Destination path (optional)
   * @returns {Buffer|string} - File content or path if destPath provided
   */
  async downloadFile(fileId, destPath = null) {
    const drive = await this.init();

    if (destPath) {
      const dest = fs.createWriteStream(destPath);
      const response = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
      );
      
      return new Promise((resolve, reject) => {
        response.data
          .on('end', () => resolve(destPath))
          .on('error', reject)
          .pipe(dest);
      });
    } else {
      const response = await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'arraybuffer' }
      );
      return Buffer.from(response.data);
    }
  }

  /**
   * Get download URL for a file
   * @param {string} fileId - Drive file ID
   */
  getDownloadUrl(fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  /**
   * List files in a specific folder
   * @param {string} folderId - Folder ID
   */
  async listFolder(folderId) {
    return this.listFiles({ 
      query: `'${folderId}' in parents and trashed = false`,
      limit: 1000
    });
  }

  /**
   * Search for MP3 files
   */
  async findMp3Files() {
    return this.listFiles({
      query: "mimeType = 'audio/mpeg' or name contains '.mp3'",
      limit: 500
    });
  }

  /**
   * Get shared drives (if applicable)
   */
  async listSharedDrives() {
    const drive = await this.init();
    const response = await drive.drives.list({
      pageSize: 100
    });
    return response.data.drives || [];
  }
}

// Export singleton instance
module.exports = new GoogleDriveHelper();

// If run directly, show usage
if (require.main === module) {
  console.log('Google Drive Helper Module');
  console.log('==========================\n');
  console.log('This is a module. Use it from other scripts:');
  console.log('');
  console.log('  const drive = require("./google-drive-helper");');
  console.log('  const files = await drive.listFiles();');
  console.log('');
  console.log('Or run the auth script first:');
  console.log('  node google-drive-auth.js');
  console.log('');
}

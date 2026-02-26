#!/usr/bin/env node
/**
 * Test Google Drive Access
 * 
 * Run this after authentication to verify everything works.
 */

const drive = require('./google-drive-helper');

async function test() {
  console.log('🧪 Testing Google Drive Access\n');
  console.log('=============================\n');

  try {
    // Test 1: List recent files
    console.log('📄 Test 1: List files');
    const files = await drive.listFiles({ limit: 5 });
    console.log(`   ✓ Found ${files.length} files`);
    files.slice(0, 3).forEach(f => {
      console.log(`     - ${f.name} (${f.mimeType})`);
    });

    // Test 2: Find MP3 files
    console.log('\n🎵 Test 2: Search for MP3 files');
    const mp3s = await drive.findMp3Files();
    console.log(`   ✓ Found ${mp3s.length} MP3 files`);
    if (mp3s.length > 0) {
      mp3s.slice(0, 3).forEach(f => {
        const size = f.size ? `(${(parseInt(f.size) / 1024 / 1024).toFixed(1)} MB)` : '';
        console.log(`     - ${f.name} ${size}`);
      });
    }

    // Test 3: List shared drives
    console.log('\n📂 Test 3: Check shared drives');
    const sharedDrives = await drive.listSharedDrives();
    console.log(`   ✓ Found ${sharedDrives.length} shared drives`);
    sharedDrives.forEach(d => {
      console.log(`     - ${d.name}`);
    });

    console.log('\n✅ All tests passed!');
    console.log('\nYou can now use the drive helper:');
    console.log('  const drive = require("./google-drive-helper");');
    console.log('  const files = await drive.listFiles();');

  } catch (err) {
    console.error('\n❌ Test failed:', err.message);
    if (err.message.includes('not found')) {
      console.log('\n💡 Run authentication first:');
      console.log('  npm run auth');
    }
    process.exit(1);
  }
}

test();

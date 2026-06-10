import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'dist');
const destDistPublic = path.join(rootDir, 'dist', 'public');
const destPublic = path.join(rootDir, 'public');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) return;
  
  // Create destination if it doesn't exist
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  
  const entries = fs.readdirSync(from, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    
    // Skip destination folders to prevent infinite recursion
    if (srcPath === to || destPath === from) continue;
    if (entry.name === 'server') continue; // Skip server folder
    if (entry.name === 'public') continue; // Skip public inside dist if it exists
    
    if (entry.isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Running postbuild folder replication...');
// Copy from dist to dist/public
copyFolderSync(srcDir, destDistPublic);
// Copy from dist to public
copyFolderSync(srcDir, destPublic);
console.log('Replication completed successfully!');

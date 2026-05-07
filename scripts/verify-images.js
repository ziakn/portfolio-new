const fs = require('fs');
const path = require('path');

const srcDir = './src';
const imagesDir = './public/images';

// Find all image references in source
const allFiles = [];
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else allFiles.push(full);
  }
}
walk(srcDir);

const refs = new Set();
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/\/images\/[a-zA-Z0-9._/-]+/g) || [];
  matches.forEach(m => refs.add(m.replace(/^.*src/, '').replace(/^.*public/, '').replace(/["']/g, '')));
}

console.log('Checking', refs.size, 'image references...\n');
let missing = 0;
for (const ref of refs) {
  const imgPath = path.join(imagesDir, path.basename(ref));
  if (!fs.existsSync(imgPath)) {
    console.log('❌ Missing:', ref);
    missing++;
  }
}
if (missing === 0) console.log('✓ All images exist!');

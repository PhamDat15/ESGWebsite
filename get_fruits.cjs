const fs = require('fs');
const content = fs.readFileSync('src/data/mockProducts.js', 'utf8');
const regex = /\"name\":\s*\"(.*?)\"/g;
const names = new Set();
let match;
while ((match = regex.exec(content)) !== null) {
  const nameParts = match[1].split('-');
  const name = nameParts[0].trim();
  names.add(name);
}
console.log('Distinct fruits:', [...names]);

const fs = require('fs');
let content = fs.readFileSync('src/data/mockProducts.js', 'utf8');

const updates = [
  { fruit: 'Dưa Hấu', url: '/images/watermelon.jpg' },
  { fruit: 'Xoài Cát', url: '/images/mango.jpg' },
  { fruit: 'Gạo Lứt', url: '/images/rice.jpg' },
  { fruit: 'Hạt Cà Phê', url: '/images/coffee.jpg' }
];

const productRegex = /(\"name\":\s*\"([^\"]*?)\".*?\"image\":\s*\")[^\"]*(\")/gs;
content = content.replace(productRegex, (match, p1, nameStr, p3) => {
  let matchedImage = null;
  for (const update of updates) {
    if (nameStr.includes(update.fruit)) {
      matchedImage = update.url;
      break;
    }
  }
  if (matchedImage) {
    return p1 + matchedImage + p3;
  }
  return match;
});

fs.writeFileSync('src/data/mockProducts.js', content, 'utf8');
console.log('Fixed Dưa Hấu, Xoài Cát, Gạo Lứt, Hạt Cà Phê with local images!');

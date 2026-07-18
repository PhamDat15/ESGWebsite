const fs = require('fs');
let content = fs.readFileSync('src/data/mockProducts.js', 'utf8');

const updates = [
  {
    fruit: 'Dưa Hấu',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg/600px-Taiwan_2009_Tainan_City_Organic_Farm_Watermelon_FRD_7962.jpg'
  },
  {
    fruit: 'Xoài Cát',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/600px-Mangos_-_single_and_halved.jpg'
  },
  {
    fruit: 'Gạo Lứt',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Reis_-_Sorte_C_voll.jpg'
  }
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
console.log('Fixed Dưa Hấu, Xoài Cát, Gạo Lứt images!');

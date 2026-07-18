const fs = require('fs');

const shopImages = [
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400'
];

const fruitImages = {
  'Dâu Tây': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
  'Cà Rốt': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
  'Cam Sành': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=400',
  'Táo Đỏ': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400',
  'Xoài Cát': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400',
  'Bưởi Da Xanh': 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=400',
  'Nho Xanh': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=400',
  'Dưa Hấu': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=400',
  'Hạt Cà Phê': 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&q=80&w=400',
  'Gạo Lứt': 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=400',
  'Bơ Sáp': 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
  'Cà Chua Cherry': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
  'Chuối Laba': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=400'
};

let shopContent = fs.readFileSync('src/data/mockShops.js', 'utf8');
let shopIndex = 0;
shopContent = shopContent.replace(/\"image\":\s*\"[^\"]*\"/g, () => {
  const img = shopImages[shopIndex % shopImages.length];
  shopIndex++;
  return `"image": "${img}"`;
});
fs.writeFileSync('src/data/mockShops.js', shopContent, 'utf8');

let productContent = fs.readFileSync('src/data/mockProducts.js', 'utf8');
const productRegex = /(\"name\":\s*\"([^\"]*?)\".*?\"image\":\s*\")[^\"]*(\")/gs;
productContent = productContent.replace(productRegex, (match, p1, nameStr, p3) => {
  let matchedImage = 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400';
  for (const [fruit, imgUrl] of Object.entries(fruitImages)) {
    if (nameStr.includes(fruit)) {
      matchedImage = imgUrl;
      break;
    }
  }
  return p1 + matchedImage + p3;
});
fs.writeFileSync('src/data/mockProducts.js', productContent, 'utf8');

console.log('Fixed shops and products with active Unsplash URLs!');

const fs = require('fs');

// 1. Fix mockShops.js
let shopContent = fs.readFileSync('src/data/mockShops.js', 'utf8');
let shopIndex = 1;
// In mockShops.js it's "image": "..."
shopContent = shopContent.replace(/\"image\":\s*\"https:\/\/[^\"]*\"/g, () => {
  const img = `https://picsum.photos/seed/esgfarm${shopIndex}/400/300`;
  shopIndex++;
  return `"image": "${img}"`;
});
fs.writeFileSync('src/data/mockShops.js', shopContent, 'utf8');

// 2. Fix Farmers.jsx
let farmerContent = fs.readFileSync('src/pages/Farmers.jsx', 'utf8');
let avatarIndex = 1;
// In Farmers.jsx it's avatar: "..."
farmerContent = farmerContent.replace(/avatar:\s*\"https:\/\/[^\"]*\"/g, () => {
  const avatar = `https://i.pravatar.cc/150?u=esgfarmer${avatarIndex}`;
  avatarIndex++;
  return `avatar: "${avatar}"`;
});

fs.writeFileSync('src/pages/Farmers.jsx', farmerContent, 'utf8');
console.log('Fixed shops and farmers with picsum and pravatar!');

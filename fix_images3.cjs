const fs = require('fs');

const shopImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Church_Farm%2C_Stockton%2C_Norfolk_-_geograph.org.uk_-_1968544.jpg/500px-Church_Farm%2C_Stockton%2C_Norfolk_-_geograph.org.uk_-_1968544.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/500px-Mangos_-_single_and_halved.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/500px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pitaya_cross_section_ed2.jpg/500px-Pitaya_cross_section_ed2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Asparagus_-_white_background.jpg/500px-Asparagus_-_white_background.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomelo_fruit.jpg/500px-Pomelo_fruit.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/500px-Roasted_coffee_beans.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Penaeus_monodon.jpg/500px-Penaeus_monodon.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/500px-Oranges_-_whole-halved-segment.jpg'
];

const farmerAvatars = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Woman_at_work%2C_Gujarat.jpg/200px-Woman_at_work%2C_Gujarat.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Vietnamese_farmer_in_rice_field.jpg/200px-Vietnamese_farmer_in_rice_field.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Farmer_in_Bangladesh_02.jpg/200px-Farmer_in_Bangladesh_02.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nepalese_farmer.jpg/200px-Nepalese_farmer.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Farmers_in_Laos.jpg/200px-Farmers_in_Laos.jpg'
];

// 1. Fix mockShops.js
let shopContent = fs.readFileSync('src/data/mockShops.js', 'utf8');
let shopIndex = 0;
// In mockShops.js it's "image": "..."
shopContent = shopContent.replace(/\"image\":\s*\"https:\/\/images\.unsplash\.com[^\"]*\"/g, () => {
  const img = shopImages[shopIndex % shopImages.length];
  shopIndex++;
  return `"image": "${img}"`;
});
fs.writeFileSync('src/data/mockShops.js', shopContent, 'utf8');

// 2. Fix Farmers.jsx
let farmerContent = fs.readFileSync('src/pages/Farmers.jsx', 'utf8');
let avatarIndex = 0;
// In Farmers.jsx it's avatar: "..."
farmerContent = farmerContent.replace(/avatar:\s*\"https:\/\/upload\.wikimedia\.org[^\"]*\"/g, () => {
  const avatar = farmerAvatars[avatarIndex % farmerAvatars.length];
  avatarIndex++;
  return `avatar: "${avatar}"`;
});
// Just in case there are still unsplash avatars
farmerContent = farmerContent.replace(/avatar:\s*\"https:\/\/images\.unsplash\.com[^\"]*\"/g, () => {
  const avatar = farmerAvatars[avatarIndex % farmerAvatars.length];
  avatarIndex++;
  return `avatar: "${avatar}"`;
});

fs.writeFileSync('src/pages/Farmers.jsx', farmerContent, 'utf8');
console.log('Fixed shops and farmers!');

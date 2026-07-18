const fs = require('fs');

const fruitStoreImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Byward_Market_Fruit_Stand.jpg/600px-Byward_Market_Fruit_Stand.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/La_Boqueria.JPG/600px-La_Boqueria.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Gourock_greengrocers_ext.jpg/600px-Gourock_greengrocers_ext.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Stop%26Shop.jpg/600px-Stop%26Shop.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Convenience_store_interior.jpg/600px-Convenience_store_interior.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/London_2018_March_IMG_0663.jpg/600px-London_2018_March_IMG_0663.jpg'
];

let shopContent = fs.readFileSync('src/data/mockShops.js', 'utf8');
let shopIndex = 0;
// In mockShops.js it's currently "image": "https://picsum.photos..."
shopContent = shopContent.replace(/\"image\":\s*\"https:\/\/picsum\.photos[^\"]*\"/g, () => {
  const img = fruitStoreImages[shopIndex % fruitStoreImages.length];
  shopIndex++;
  return `"image": "${img}"`;
});
fs.writeFileSync('src/data/mockShops.js', shopContent, 'utf8');

console.log('Fixed shops with real fruit store images!');

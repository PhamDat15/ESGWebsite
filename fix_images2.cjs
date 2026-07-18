const fs = require('fs');

const goodImages = {
  // Fruits
  'Dâu Tây': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/500px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
  'Cà Rốt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/500px-Vegetable-Carrot-Bundle-wStalks.jpg',
  'Cam Sành': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/500px-Oranges_-_whole-halved-segment.jpg',
  'Táo Đỏ': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/500px-Pink_lady_and_cross_section.jpg',
  'Xoài Cát': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/500px-Mangos_-_single_and_halved.jpg',
  'Bưởi Da Xanh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomelo_fruit.jpg/500px-Pomelo_fruit.jpg',
  'Nho Xanh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Grapes%2C_Rostov-on-Don%2C_Russia.jpg/500px-Grapes%2C_Rostov-on-Don%2C_Russia.jpg',
  
  // Shops/Farmers
  'Hòa Lộc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/500px-Mangos_-_single_and_halved.jpg',
  'Đà Lạt': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/500px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
  'Thanh Long': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pitaya_cross_section_ed2.jpg/500px-Pitaya_cross_section_ed2.jpg',
  'Măng Tây': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Asparagus_-_white_background.jpg/500px-Asparagus_-_white_background.jpg',
  'Cô Hai': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomelo_fruit.jpg/500px-Pomelo_fruit.jpg',
  'Tiên Phước': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Church_Farm%2C_Stockton%2C_Norfolk_-_geograph.org.uk_-_1968544.jpg/500px-Church_Farm%2C_Stockton%2C_Norfolk_-_geograph.org.uk_-_1968544.jpg',
  'Anh Tuấn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg/500px-Garden_strawberry_%28Fragaria_%C3%97_ananassa%29_single2.jpg',
  'Cà Phê': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/500px-Roasted_coffee_beans.jpg',
  'Thủy Sản': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Penaeus_monodon.jpg/500px-Penaeus_monodon.jpg',
  'Cam Cao Phong': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/500px-Oranges_-_whole-halved-segment.jpg'
};

const farmerAvatars = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Woman_at_work%2C_Gujarat.jpg/200px-Woman_at_work%2C_Gujarat.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Vietnamese_farmer_in_rice_field.jpg/200px-Vietnamese_farmer_in_rice_field.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Farmer_in_Bangladesh_02.jpg/200px-Farmer_in_Bangladesh_02.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nepalese_farmer.jpg/200px-Nepalese_farmer.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Farmers_in_Laos.jpg/200px-Farmers_in_Laos.jpg'
];

function processFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  let newContent = content;
  
  if (path.includes('mockProducts')) {
    Object.keys(goodImages).slice(0, 7).forEach(fruit => {
      // Find JSON objects matching the fruit name
      const regex = new RegExp(`(\"name\":\\s*\"[^\"]*${fruit}[^\"]*\".*?\"image\":\\s*\")[^\"]*(\")`, 'gis');
      newContent = newContent.replace(regex, (match, p1, p2) => {
        return p1 + goodImages[fruit] + p2;
      });
    });
  } else {
    // For Shops and Farmers
    Object.keys(goodImages).forEach(key => {
      const regex = new RegExp(`(name:\\s*['\"][^'\"]*${key}[^'\"]*['\"].*?image:\\s*['\"])[^'\"]*(['\"])`, 'gis');
      newContent = newContent.replace(regex, (match, p1, p2) => {
        return p1 + goodImages[key] + p2;
      });
      
      const avatarRegex = new RegExp(`(name:\\s*['\"][^'\"]*${key}[^'\"]*['\"].*?avatar:\\s*['\"])[^'\"]*(['\"])`, 'gis');
      let avatarIndex = 0;
      newContent = newContent.replace(avatarRegex, (match, p1, p2) => {
        const avatar = farmerAvatars[avatarIndex % farmerAvatars.length];
        avatarIndex++;
        return p1 + avatar + p2;
      });
    });
  }

  // Final fallback to fix any remaining images.unsplash.com URLs that didn't match specific names
  // We'll just replace them with generic Farm image for shops, generic Apple for products, generic avatar for avatars.
  if (path.includes('mockProducts')) {
    newContent = newContent.replace(/\"image\":\s*\"https:\/\/images\.unsplash\.com[^\"]*\"/g, 
      `\"image\": \"${goodImages['Táo Đỏ']}\"`);
  } else {
    newContent = newContent.replace(/image:\s*['\"]https:\/\/images\.unsplash\.com[^'\"]*['\"]/g, 
      `image: "${goodImages['Tiên Phước']}"`);
    newContent = newContent.replace(/avatar:\s*['\"]https:\/\/images\.unsplash\.com[^'\"]*['\"]/g, 
      `avatar: "${farmerAvatars[0]}"`);
  }

  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Processed', path);
}

processFile('src/data/mockProducts.js');
processFile('src/data/mockShops.js');
processFile('src/pages/Farmers.jsx');

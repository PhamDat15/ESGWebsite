const fs = require('fs');

// Good images map
const goodImages = {
  // Fruits
  'Dâu Tây': 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
  'Cà Rốt': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400',
  'Cam Sành': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=400',
  'Táo Đỏ': 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=400',
  'Xoài Cát': 'https://images.unsplash.com/photo-1601493700631-2b162a29e0e5?auto=format&fit=crop&q=80&w=400',
  'Bưởi Da Xanh': 'https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?auto=format&fit=crop&q=80&w=400',
  'Nho Xanh': 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&q=80&w=400',
  'Bắp Cải': 'https://images.unsplash.com/photo-1518133306915-1817651a5c6e?auto=format&fit=crop&q=80&w=400',
  'Sầu Riêng': 'https://images.unsplash.com/photo-1562916698-c1a71e723508?auto=format&fit=crop&q=80&w=400',
  
  // Shops/Farmers
  'Hòa Lộc': 'https://images.unsplash.com/photo-1605332565108-a3f2a74ba55d?auto=format&fit=crop&q=80&w=400',
  'Đà Lạt': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400',
  'Thanh Long': 'https://images.unsplash.com/photo-1588612154508-4107cb591a20?auto=format&fit=crop&q=80&w=400',
  'Măng Tây': 'https://images.unsplash.com/photo-1518568740560-3331efe411d7?auto=format&fit=crop&q=80&w=400',
  'Cô Hai': 'https://images.unsplash.com/photo-1595858022510-c4d6df11a00c?auto=format&fit=crop&q=80&w=400',
  'Tiên Phước': 'https://images.unsplash.com/photo-1516048015710-7a32057d2a3f?auto=format&fit=crop&q=80&w=400',
  'Anh Tuấn': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=400',
  'Cà Phê': 'https://images.unsplash.com/photo-1551806235-a05d80b62dce?auto=format&fit=crop&q=80&w=400',
  'Thủy Sản': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400',
  'Cam Cao Phong': 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=400'
};

const farmerAvatars = [
  'https://images.unsplash.com/photo-1595856722883-93cf6ea1309f?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1589808389771-ce486f059ab6?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1516048015710-7a32057d2a3f?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1551806235-a05d80b62dce?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1595858022510-c4d6df11a00c?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
];

function processFile(path, isShopOrFarmer = false) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Fix encoding issues gracefully for products
  const fruitNames = ['Dâu Tây', 'Cà Rốt', 'Cam Sành', 'Táo Đỏ', 'Xoài Cát', 'Bưởi Da Xanh', 'Nho Xanh'];
  
  let newContent = content;
  
  // Replace product images
  if (path.includes('mockProducts')) {
    fruitNames.forEach(fruit => {
      // Create a regex to find blocks for this fruit and update the image
      const regex = new RegExp(`(\"name\":\\s*\"[^\"]*${fruit}[^\"]*\".*?\"image\":\\s*\")[^\"]*(\")`, 'gis');
      newContent = newContent.replace(regex, (match, p1, p2) => {
        return p1 + goodImages[fruit] + p2;
      });
    });
  }
  
  if (path.includes('mockShops') || path.includes('Farmers')) {
    Object.keys(goodImages).forEach(key => {
      if (key !== "Dâu Tây" && key !== "Cà Rốt") {
        const regex = new RegExp(`(name:\\s*['\"][^'\"]*${key}[^'\"]*['\"].*?image:\\s*['\"])[^'\"]*(['\"])`, 'gis');
        newContent = newContent.replace(regex, (match, p1, p2) => {
          return p1 + goodImages[key] + p2;
        });
        
        // Also check if avatar needs replacing in farmers
        const avatarRegex = new RegExp(`(name:\\s*['\"][^'\"]*${key}[^'\"]*['\"].*?avatar:\\s*['\"])[^'\"]*(['\"])`, 'gis');
        newContent = newContent.replace(avatarRegex, (match, p1, p2) => {
          const randAvatar = farmerAvatars[Math.floor(Math.random() * farmerAvatars.length)];
          return p1 + randAvatar + p2;
        });
      }
    });
  }

  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Processed', path);
}

processFile('src/data/mockProducts.js');
processFile('src/data/mockShops.js');
processFile('src/pages/Farmers.jsx');

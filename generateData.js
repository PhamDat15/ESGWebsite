import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bases = [
  { type: "Xoài Cát", image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400" },
  { type: "Dưa Hấu", image: "https://images.unsplash.com/photo-1587049352847-81a56d773c1c?auto=format&fit=crop&q=80&w=400" },
  { type: "Bưởi Da Xanh", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=400" },
  { type: "Cà Chua Cherry", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400" },
  { type: "Chuối Laba", image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?auto=format&fit=crop&q=80&w=400" },
  { type: "Cà Rốt Sạch", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400" },
  { type: "Dâu Tây", image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400" },
  { type: "Nho Xanh", image: "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&q=80&w=400" },
  { type: "Cam Sành", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400" },
  { type: "Bơ Sáp", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400" },
  { type: "Gạo Lứt", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=400" },
  { type: "Hạt Cà Phê", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=400" },
  { type: "Táo Đỏ", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=400" }
];

const locations = [
  "Đà Lạt", "Lâm Đồng", "Tiền Giang", "Bến Tre", "Long An", 
  "Sơn La", "Ninh Thuận", "Đắk Lắk", "Gia Lai", "Sóc Trăng", "Hòa Bình", "Hưng Yên"
];

const qualities = [
  "Hữu Cơ", "Sạch 100%", "Chuẩn VietGAP", "Chuẩn GlobalGAP", 
  "Sinh Thái", "Bao Đổi Trả", "Chín Cây", "Không Thuốc Trừ Sâu", 
  "Đạt Chuẩn Xuất Khẩu", "Từ Trang Trại Xanh"
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const products = [];

for (let i = 1; i <= 100; i++) {
  const base = randomElement(bases);
  const location = randomElement(locations);
  const quality = randomElement(qualities);
  
  let name = "";
  const namePattern = randomInt(1, 3);
  if (namePattern === 1) {
    name = `${base.type} ${location} - ${quality}`;
  } else if (namePattern === 2) {
    name = `${base.type} ${quality} (${location})`;
  } else {
    name = `${base.type} - Nông Sản ${location} ${quality}`;
  }

  const priceVal = randomInt(2, 25) * 10;
  const price = `${priceVal}.000đ`;
  
  const salesVal = randomInt(1, 99);
  const salesStr = salesVal > 10 ? `${(salesVal / 10).toFixed(1)}k` : `${salesVal * 10}`;
  const sales = `Đã bán ${salesStr}`;

  const freshIndex = randomInt(80, 99);
  const esgScore = randomInt(75, 98);

  products.push({
    id: i,
    name: name,
    price: price,
    sales: sales,
    image: base.image,
    freshIndex: freshIndex,
    esgScore: esgScore
  });
}

const fileContent = `export const mockProducts = ${JSON.stringify(products, null, 2)};\n`;
const outputPath = path.join(__dirname, 'src', 'data', 'mockProducts.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated 100 products!');

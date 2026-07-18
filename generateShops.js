import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const locations = [
  { city: "TP.HCM", districts: [
    { name: "Quận 1", wards: ["Phường Bến Nghé", "Phường Tân Định", "Phường Đa Kao"] },
    { name: "Quận 9", wards: ["Phường Hiệp Phú", "Phường Tăng Nhơn Phú A", "Phường Long Bình"] },
    { name: "Thủ Đức", wards: ["Phường Linh Trung", "Phường Linh Chiểu", "Phường Hiệp Bình Chánh"] },
    { name: "Bình Thạnh", wards: ["Phường 25", "Phường 17", "Phường 15"] },
    { name: "Gò Vấp", wards: ["Phường 5", "Phường 10", "Phường 17"] }
  ]},
  { city: "Hà Nội", districts: [
    { name: "Cầu Giấy", wards: ["Phường Dịch Vọng", "Phường Mai Dịch", "Phường Nghĩa Đô"] },
    { name: "Đống Đa", wards: ["Phường Cát Linh", "Phường Láng Hạ", "Phường Ô Chợ Dừa"] },
    { name: "Thanh Xuân", wards: ["Phường Thanh Xuân Bắc", "Phường Khương Trung", "Phường Thượng Đình"] }
  ]},
  { city: "Lâm Đồng", districts: [
    { name: "Đà Lạt", wards: ["Phường 1", "Phường 2", "Phường 8"] },
    { name: "Bảo Lộc", wards: ["Phường 1", "Phường 2", "Phường Lộc Phát"] }
  ]},
  { city: "Đà Nẵng", districts: [
    { name: "Hải Châu", wards: ["Phường Hải Châu 1", "Phường Thạch Thang"] },
    { name: "Sơn Trà", wards: ["Phường An Hải Bắc", "Phường Phước Mỹ"] }
  ]}
];

const images = [
  "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1574323347407-e5e5d40def50?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1595856722883-93cf6ea1309f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1589808389771-ce486f059ab6?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80&w=400"
];

const shopNames = [
  "HTX Nông Nghiệp Sạch", "Vựa Trái Cây Hữu Cơ", "Rau Sạch Thủy Canh", 
  "Chợ Quê Online", "Nông Trại Xanh", "HTX Trái Cây Sinh Thái", 
  "Vườn Chú 6", "Gian Hàng Cô Thơm", "Trạm Nông Sản Hữu Cơ", 
  "Cửa Hàng Xanh", "Eco Farm", "Viet Farm", "Hợp Tác Xã Nông Vàng"
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const shops = [];
for(let i=1; i<=30; i++) {
  const cityObj = randomElement(locations);
  const districtObj = randomElement(cityObj.districts);
  const ward = randomElement(districtObj.wards);
  
  const streetNum = Math.floor(Math.random() * 999) + 1;
  const streetNames = ["Nguyễn Trãi", "Lê Lợi", "Trần Hưng Đạo", "Phạm Văn Đồng", "Nguyễn Đình Chiểu", "Hai Bà Trưng"];
  const street = randomElement(streetNames);
  
  const address = `${streetNum} ${street}, ${ward}, ${districtObj.name}, ${cityObj.city}`;
  
  const nameBase = randomElement(shopNames);
  const name = `${nameBase} ${districtObj.name}`;
  
  const distance = (Math.random() * 15 + 0.5).toFixed(1) + " km";
  const rating = (Math.random() * 0.5 + 4.5).toFixed(1); // 4.5 to 5.0
  const esgArr = ["A+", "A", "B+", "B"];
  const esg = randomElement(esgArr);
  const image = randomElement(images);
  
  shops.push({
    id: i,
    name,
    distance,
    rating: parseFloat(rating),
    esg,
    address,
    city: cityObj.city,
    district: districtObj.name,
    ward,
    image
  });
}

const fileContent = `export const mockShops = ${JSON.stringify(shops, null, 2)};\n`;
const outputPath = path.join(__dirname, 'src', 'data', 'mockShops.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log('Successfully generated 30 shops!');

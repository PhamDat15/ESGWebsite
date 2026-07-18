import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Thay thế bằng config thực tế từ Firebase Console của bạn
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "ecoflow-demo.firebaseapp.com",
  projectId: "ecoflow-demo",
  storageBucket: "ecoflow-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

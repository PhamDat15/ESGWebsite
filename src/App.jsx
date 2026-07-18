import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BuyerLayout from './layouts/BuyerLayout';
import SellerLayout from './layouts/SellerLayout';
import Auth from './pages/Auth';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerProducts from './pages/seller/SellerProducts';
import SellerOrders from './pages/seller/SellerOrders';
import SellerAddProduct from './pages/seller/SellerAddProduct';
import SellerProfile from './pages/seller/SellerProfile';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Shop from './pages/Shop';
import ShopDetail from './pages/ShopDetail';
import Farmers from './pages/Farmers';
import ProfileLayout from './pages/ProfileLayout';
import ProfileSettings from './pages/ProfileSettings';
import ProfileOrders from './pages/ProfileOrders';
import ProfileVouchers from './pages/ProfileVouchers';
import ProfileFollowed from './pages/ProfileFollowed';
import Search from './pages/Search';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import CleanProduce from './pages/CleanProduce';
import Guarantee from './pages/Guarantee';
import ExpressDelivery from './pages/ExpressDelivery';
import ESGRanking from './pages/ESGRanking';
import Vouchers from './pages/Vouchers';
import FarmerSupport from './pages/FarmerSupport';
import AnnualReport from './pages/AnnualReport';
import About from './pages/About';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Trang Auth */}
              <Route path="/auth" element={<Auth />} />

              {/* Khu vực Seller (EcoFlow Dashboard) */}
              <Route path="/seller" element={<ProtectedRoute><SellerLayout /></ProtectedRoute>}>
                <Route index element={<SellerDashboard />} />
                <Route path="products" element={<SellerProducts />} />
                <Route path="products/add" element={<SellerAddProduct />} />
                <Route path="orders" element={<SellerOrders />} />
                <Route path="profile" element={<SellerProfile />} />
              </Route>

              {/* Khu vực Buyer (Khách hàng) */}
              <Route path="/" element={<ProtectedRoute><BuyerLayout /></ProtectedRoute>}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="shop/:id" element={<ShopDetail />} />
                <Route path="farmers" element={<Farmers />} />
                
                <Route path="profile" element={<ProfileLayout />}>
                  <Route index element={<ProfileSettings />} />
                  <Route path="orders" element={<ProfileOrders />} />
                  <Route path="vouchers" element={<ProfileVouchers />} />
                  <Route path="following" element={<ProfileFollowed />} />
                </Route>

                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="search" element={<Search />} />
                <Route path="news" element={<News />} />
                <Route path="news/:id" element={<NewsDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="success" element={<Success />} />
                
                <Route path="clean-produce" element={<CleanProduce />} />
                <Route path="guarantee" element={<Guarantee />} />
                <Route path="express-delivery" element={<ExpressDelivery />} />
                <Route path="/esg-ranking" element={<ESGRanking />} />
                <Route path="/vouchers" element={<Vouchers />} />
                <Route path="/farmer-support" element={<FarmerSupport />} />
                <Route path="/annual-report" element={<AnnualReport />} />
                <Route path="/about" element={<About />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

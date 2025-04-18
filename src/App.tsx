import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/NavBar';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import ApiTest from './components/ApiTest';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <div className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/category/:category" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/api-test" element={<ApiTest />} />
                </Routes>
              </div>
              
              {/* Footer */}
              <footer className="bg-[#321a12] text-white py-8">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Rollin' Bakery</h3>
                      <p className="text-gray-300">
                        Freshly baked goods delivered to your doorstep.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                        <li><a href="/products" className="text-gray-300 hover:text-white">Products</a></li>
                        <li><a href="/cart" className="text-gray-300 hover:text-white">Cart</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">Contact</h3>
                      <address className="text-gray-300 not-italic">
                        123 Bakery Street<br />
                        Flour City, FC 12345<br />
                        <a href="mailto:info@rollinbakery.com" className="hover:text-white">
                          info@rollinbakery.com
                        </a>
                      </address>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Rollin' Bakery. All rights reserved.</p>
                  </div>
                </div>
              </footer>
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
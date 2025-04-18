import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronDown, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-50 shadow-sm">
      {/* Promo Ticker */}
      <div className="bg-gray-100 py-2 overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">15% Off on $100+ Purchase</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-orange-500 text-white rounded-sm w-5 h-5 flex items-center justify-center mr-2">📦</span>
            <span className="text-xs font-bold">Subscribe & Save 15%</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">Free Shipping on Orders $75+</span>
          </div>
          
          {/* Duplicated for continuous scrolling effect */}
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">15% Off on $100+ Purchase</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-orange-500 text-white rounded-sm w-5 h-5 flex items-center justify-center mr-2">📦</span>
            <span className="text-xs font-bold">Subscribe & Save 15%</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">Free Shipping on Orders $75+</span>
          </div>
          
          {/* Additional duplicates to ensure it's long enough */}
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">15% Off on $100+ Purchase</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-orange-500 text-white rounded-sm w-5 h-5 flex items-center justify-center mr-2">📦</span>
            <span className="text-xs font-bold">Subscribe & Save 15%</span>
          </div>
          <div className="flex items-center mx-4">
            <span className="bg-yellow-300 text-black rounded-full w-5 h-5 flex items-center justify-center mr-2 font-bold">%</span>
            <span className="text-xs font-bold">Free Shipping on Orders $75+</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-5">
          <div className="text-2xl font-extrabold tracking-wider text-[#321a12]">
            <Link to="/">
              ROLLIN<span className="text-orange-500">.</span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={24} className="text-[#321a12]" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-7 font-extrabold text-[#321a12]">
            <Link 
              to="/products/category/cake" 
              className="uppercase hover:text-yellow-600 transition-colors relative group"
            >
              Cake
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex items-center uppercase hover:text-yellow-600 transition-colors cursor-pointer group relative">
              Bakery
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              
              {/* Dropdown Menu */}
              <div className="absolute hidden group-hover:block top-full left-0 bg-white shadow-md rounded-md p-2 z-10 w-48">
                <Link to="/products/category/bread" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Bread</Link>
                <Link to="/products/category/pastries" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Pastries</Link>
                <Link to="/products/category/donuts" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Donuts</Link>
              </div>
            </div>
            <div className="flex items-center uppercase hover:text-yellow-600 transition-colors cursor-pointer group relative">
              Cookies
              <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              
              {/* Dropdown Menu */}
              <div className="absolute hidden group-hover:block top-full left-0 bg-white shadow-md rounded-md p-2 z-10 w-48">
                <Link to="/products/category/chocolate-cookies" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Chocolate</Link>
                <Link to="/products/category/vanilla-cookies" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Vanilla</Link>
                <Link to="/products/category/specialty-cookies" className="block py-2 px-3 text-sm hover:bg-gray-100 rounded-md">Specialty</Link>
              </div>
            </div>
            <Link 
              to="/about" 
              className="uppercase hover:text-yellow-600 transition-colors relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="uppercase hover:text-yellow-600 transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 bg-yellow-300 rounded-full px-4 py-2 text-sm font-bold hover:bg-yellow-400 transition-all duration-300"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User size={16} />
                  <span className="hidden md:inline">{currentUser?.displayName || 'Account'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link 
                        to="/orders" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Orders
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                      >
                        <div className="flex items-center">
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-yellow-300 rounded-full px-4 py-2 text-sm font-bold uppercase hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                  Sign In
                </button>
              </Link>
            )}
            <Link to="/cart" className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 px-2 bg-white rounded-lg shadow-md mb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/products/category/cake"
                className="px-3 py-2 rounded-md text-[#321a12] font-bold hover:bg-gray-100"
                onClick={() => setShowMobileMenu(false)}
              >
                Cake
              </Link>
              <div className="px-3 py-2 rounded-md text-[#321a12] font-bold">
                <div className="flex items-center justify-between" onClick={() => document.getElementById('bakerySubmenu')?.classList.toggle('hidden')}>
                  <span>Bakery</span>
                  <ChevronDown size={16} />
                </div>
                <div id="bakerySubmenu" className="hidden pl-4 mt-2 space-y-2">
                  <Link 
                    to="/products/category/bread"
                    className="block py-1 text-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Bread
                  </Link>
                  <Link 
                    to="/products/category/pastries"
                    className="block py-1 text-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Pastries
                  </Link>
                </div>
              </div>
              <div className="px-3 py-2 rounded-md text-[#321a12] font-bold">
                <div className="flex items-center justify-between" onClick={() => document.getElementById('cookiesSubmenu')?.classList.toggle('hidden')}>
                  <span>Cookies</span>
                  <ChevronDown size={16} />
                </div>
                <div id="cookiesSubmenu" className="hidden pl-4 mt-2 space-y-2">
                  <Link 
                    to="/products/category/chocolate-cookies"
                    className="block py-1 text-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Chocolate
                  </Link>
                  <Link 
                    to="/products/category/vanilla-cookies"
                    className="block py-1 text-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Vanilla
                  </Link>
                </div>
              </div>
              <Link 
                to="/about"
                className="px-3 py-2 rounded-md text-[#321a12] font-bold hover:bg-gray-100"
                onClick={() => setShowMobileMenu(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact"
                className="px-3 py-2 rounded-md text-[#321a12] font-bold hover:bg-gray-100"
                onClick={() => setShowMobileMenu(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
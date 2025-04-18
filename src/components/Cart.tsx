import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { getProductById } from '../data/products.data';

const Cart = () => {
  const { cart, total, updateCartItem, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    deliveryNotes: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Handle input change for shipping info
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Process checkout
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (checkoutStep === 1) {
      setCheckoutStep(2);
      return;
    }
    
    try {
      setLoading(true);
      
      // Simulate placing an order
      setTimeout(() => {
        // Generate a random order ID
        const randomOrderId = `ORD-${Math.floor(Math.random() * 100000)}`;
        setOrderId(randomOrderId);
        setOrderPlaced(true);
        setCheckoutStep(3);
        
        // Clear the cart after successful order
        clearCart();
        
        setLoading(false);
        setError(null);
      }, 1500);
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place your order. Please try again.');
      setLoading(false);
    }
  };
  
  // Get cart items with product details
  const cartItems = cart.map(item => {
    const product = getProductById(item.productId);
    return {
      id: item.id,
      productId: item.productId,
      name: product?.name || 'Unknown Product',
      price: product?.price || 0,
      imageUrl: product?.imageUrl || '',
      quantity: item.quantity
    };
  });
  
  if (loading && cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="text-center py-8">
            <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#321a12] mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-6">Thank you for your order. Your order ID is: <span className="font-semibold">{orderId}</span></p>
            <p className="text-gray-600 mb-8">We're preparing your delicious items now and will notify you when they're ready.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-3 px-8 rounded-full"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/orders')}
                className="bg-gray-200 hover:bg-gray-300 text-[#321a12] font-bold py-3 px-8 rounded-full"
              >
                Track Your Order
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mt-6">Your Cart is Empty</h2>
            <p className="text-gray-500 mt-2">Looks like you haven't added any items to your cart yet.</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-2 px-6 rounded-full"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-[#321a12] text-5xl font-black mb-8 leading-tight tracking-tighter">
          YOUR <span className="text-yellow-500">CART</span>
        </h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items - left column */}
          <div className="w-full lg:w-2/3">
            {checkoutStep === 1 ? (
              <>
                {/* Cart items */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 py-6 last:border-b-0 last:pb-0 first:pt-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-grow sm:ml-6 flex flex-col sm:flex-row justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-[#321a12]">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                            <div className="flex items-center">
                              <button 
                                onClick={() => updateCartItem(item.id, item.quantity - 1)}
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-8 w-8 rounded-l-lg flex items-center justify-center"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateCartItem(item.id, parseInt(e.target.value) || 1)}
                                className="h-8 w-12 text-center border-y border-gray-200 focus:outline-none"
                              />
                              <button 
                                onClick={() => updateCartItem(item.id, item.quantity + 1)}
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-8 w-8 rounded-r-lg flex items-center justify-center"
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Shipping information form */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-[#321a12] mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleCheckout}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={shippingInfo.fullName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        id="deliveryNotes"
                        name="deliveryNotes"
                        rows={3}
                        value={shippingInfo.deliveryNotes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                        placeholder="Special delivery instructions, gate codes, etc."
                      />
                    </div>
                  </form>
                </div>
              </>
            )}
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => checkoutStep === 2 ? setCheckoutStep(1) : navigate('/products')}
                className="flex items-center text-[#321a12] font-bold hover:text-yellow-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {checkoutStep === 2 ? 'Back to Cart' : 'Continue Shopping'}
              </button>
            </div>
          </div>
          
          {/* Order summary - right column */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#321a12] mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(total * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-[#321a12]">Total</span>
                    <span className="text-lg font-bold text-[#321a12]">
                      ${(total + (total * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 mt-8 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#321a12]"></span>
                ) : (
                  <>
                    {checkoutStep === 1 ? 'Proceed to Checkout' : 'Place Order'}
                  </>
                )}
              </button>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>We accept all major credit cards and payment methods.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
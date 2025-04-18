import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/api.service';
import { ShippingAddress } from '../types/product.types';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, loading } = useCart();
  const { isAuthenticated, currentUser } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: currentUser?.displayName || '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phoneNumber: ''
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Redirect if cart is empty
  if (!loading && (!cart || cart.length === 0)) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setMessage(null);
      
      // Place the order using the order service
      await orderService.placeOrder(shippingAddress);
      
      setMessage({
        type: 'success',
        text: 'Your order has been placed successfully!'
      });
      
      // Redirect to orders page after successful order
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setMessage({
        type: 'error',
        text: 'There was an error placing your order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#321a12]">Checkout</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center text-[#321a12]">
              <MapPin className="mr-2" size={20} />
              Shipping Information
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={shippingAddress.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  name="addressLine1"
                  value={shippingAddress.addressLine1}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
              
              <h2 className="text-xl font-bold mb-6 flex items-center text-[#321a12]">
                <CreditCard className="mr-2" size={20} />
                Payment Information
              </h2>
              
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-[#321a12]">
                  This is a demo application. No actual payment will be processed.
                </p>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-yellow-300 hover:bg-yellow-400 text-[#321a12] font-bold py-3 px-6 rounded-full transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-6 flex items-center text-[#321a12]">
              <ShoppingBag className="mr-2" size={20} />
              Order Summary
            </h2>
            
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex items-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-md flex items-center justify-center mr-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="max-h-8 max-w-8 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#321a12]">{item.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-[#321a12]">
                    ${item.itemTotal.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-200 mt-4">
                <span className="text-lg font-bold text-[#321a12]">Total</span>
                <span className="text-lg font-bold text-[#321a12]">
                  ${(total + (total * 0.08)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
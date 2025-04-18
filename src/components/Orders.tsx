import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Package, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { orderService } from '../services/api.service';
import { ShippingAddress, Order as ProductOrder } from '../types/product.types';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  status: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
  estimatedDelivery: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch orders
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrders();
        // Fix: access the orders array correctly from the response
        setOrders(response.data || []);
        console.log('Orders loaded:', response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-500 text-white';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get step completion for order tracking
  const getOrderProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 3;
      case 'shipped':
        return 2;
      case 'processing':
        return 1;
      case 'pending':
      case 'preparation':
        return 0;
      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-16">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 max-w-md w-full text-center">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-300 hover:bg-yellow-400 text-[#321a12] font-bold py-2 px-6 rounded-full transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h1 className="text-[#321a12] text-5xl font-black mb-8 leading-tight tracking-tighter">
            YOUR <span className="text-yellow-500">ORDERS</span>
          </h1>
          
          <div className="min-h-[60vh] flex flex-col items-center justify-center py-8">
            <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Package size={32} className="text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#321a12] mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start by browsing our delicious bakery products.
            </p>
            <Link 
              to="/products" 
              className="block bg-yellow-300 hover:bg-yellow-400 text-[#321a12] font-bold py-3 px-6 rounded-full transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-[#321a12] text-5xl font-black mb-8 leading-tight tracking-tighter">
          YOUR <span className="text-yellow-500">ORDERS</span>
        </h1>
        
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-lg font-bold text-[#321a12] mb-2">
                      Order #{order.id}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={16} className="mr-1" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Order tracking */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Order Status</h3>
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <div className="text-xs font-medium">Processing</div>
                    <div className="text-xs font-medium">Preparation</div>
                    <div className="text-xs font-medium">Shipped</div>
                    <div className="text-xs font-medium">Delivered</div>
                  </div>
                  
                  <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-200">
                    <div 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
                      style={{ width: `${(getOrderProgress(order.status) + 1) * 25}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full ${getOrderProgress(order.status) >= 1 ? 'bg-yellow-500' : 'bg-gray-300'} flex items-center justify-center`}>
                      {getOrderProgress(order.status) >= 1 && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full ${getOrderProgress(order.status) >= 2 ? 'bg-yellow-500' : 'bg-gray-300'} flex items-center justify-center`}>
                      {getOrderProgress(order.status) >= 2 && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full ${getOrderProgress(order.status) >= 3 ? 'bg-yellow-500' : 'bg-gray-300'} flex items-center justify-center`}>
                      {getOrderProgress(order.status) >= 3 && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-4 text-center">
                    {order.status === 'delivered' 
                      ? 'Your order has been delivered!' 
                      : `Estimated delivery: ${formatDate(order.estimatedDelivery)}`}
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Order Items</h3>
                
                <div className="divide-y divide-gray-200">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="font-medium text-[#321a12]">{item.name}</div>
                        <div className="text-gray-500 text-xs ml-2">x{item.quantity}</div>
                      </div>
                      <div className="font-medium">${item.itemTotal.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${order.subtotal?.toFixed(2) || (order.total - (order.tax || 0) - (order.shippingFee || 0)).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2">
                    <span>Tax</span>
                    <span>${order.tax?.toFixed(2) || (order.total * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mt-2">
                    <span>Shipping</span>
                    <span>${order.shippingFee?.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between font-bold text-[#321a12] mt-3 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Delivery Address:</span> {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                  </div>
                  <button 
                    onClick={() => navigate(`/products`)}
                    className="text-sm font-medium bg-yellow-300 hover:bg-yellow-400 text-[#321a12] px-4 py-2 rounded-full transition-colors"
                  >
                    Order Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
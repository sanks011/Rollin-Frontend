import axios from 'axios';
import { CartItem, Product, ProductCategory, ShippingAddress, Order } from '../types/product.types';
import { products, getProductById } from '../data/products.data';

// Create base API instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change this to match your backend URL
  headers: {
    'Content-Type': 'application/json'
  },
  // Adding withCredentials to handle cookies properly
  withCredentials: true
});

// Add authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define auth service
export const authService = {
  loginWithGoogle: async (idToken: string) => {
    try {
      console.log("Sending idToken to backend:", idToken.substring(0, 20) + "...");
      const response = await api.post('/auth/google', { idToken });
      const { token, user } = response.data;
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log("Authentication successful:", user);
      return response.data;
    } catch (error) {
      console.error('Google login API error:', error);
      
      // Try to extract more information about the error
      if (axios.isAxiosError(error) && error.response) {
        console.error('Server response:', error.response.data);
      }
      
      throw error;
    }
  },

  logout: async () => {
    try {
      // Only call logout API if we have a token
      const token = localStorage.getItem('authToken');
      if (token) {
        await api.post('/auth/logout');
      }
      
      // Clear local storage regardless of API call result
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      // Still clear local storage even if API call fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      console.error('Logout error:', error);
      return { success: false, error };
    }
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('authToken');
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      // If unauthorized, clear local storage
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      throw error;
    }
  }
};

// Helper function to simulate API delay for a more realistic experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock localStorage helpers
const getCartFromStorage = (): CartItem[] => {
  const cartItems = localStorage.getItem('cart');
  return cartItems ? JSON.parse(cartItems) : [];
};

const setCartToStorage = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

// Cart Service
export const cartService = {
  // Get the user's cart
  getCart: async () => {
    await delay(500); // Simulate network delay
    
    const cartItems = getCartFromStorage();
    const itemsWithDetails = cartItems.map(item => {
      const product = getProductById(item.productId);
      return {
        ...item,
        name: product?.name || 'Product unavailable',
        price: product?.price || 0,
        imageUrl: product?.imageUrl || '',
        itemTotal: (product?.price || 0) * item.quantity
      };
    });
    
    const totalAmount = itemsWithDetails.reduce((total, item) => total + item.itemTotal, 0);
    
    return {
      data: {
        items: itemsWithDetails,
        totalAmount
      },
      status: 200
    };
  },
  
  // Add item to cart
  addToCart: async (productId: string, quantity: number) => {
    await delay(300); // Simulate network delay
    
    const product = getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    const cartItems = getCartFromStorage();
    const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
    if (existingItemIndex !== -1) {
      // Update quantity if product already in cart
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: `cart_${productId}_${Date.now()}`,
        productId,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity
      };
      cartItems.push(newItem);
    }
    
    setCartToStorage(cartItems);
    
    return {
      data: { success: true },
      status: 200
    };
  },
  
  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number) => {
    await delay(300); // Simulate network delay
    
    if (quantity <= 0) {
      return cartService.removeFromCart(itemId);
    }
    
    const cartItems = getCartFromStorage();
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }
    
    cartItems[itemIndex].quantity = quantity;
    setCartToStorage(cartItems);
    
    return {
      data: { success: true },
      status: 200
    };
  },
  
  // Remove item from cart
  removeFromCart: async (itemId: string) => {
    await delay(300); // Simulate network delay
    
    const cartItems = getCartFromStorage().filter(item => item.id !== itemId);
    setCartToStorage(cartItems);
    
    return {
      data: { success: true },
      status: 200
    };
  },
  
  // Clear the entire cart
  clearCart: async () => {
    await delay(200); // Simulate network delay
    
    localStorage.removeItem('cart');
    
    return {
      data: { success: true },
      status: 200
    };
  }
};

// Order Service
export const orderService = {
  // Place a new order
  placeOrder: async (shippingInfo: ShippingAddress) => {
    await delay(1000); // Simulate network delay
    
    const cartItems = getCartFromStorage();
    
    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + ((product?.price || 0) * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.08; // 8% tax
    const shippingFee = 0; // Free shipping
    const total = subtotal + tax + shippingFee;
    
    // Generate random order ID
    const orderId = `ORD-${Math.floor(Math.random() * 100000)}`;
    
    // Create order object
    const order: Order = {
      id: orderId,
      userId: JSON.parse(localStorage.getItem('user') || '{}').uid || 'guest-user',
      items: cartItems.map(item => {
        const product = getProductById(item.productId);
        return {
          productId: item.productId,
          name: product?.name || 'Unknown Product',
          price: product?.price || 0,
          quantity: item.quantity,
          itemTotal: (product?.price || 0) * item.quantity
        };
      }),
      subtotal,
      tax,
      shippingFee,
      total,
      status: 'processing', // Initial status matches what our tracking expects
      shippingAddress: shippingInfo,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
    };
    
    // Save to mock storage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart after successful order
    localStorage.removeItem('cart');
    
    return {
      data: { 
        success: true, 
        orderId, 
        order
      },
      status: 200
    };
  },
  
  // Get all orders for current user
  getOrders: async () => {
    await delay(800); // Simulate network delay
    
    const userId = JSON.parse(localStorage.getItem('user') || '{}').uid;
    if (!userId) {
      return { data: [], status: 200 };
    }
    
    // Get all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    
    // Filter by current user (in real app, this would be done on the server)
    const userOrders = allOrders.filter((order: Order) => order.userId === userId);
    
    // Sort by date (newest first)
    userOrders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return {
      data: userOrders,
      status: 200
    };
  },
  
  // Get a specific order by ID
  getOrderById: async (orderId: string) => {
    await delay(500); // Simulate network delay
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    const order = orders.find((order: Order) => order.id === orderId);
    
    if (!order) {
      return {
        data: null,
        status: 404
      };
    }
    
    return {
      data: order,
      status: 200
    };
  },
  
  // Update order status (for demo purposes)
  updateOrderStatus: async (orderId: string, status: string) => {
    await delay(600); // Simulate network delay
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]') as Order[];
    const orderIndex = orders.findIndex((order: Order) => order.id === orderId);
    
    if (orderIndex === -1) {
      return {
        data: { success: false, message: 'Order not found' },
        status: 404
      };
    }
    
    orders[orderIndex].status = status as Order['status'];
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return {
      data: { success: true },
      status: 200
    };
  }
};

// Product Service for additional product-related API calls
export const productService = {
  // Get all products
  getAllProducts: async () => {
    await delay(500); // Simulate network delay
    
    return {
      data: products,
      status: 200
    };
  },
  
  // Get product by ID
  getProductById: async (id: string) => {
    await delay(300); // Simulate network delay
    
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return {
        data: null,
        status: 404
      };
    }
    
    return {
      data: product,
      status: 200
    };
  },
  
  // Get featured products
  getFeaturedProducts: async () => {
    await delay(400); // Simulate network delay
    
    const featuredProducts = products.filter(p => p.bestSeller || p.featured);
    
    return {
      data: featuredProducts,
      status: 200
    };
  },
  
  // Get products by category
  getProductsByCategory: async (category: ProductCategory) => {
    await delay(400); // Simulate network delay
    
    const filteredProducts = category === 'ALL' 
      ? products 
      : products.filter(p => p.category === category);
    
    return {
      data: filteredProducts,
      status: 200
    };
  }
};

export default api;
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { cartService } from '../services/api.service';
import { useAuth } from './AuthContext';
import { CartItem as CartItemType } from '../types/product.types';

// Extend the CartItem type to include itemTotal for calculations
interface CartItem extends CartItemType {
  itemTotal: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  total: number;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cart: [],
  cartCount: 0,
  total: 0,
  loading: false,
  error: null,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  refreshCart: async () => {},
});

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Calculate cart count and total
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.itemTotal, 0);

  // Fetch cart on mount and when auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      // Clear cart when user logs out
      setCart([]);
    }
  }, [isAuthenticated]);

  // Refresh cart data from server
  const refreshCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await cartService.getCart();
      
      if (response.data && response.data.items) {
        // Transform the cart items to include itemTotal
        const cartWithTotals = response.data.items.map((item: CartItemType) => ({
          ...item,
          itemTotal: item.price * item.quantity,
        }));
        
        setCart(cartWithTotals);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated) {
      setError('Please sign in to add items to cart');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await cartService.addToCart(productId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      await cartService.updateCartItem(itemId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError('Failed to update cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      await cartService.removeFromCart(itemId);
      await refreshCart();
    } catch (error) {
      console.error('Error removing cart item:', error);
      setError('Failed to remove item from cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await cartService.clearCart();
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartCount,
    total,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

export default CartContext;
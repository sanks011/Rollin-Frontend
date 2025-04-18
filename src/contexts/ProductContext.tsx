import React, { createContext, useState, useContext, ReactNode } from 'react';
import { productService } from '../services/api.service';
import { Product } from '../types/product.types';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  searchProducts: (query: string) => Promise<void>;
}

// Create context with default values
const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {},
  fetchProductsByCategory: async () => {},
  getProductById: async () => null,
  searchProducts: async () => {}
});

// Provider component
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAllProducts();
      
      if (response.data) {
        setProducts(response.data);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      // First get all products, then filter by category
      const response = await productService.getAllProducts();
      
      if (response.data) {
        const filteredProducts = response.data.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      setError('Failed to fetch products by category');
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await productService.getProductById(id);
      
      if (response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  };

  // Search products
  const searchProducts = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      // First get all products, then filter by search query
      const response = await productService.getAllProducts();
      
      if (response.data) {
        const searchQuery = query.toLowerCase();
        const filteredProducts = response.data.filter(
          (product) => 
            product.name.toLowerCase().includes(searchQuery) || 
            product.description.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery)
        );
        setProducts(filteredProducts);
      } else {
        setError('Invalid response format');
      }
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      setError('Failed to search products');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    getProductById,
    searchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use product context
export const useProducts = () => useContext(ProductContext);

export default ProductContext;
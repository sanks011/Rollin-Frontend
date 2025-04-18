import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';

const ProductList = () => {
  const { category } = useParams<{ category?: string }>();
  const { products, loading, error, fetchProducts, fetchProductsByCategory } = useProducts();
  const { addToCart } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState(category?.toUpperCase() || 'ALL');
  
  // Categories with counts
  const categories = [
    { name: "ALL", bgColor: "bg-blue-100", activeBgColor: "bg-blue-200" },
    { name: "COOKIES", bgColor: "bg-gray-100", activeBgColor: "bg-gray-200" },
    { name: "CAKE", bgColor: "bg-blue-100", activeBgColor: "bg-blue-200" },
    { name: "BRETZEL", bgColor: "bg-purple-100", activeBgColor: "bg-purple-200" },
    { name: "PASTRIES", bgColor: "bg-gray-100", activeBgColor: "bg-gray-200" },
    { name: "CROISSANT", bgColor: "bg-yellow-200", activeBgColor: "bg-yellow-300" },
    { name: "BREAD", bgColor: "bg-orange-100", activeBgColor: "bg-orange-200" }
  ];
  
  // Handle category selection and load products
  useEffect(() => {
    if (category) {
      setSelectedCategory(category.toUpperCase());
      fetchProductsByCategory(category.toLowerCase());
    } else if (selectedCategory === 'ALL') {
      fetchProducts();
    } else {
      fetchProductsByCategory(selectedCategory.toLowerCase());
    }
  }, [category, selectedCategory, fetchProducts, fetchProductsByCategory]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  // Handle adding product to cart with animation
  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 text-[#321a12]">Our Products</h1>
      
      {/* Category filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`${
              selectedCategory === cat.name ? cat.activeBgColor : cat.bgColor
            } text-[#3a1a0f] font-extrabold px-5 py-2.5 rounded-full shadow-sm hover:${
              cat.activeBgColor
            } transition-all duration-300 transform hover:scale-105`}
            onClick={() => handleCategoryChange(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-600">No products found in this category</h3>
        </div>
      )}
      
      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]"
          >
            <div className="p-4">
              <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg mb-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-h-40 max-w-full object-contain"
                />
              </div>
              
              <h3 className="text-xl font-bold text-[#321a12] mb-1">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 h-10">{product.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-[#321a12]">${product.price.toFixed(2)}</span>
                <button 
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-yellow-300 hover:bg-yellow-400 text-[#321a12] font-bold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
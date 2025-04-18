import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products.data';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  
  const product = productId ? getProductById(productId) : undefined;
  
  // Reset added to cart notification when component unmounts or product changes
  useEffect(() => {
    return () => {
      setAddedToCart(false);
    };
  }, [productId]);
  
  if (!product) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-12 text-center">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-700">Product Not Found</h2>
          <p className="text-gray-500 mt-2">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/products')}
            className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-2 px-6 rounded-full"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      // Use cart context instead of API service for dummy implementation
      addToCart(product.id, quantity);
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {addedToCart && (
        <div className="fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 shadow-md rounded-md z-50 animate-fade-in-down">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">Item added to cart!</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-contain"
                style={{ maxHeight: '500px' }}
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.bestSeller && (
                <span className="bg-yellow-400 text-[#321a12] text-xs font-bold px-3 py-1 rounded-full">
                  BEST SELLER
                </span>
              )}
              {product.glutenFree && (
                <span className="bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                  GLUTEN FREE
                </span>
              )}
              {product.vegan && (
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  VEGAN
                </span>
              )}
              <span className={`bg-${
                product.category === 'COOKIES' ? 'gray-200' :
                product.category === 'CAKE' ? 'blue-200' :
                product.category === 'BRETZEL' ? 'purple-200' :
                product.category === 'PASTRIES' ? 'gray-200' :
                product.category === 'CROISSANT' ? 'yellow-300' :
                'orange-200'
              } text-[#321a12] text-xs font-bold px-3 py-1 rounded-full`}>
                {product.category}
              </span>
            </div>
            
            {/* Title & Price */}
            <h1 className="text-[#321a12] text-4xl font-black mb-2">{product.name}</h1>
            <div className="text-2xl font-bold text-[#321a12] mb-4">${product.price.toFixed(2)}</div>
            
            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Ingredients */}
            {product.ingredients && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#321a12] mb-2">Ingredients</h2>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Nutritional Info */}
            {product.nutritionalInfo && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-[#321a12] mb-2">Nutritional Information</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="block text-sm text-gray-500">Calories</span>
                    <span className="block font-bold">{product.nutritionalInfo.calories}</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="block text-sm text-gray-500">Protein</span>
                    <span className="block font-bold">{product.nutritionalInfo.protein}g</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="block text-sm text-gray-500">Carbs</span>
                    <span className="block font-bold">{product.nutritionalInfo.carbs}g</span>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <span className="block text-sm text-gray-500">Fat</span>
                    <span className="block font-bold">{product.nutritionalInfo.fat}g</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#321a12] mb-2">Quantity</h2>
              <div className="flex items-center">
                <button 
                  onClick={decrementQuantity}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-l-lg flex items-center justify-center"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="h-10 w-16 text-center border-y border-gray-200 focus:outline-none"
                />
                <button 
                  onClick={incrementQuantity}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300 h-10 w-10 rounded-r-lg flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
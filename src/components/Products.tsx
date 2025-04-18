import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { products, getProductsByCategory } from '../data/products.data';
import { Product, ProductCategory } from '../types/product.types';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { cart, addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState('default');
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [addedProduct, setAddedProduct] = useState<string | null>(null);
  
  // Categories with counts
  const categories = [
    { name: "ALL" as ProductCategory, count: products.length, bgColor: "bg-gray-200", activeBgColor: "bg-gray-300" },
    { name: "COOKIES" as ProductCategory, count: getProductsByCategory("COOKIES").length, bgColor: "bg-gray-200", activeBgColor: "bg-gray-300" },
    { name: "CAKE" as ProductCategory, count: getProductsByCategory("CAKE").length, bgColor: "bg-blue-200", activeBgColor: "bg-blue-300" },
    { name: "BRETZEL" as ProductCategory, count: getProductsByCategory("BRETZEL").length, bgColor: "bg-purple-200", activeBgColor: "bg-purple-300" },
    { name: "PASTRIES" as ProductCategory, count: getProductsByCategory("PASTRIES").length, bgColor: "bg-gray-200", activeBgColor: "bg-gray-300" },
    { name: "CROISSANT" as ProductCategory, count: getProductsByCategory("CROISSANT").length, bgColor: "bg-yellow-300", activeBgColor: "bg-yellow-400" },
    { name: "BAGEL" as ProductCategory, count: getProductsByCategory("BAGEL").length, bgColor: "bg-orange-200", activeBgColor: "bg-orange-300" }
  ];
  
  // Load all products on mount and handle category from URL params
  useEffect(() => {
    // Default to all products
    setFilteredProducts(products);
    
    // Check for category in URL params (new route)
    const categoryParam = params.category;
    
    if (categoryParam) {
      // Improved case-insensitive category matching
      const categoryParamLower = categoryParam.toLowerCase();
      
      // Find matching category regardless of case
      const validCategory = categories.find(cat => 
        cat.name.toLowerCase() === categoryParamLower
      );
      
      if (validCategory) {
        setActiveCategory(validCategory.name);
        
        if (validCategory.name === "ALL") {
          setFilteredProducts(products);
        } else {
          const categoryProducts = getProductsByCategory(validCategory.name);
          setFilteredProducts(categoryProducts);
        }
      } else {
        // If invalid category, redirect to all products
        navigate('/products');
      }
    }
  }, [params.category, navigate, categories, products]);
  
  // Filter products when criteria change
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (activeCategory && activeCategory !== "ALL") {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Apply search term filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercaseSearch) || 
        product.description.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Apply price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(result);
  }, [activeCategory, searchTerm, priceRange, sortBy, products]);
  
  // Handle category change
  const handleCategoryChange = (category: ProductCategory) => {
    setActiveCategory(category);
    navigate(category === "ALL" ? `/products` : `/products/category/${category.toLowerCase()}`);
  };
  
  // Handle price range change
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value);
    
    if (name === 'min') {
      setPriceRange([newValue, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], newValue]);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    addToCart(product.id, 1);
    setAddedProduct(product.name);
    setShowAddedToast(true);
    
    setTimeout(() => {
      setShowAddedToast(false);
    }, 3000);
  };
  
  // Handle product click
  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };
  
  // Get max price for the range input
  const maxPrice = Math.max(...products.map(product => product.price));
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      {/* Toast notification for added products */}
      {showAddedToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <div className="flex items-center">
            <div className="mr-2">✅</div>
            <div>
              <div className="font-bold">{addedProduct} added to cart!</div>
              <button 
                onClick={() => navigate('/cart')}
                className="text-sm underline hover:text-green-200"
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-[#321a12] text-5xl font-black leading-tight tracking-tighter">
            OUR <span className="text-yellow-500">PRODUCTS</span>
          </h1>
          
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="bg-gray-100 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full max-w-xs"
            />
            <svg className="w-5 h-5 absolute right-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filters row */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === category.name
                    ? category.activeBgColor + ' shadow'
                    : category.bgColor + ' hover:' + category.activeBgColor
                }`}
              >
                {category.name} <span className="text-xs ml-1">({category.count})</span>
              </button>
            ))}
          </div>
          
          {/* Sorting and price filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Price filter */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Price:</label>
              <input
                type="number"
                name="min"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span>-</span>
              <input
                type="number"
                name="max"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            
            {/* Sort dropdown */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-700 mt-4">No products found</h2>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
              <button 
                onClick={() => {
                  setActiveCategory('ALL');
                  setSearchTerm('');
                  setPriceRange([0, maxPrice]);
                  setSortBy('default');
                  navigate('/products');
                }}
                className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-[#321a12] font-bold py-2 px-6 rounded-full"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  {product.bestSeller && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Best Seller
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg text-[#321a12]">{product.name}</h3>
                    <span className="font-black text-xl text-[#321a12]">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500">{product.category}</span>
                    <button 
                      className="bg-yellow-300 hover:bg-yellow-400 transition-colors duration-300 rounded-full p-2"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
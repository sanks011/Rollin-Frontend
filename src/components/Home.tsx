import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ShoppingBag, ChevronLeft, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { products, getProductsByCategory, getFeaturedProducts } from '../data/products.data';
import { ProductCategory } from "../types/product.types";

const App = () => {
  // State for carousel and interactions
  const [currentProduct, setCurrentProduct] = useState(0);
  const [activeCategory, setActiveCategory] = useState("COOKIES");
  const [hoverStates, setHoverStates] = useState({
    orderNow: false,
    cookingBlog: false,
    shopNow: false,
    learnBaking: false
  });
  
  const navigate = useNavigate();
  
  // Ref for the ticker
  const tickerRef = useRef<HTMLDivElement>(null);
  
  // Featured products for the carousel
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  // Categories with counts - using actual product data
  const categories = [
    { name: "COOKIES" as ProductCategory, count: products.filter(p => p.category === "COOKIES").length, bgColor: "bg-gray-200", activeBgColor: "bg-gray-300" },
    { name: "CAKE" as ProductCategory, count: products.filter(p => p.category === "CAKE").length, bgColor: "bg-blue-200", activeBgColor: "bg-blue-300" },
    { name: "BRETZEL" as ProductCategory, count: products.filter(p => p.category === "BRETZEL").length, bgColor: "bg-purple-200", activeBgColor: "bg-purple-300" },
    { name: "PASTRIES" as ProductCategory, count: products.filter(p => p.category === "PASTRIES").length, bgColor: "bg-gray-200", activeBgColor: "bg-gray-300" },
    { name: "CROISSANT" as ProductCategory, count: products.filter(p => p.category === "CROISSANT").length, bgColor: "bg-yellow-300", activeBgColor: "bg-yellow-400" },
    { name: "BAGEL" as ProductCategory, count: products.filter(p => p.category === "BAGEL").length, bgColor: "bg-orange-200", activeBgColor: "bg-orange-300" }
  ];

  // Functions for product carousel navigation
  const nextProduct = () => {
    setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevProduct = () => {
    setCurrentProduct((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  // Function to handle hover states
  const handleHover = (key: string, isHovered: boolean) => {
    setHoverStates(prev => ({
      ...prev,
      [key]: isHovered
    }));
  };
  
  // Handle Order Now button click
  const handleOrderNow = () => {
    navigate('/products');
  };
  
  // Handle category click - navigate to products page with filter
  const handleCategoryClick = (category: ProductCategory) => {
    navigate(`/products?category=${category}`);
  };

  // Effect for the scrolling ticker
  useEffect(() => {
    if (!tickerRef.current) return;
    
    const tickerAnimation = () => {
      if (!tickerRef.current) return;
      
      if (tickerRef.current.scrollLeft >= tickerRef.current.scrollWidth / 3) {
        tickerRef.current.scrollLeft = 0;
      } else {
        tickerRef.current.scrollLeft += 1;
      }
    };
    
    const animationInterval = setInterval(tickerAnimation, 30);
    
    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  // Auto-scroll effect for the product carousel
  useEffect(() => {
    // Set a timer to automatically advance the carousel every 4 seconds
    const autoScrollInterval = setInterval(() => {
      nextProduct();
    }, 4000);
    
    // Clear the interval when component unmounts
    return () => {
      clearInterval(autoScrollInterval);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Hero Section - keeping intact as requested */}
        <div className="bg-white rounded-3xl p-8 mt-4 relative overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 z-10">
              {/* Steam icons */}
              <div className="flex mb-2 right-20">
                <div className="text-orange-500 text-2xl animate-pulse">
                  &#x2668;&#x2668;&#x2668;
                </div>
              </div>
              
              {/* BAKE THE COOKIES heading */}
              <h1 className="text-[#321a12] text-7xl font-black leading-none tracking-tighter">
                <div className="relative inline-block tracking-normal">
                  BAK
                  <div className="absolute -top-1 -left-3 bg-green-500 text-white text-xl px-2 py-0.5 rounded-full font-normal tracking-wider transform -rotate-6">
                  TASTY
                  </div>
                  E
                </div>
              {" "}THE{" "}
                <div className="relative inline-block tracking-normal">
                  COOK
                  <div className="absolute top-6 -right-3 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-normal tracking-wider transform rotate-6">
                  CRUNCHY
                  </div>
                  IES
                </div>
              </h1>
              
              <h2 className="text-[#321a12] text-xl font-extrabold mt-8 leading-tight">
                PREMIUM BREAD<br />
                AND COOKIES MADE<br />
                FROM SCRATCH{" "}
                <span className="bg-blue-400 text-white text-xl px-2 py-0.5 rounded-full ml-1 font-bold tracking-wider">
                  FRESH
                </span>
              </h2>
              
              <p className="mt-4 text-sm text-gray-700">
                We're literally obsessed with giving<br />
                more of what you love!
              </p>
              
              <div className="mt-8 flex items-center space-x-4">
                <button 
                  onClick={handleOrderNow}
                  className={`bg-yellow-300 rounded-full px-6 py-3 text-xs font-bold transition-all duration-300 ${hoverStates.orderNow ? 'bg-yellow-400 transform scale-105 shadow-md' : ''}`}
                  onMouseEnter={() => handleHover('orderNow', true)}
                  onMouseLeave={() => handleHover('orderNow', false)}
                >
                  ORDER NOW
                </button>
                <div 
                  className={`flex items-center text-xs font-bold cursor-pointer transition-all duration-300 ${hoverStates.cookingBlog ? 'text-yellow-600' : ''}`}
                  onMouseEnter={() => handleHover('cookingBlog', true)}
                  onMouseLeave={() => handleHover('cookingBlog', false)}
                >
                  COOKING BLOG <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${hoverStates.cookingBlog ? 'transform translate-x-1' : ''}`} />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 mt-6 md:mt-0 relative">
              <div className="relative">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-yellow-300 rounded-full opacity-80 z-0"></div>
                <img
                  src="/Screenshot 2025-04-14 205603.png"
                  alt="Fresh baked bread slices"
                  className="w-full rounded-2xl object-cover relative z-10 transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products We Bake Section */}
        <div className="mt-16 mb-10">
          <h2 className="text-[#3a1a0f] text-4xl font-black tracking-tight flex items-center">
            PRODUCT WE BAKE
            <br />
            HERE DAILY
            <span className="ml-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse">🍩</span>
          </h2>

          <div className="flex flex-wrap gap-3 mt-8">
            {categories.map((category) => (
              <div 
                key={category.name}
                className={`${activeCategory === category.name ? category.activeBgColor : category.bgColor} text-[#3a1a0f] font-extrabold px-5 py-2.5 rounded-full flex items-center shadow-sm hover:${category.activeBgColor} transition-all duration-300 cursor-pointer transform hover:scale-105`}
                onClick={() => {
                  setActiveCategory(category.name);
                  handleCategoryClick(category.name);
                }}
              >
                {category.name}{" "}
                <span className={`ml-2 bg-white w-7 h-7 rounded-full flex items-center justify-center text-sm shadow-inner transition-all duration-300 ${activeCategory === category.name ? 'bg-yellow-50' : ''}`}>
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Carousel - Now using real products */}
        <div className="relative mt-16">
          <button 
            onClick={prevProduct}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500" 
              style={{ transform: `translateX(-${currentProduct * 33.33}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
                  <div 
                    className={`rounded-3xl overflow-hidden ${index % 2 === 0 ? 'bg-yellow-200' : 'bg-blue-200'} p-6 shadow-sm relative transition-all duration-500 hover:shadow-lg hover:transform hover:scale-105 cursor-pointer`}
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                    />
                    <h3 className="font-black text-center uppercase text-[#3a1a0f] mt-4">{product.name}</h3>
                    <div className="text-center mt-2 font-bold text-[#3a1a0f]">${product.price.toFixed(2)}</div>
                    <button 
                      className="mt-3 bg-yellow-300 w-full py-2 rounded-full font-bold text-[#3a1a0f] hover:bg-yellow-400 transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={nextProduct}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md z-10 hover:bg-gray-50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-6">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${currentProduct === index ? 'bg-yellow-500 w-6' : 'bg-gray-300'}`}
                onClick={() => setCurrentProduct(index)}
              />
            ))}
          </div>
        </div>

        {/* Your Only Dose of Delight Section */}
        <div className="flex flex-col md:flex-row mt-16">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="bg-blue-200 rounded-3xl p-8 relative shadow-sm transition-all duration-500 hover:shadow-lg hover:transform hover:scale-105">
              <div className="absolute top-8 left-8">
                <div className="relative">
                  <div className="bg-yellow-300 rounded-full w-20 h-20 flex items-center justify-center text-xs font-bold animate-pulse">
                    QUALITY
                  </div>
                  <div className="absolute -top-4 -right-4 rotate-45">
                    <div className="bg-green-500 bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center text-xs font-bold">
                      PURE
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -left-4 -rotate-45">
                    <div className="bg-blue-500 bg-opacity-30 rounded-full w-16 h-16 flex items-center justify-center text-xs font-bold">
                      WHOLE
                    </div>
                  </div>
                </div>
              </div>
              <img
                src="/2nd.png"
                alt="Bread in basket"
                className="object-cover mt-28 w-full h-auto transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 md:pl-16">
            <h2 className="text-[#3a1a0f] text-5xl font-black leading-tight tracking-tight flex items-center">
              YOUR ONLY
              <br />
              DOSE OF DELIGHT
              <img 
                src="/Screenshot 2025-04-14 205643.png" 
                alt="Cookie" 
                className="w-10 h-10 ml-2 animate-bounce" 
              />
            </h2>

            <div className="mt-10">
              <p className="text-gray-600 font-bold">Featured Item -</p>
              <div className="flex items-center mt-4 group p-2 rounded-xl transition-all duration-300 cursor-pointer hover:bg-gray-100">
                <div className="w-24 h-24 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <img 
                    src="/Screenshot 2025-04-14 205653.png" 
                    alt="Bagel Buns" 
                    className="w-25 h-16 transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="ml-3">
                  <h3 className="font-black text-xl group-hover:text-yellow-600 transition-colors duration-300">Bagel Buns</h3>
                  <p className="text-sm text-gray-600 font-medium">Gluten free</p>
                </div>
                <div className="ml-8 text-3xl font-black text-[#3a1a0f] group-hover:text-yellow-600 transition-colors duration-300">$16</div>
              </div>
            </div>

            <div className="mt-10 max-w-md">
              <p className="text-gray-700 font-medium">
                All cookies should have a show-stopping German chocolate cake in their repertoire and this is one of
                our favourites.
              </p>
            </div>
          </div>
        </div>

        {/* Baking Art Section */}
        <div className="bg-[#3a1a0f] text-white rounded-3xl mt-16 p-8 shadow-sm transition-all duration-500 hover:shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative mb-6 md:mb-0">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/learnmore.png"
                  alt="Baker working with dough"
                  className="object-cover w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute top-4 right-4 flex flex-col space-y-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pl-10 flex flex-col justify-center">
              <h2 className="text-4xl font-black leading-tight tracking-tight">
                WHY IS BAKING
                <br />
                CONSIDERED AS
                <br />
                ART FORM?
              </h2>
              <p className="mt-6 text-sm font-medium">
                Their experience plays a role in the way they
                <br />
                work. Bakers use flavors and visual appeal
                <br />
                to produce an edible art piece.
              </p>
              <div className="mt-8">
                <button 
                  className={`bg-yellow-300 text-[#3a1a0f] rounded-full px-6 py-3 text-sm font-bold uppercase transition-all duration-300 ${hoverStates.learnBaking ? 'bg-yellow-400 transform scale-105 shadow-md' : ''}`}
                  onMouseEnter={() => handleHover('learnBaking', true)}
                  onMouseLeave={() => handleHover('learnBaking', false)}
                >
                  LEARN BAKING
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Special Items Section */}
        <div className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-[#3a1a0f] text-4xl font-black leading-tight tracking-tight">
              WHY BEKERY'S{" "}
              <span className="flex bg-orange-500 text-white rounded-full w-8 h-8 items-center justify-center">🍩</span>
              ITEMS IS SO SPECIAL
              <br />
              TO CUSTOMER? <span className="inline-block bg-blue-300 w-16 h-4 ml-2"></span>
            </h2>
            <button 
              className={`bg-yellow-300 rounded-full px-6 py-3 text-sm font-bold uppercase transition-all duration-300 ${hoverStates.shopNow ? 'bg-yellow-400 transform scale-105 shadow-md' : ''}`}
              onMouseEnter={() => handleHover('shopNow', true)}
              onMouseLeave={() => handleHover('shopNow', false)}
            >
              SHOP NOW
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg">
              <img
                src="/Screenshot 2025-04-14 210025.png"
                alt="Stack of cookies"
                className="w-full h-auto rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="rounded-3xl p-6 shadow-sm transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg">
              <div className="bg-[#8a4d2f] rounded-3xl p-6 text-white">
                <h3 className="font-bold text-xl mb-2">TASTE THE REAL WHEAT BAKED ITEMS.</h3>
                <div className="text-3xl font-bold text-orange-400 mt-4">$16</div>
                <img 
                  src="/Screenshot_2025-04-14_211126-removebg-preview.png" 
                  alt="Cookies" 
                  className="mt-6 w-full h-auto transition-transform duration-500 hover:scale-105" 
                />
              </div>
            </div>
            <div className="bg-yellow-200 rounded-3xl p-6 relative shadow-sm transition-all duration-500 hover:transform hover:scale-105 hover:shadow-lg">
              <div className="absolute top-2 right-2 bg-[#8a4d2f] text-white text-xs px-2 py-1 rounded-full font-bold">
                COMBO
              </div>
              <img
                src="/Screenshot 2025-04-14 211152.png"
                alt="Baker with bread"
                className="object-cover w-full h-auto rounded-lg shadow-sm transition-transform duration-500 hover:scale-105"
              />
              <div className="mt-6">
                <p className="text-xs font-medium">
                  <span className="text-lg">"</span> Baking is a craft in itself, and we bake these delicious and
                  crunchy flavors bakery items...
                </p>
                <p className="text-right mt-2 font-bold italic">— Ashton Cooper</p>
              </div>
            </div>
          </div>
        </div>

        {/* Butter Section */}
        <div className="my-16">
          <div className="bg-blue-200 rounded-3xl p-8 shadow-sm transition-all duration-500 hover:shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-3xl font-black tracking-tight text-[#3a1a0f]">
                  WITH ENOUGH
                  <br />
                  BUTTER, ANYTHING
                  <br />
                  IS GOOD!
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
                  {["PLAIN CAKE", "CROISSANT", "LOAF BREAD", "COOKIES", "BRETZEL", "APPLE PIE"].map((item) => (
                    <button 
                      key={item}
                      className="bg-gray-200 text-[#3a1a0f] text-xs font-extrabold px-3 py-2.5 rounded-full transition-all duration-300 hover:bg-gray-300 hover:transform hover:scale-105 hover:shadow-md"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className="mt-10 flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center mr-3 shadow-md animate-bounce">
                        <span className="text-base">👨‍🍳</span>
                      </div>
                      <p className="text-sm font-bold">
                        Our master plan to freshen
                        <br />
                        up a 200-year-old.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2">
                    <p className="text-sm font-bold underline cursor-pointer hover:text-yellow-600 transition-colors duration-300">
                      What we
                      <br />
                      are dishing out?
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col items-end justify-between">
                <div className="text-4xl font-black">3.73</div>
                <div className="flex">
                  <span className="text-yellow-500 text-lg">★★★★</span>
                  <span className="text-gray-300 text-lg">★</span>
                </div>
                <p className="text-xs font-medium text-right">Based on 1,350 reviews.</p>
                <div className="mt-auto">
                  <img 
                    src="/Screenshot 2025-04-14 205643.png" 
                    alt="Cookie" 
                    className="rounded-full w-16 h-16 shadow-md transition-transform duration-500 hover:scale-110" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
import { Product, ProductCategory } from '../types/product.types';

export const products: Product[] = [
  // COOKIES
  {
    id: 'cookie-1',
    name: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies with rich semi-sweet chocolate chunks and a soft, chewy center.',
    price: 3.99,
    imageUrl: '/prod1.png',
    category: 'COOKIES',
    bestSeller: true,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Chocolate chips', 'Vanilla extract'],
    nutritionalInfo: {
      calories: 180,
      protein: 2,
      carbs: 24,
      fat: 9
    }
  },
  {
    id: 'cookie-2',
    name: 'Double Chocolate Cookies',
    description: 'Indulgent double chocolate cookies with both cocoa powder and chocolate chunks.',
    price: 4.29,
    imageUrl: '/Screenshot 2025-04-14 205643.png',
    category: 'COOKIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Cocoa powder', 'Chocolate chunks', 'Vanilla extract']
  },
  {
    id: 'cookie-3',
    name: 'Oatmeal Raisin Cookies',
    description: 'Hearty oatmeal cookies with chewy raisins and a hint of cinnamon.',
    price: 3.79,
    imageUrl: '/Screenshot 2025-04-14 211126.png',
    category: 'COOKIES',
    ingredients: ['Oats', 'Flour', 'Butter', 'Sugar', 'Eggs', 'Raisins', 'Cinnamon', 'Vanilla extract']
  },
  {
    id: 'cookie-4',
    name: 'Peanut Butter Cookies',
    description: 'Rich peanut butter cookies with the perfect balance of sweet and salty.',
    price: 4.49,
    imageUrl: '/prod3.png',
    category: 'COOKIES',
    ingredients: ['Flour', 'Peanut butter', 'Sugar', 'Eggs', 'Vanilla extract']
  },
  {
    id: 'cookie-5',
    name: 'Shortbread Cookies',
    description: 'Traditional buttery Scottish shortbread cookies with a delicate, crumbly texture.',
    price: 3.89,
    imageUrl: '/Screenshot 2025-04-14 205935.png',
    category: 'COOKIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Salt']
  },
  {
    id: 'cookie-6',
    name: 'Ginger Snaps',
    description: 'Crisp, spiced cookies with a distinctive ginger flavor and warming spices.',
    price: 4.19,
    imageUrl: '/2nd.png',
    category: 'COOKIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Molasses', 'Ginger', 'Cinnamon', 'Cloves']
  },

  // CAKE
  {
    id: 'cake-1',
    name: 'Classic Chocolate Cake',
    description: 'Rich, moist chocolate cake layered with smooth chocolate ganache frosting.',
    price: 32.99,
    imageUrl: '/Screenshot 2025-04-14 205957.png',
    category: 'CAKE',
    bestSeller: true,
    ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Butter', 'Eggs', 'Vanilla extract', 'Sour cream', 'Chocolate ganache']
  },
  {
    id: 'cake-2',
    name: 'Red Velvet Cake',
    description: 'Southern classic red velvet cake with cream cheese frosting.',
    price: 36.99,
    imageUrl: '/Screenshot 2025-04-14 211152.png',
    category: 'CAKE',
    featured: true,
    ingredients: ['Flour', 'Sugar', 'Cocoa powder', 'Butter', 'Eggs', 'Buttermilk', 'Red food coloring', 'Cream cheese']
  },
  {
    id: 'cake-3',
    name: 'Carrot Cake',
    description: 'Spiced carrot cake with walnuts, topped with cream cheese frosting.',
    price: 34.99,
    imageUrl: '/Screenshot 2025-04-14 205946.png',
    category: 'CAKE',
    ingredients: ['Flour', 'Sugar', 'Carrots', 'Eggs', 'Oil', 'Cinnamon', 'Walnuts', 'Cream cheese']
  },
  {
    id: 'cake-4',
    name: 'Lemon Drizzle Cake',
    description: 'Zesty lemon sponge cake with a tangy lemon glaze.',
    price: 28.99,
    imageUrl: '/Screenshot 2025-04-14 205603.png',
    category: 'CAKE',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Lemons', 'Yogurt']
  },
  {
    id: 'cake-5',
    name: 'Tiramisu Cake',
    description: 'Italian-inspired cake with layers of coffee-soaked sponge and mascarpone cream.',
    price: 38.99,
    imageUrl: '/4th.png',
    category: 'CAKE',
    ingredients: ['Ladyfingers', 'Mascarpone', 'Eggs', 'Sugar', 'Coffee', 'Cocoa powder']
  },
  {
    id: 'cake-6',
    name: 'Black Forest Cake',
    description: 'German chocolate cake with cherry filling and whipped cream.',
    price: 38.99,
    imageUrl: '/Screenshot 2025-04-14 205617.png',
    category: 'CAKE',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Cocoa powder', 'Cherries', 'Whipped cream', 'Kirsch']
  },
  {
    id: 'cake-7',
    name: 'Opera Cake',
    description: 'Elegant French cake with layers of almond sponge, coffee buttercream, and chocolate ganache.',
    price: 42.99,
    imageUrl: '/Screenshot 2025-04-14 205653.png',
    category: 'CAKE',
    ingredients: ['Almond flour', 'Eggs', 'Sugar', 'Coffee', 'Chocolate', 'Butter']
  },

  // BRETZEL (PRETZELS)
  {
    id: 'bretzel-1',
    name: 'Classic Bavarian Pretzel',
    description: 'Traditional Bavarian-style pretzel with a dark, crispy outside and soft inside.',
    price: 3.49,
    imageUrl: '/Screenshot 2025-04-14 210025.png',
    category: 'BRETZEL',
    bestSeller: true,
    ingredients: ['Flour', 'Yeast', 'Water', 'Salt', 'Baking soda', 'Butter']
  },
  {
    id: 'bretzel-2',
    name: 'Cheese-Filled Pretzel',
    description: 'Soft pretzel filled with melty cheese for an extra savory treat.',
    price: 4.49,
    imageUrl: '/3rf.png',
    category: 'BRETZEL',
    ingredients: ['Flour', 'Yeast', 'Water', 'Salt', 'Cheese', 'Butter']
  },

  // PASTRIES
  {
    id: 'pastry-1',
    name: 'Classic Éclair',
    description: 'Light choux pastry filled with vanilla cream and topped with chocolate ganache.',
    price: 4.99,
    imageUrl: '/4th.png',
    category: 'PASTRIES',
    bestSeller: true,
    ingredients: ['Flour', 'Butter', 'Eggs', 'Sugar', 'Milk', 'Cream', 'Vanilla', 'Chocolate']
  },
  {
    id: 'pastry-2',
    name: 'Fruit Tart',
    description: 'Buttery tart shell filled with vanilla custard and topped with fresh seasonal fruits.',
    price: 5.99,
    imageUrl: '/Screenshot 2025-04-14 205935.png',
    category: 'PASTRIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla', 'Milk', 'Seasonal fruits']
  },
  {
    id: 'pastry-3',
    name: 'Danish Pastry',
    description: 'Flaky, buttery Danish pastry with almond filling and icing.',
    price: 4.79,
    imageUrl: '/vap.png',
    category: 'PASTRIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Yeast', 'Almond paste']
  },
  {
    id: 'pastry-4',
    name: 'Mille-feuille',
    description: 'Delicate French pastry with layers of puff pastry and vanilla cream, topped with icing.',
    price: 6.49,
    imageUrl: '/Screenshot 2025-04-14 210012.png',
    category: 'PASTRIES',
    ingredients: ['Puff pastry', 'Milk', 'Eggs', 'Sugar', 'Vanilla', 'Butter']
  },
  {
    id: 'pastry-5',
    name: 'Cinnamon Roll',
    description: 'Soft, spiraled pastry with cinnamon-sugar filling and vanilla glaze.',
    price: 4.29,
    imageUrl: '/3rf.png',
    category: 'PASTRIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Eggs', 'Milk', 'Cinnamon', 'Vanilla']
  },
  {
    id: 'pastry-6',
    name: 'Kouign-Amann',
    description: 'Buttery, flaky Breton pastry with caramelized sugar layers.',
    price: 5.49,
    imageUrl: '/Screenshot_2025-04-14_211126-removebg-preview.png',
    category: 'PASTRIES',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Salt', 'Yeast']
  },
  {
    id: 'pastry-7',
    name: 'Paris-Brest',
    description: 'Ring-shaped choux pastry filled with praline cream, created to commemorate the Paris-Brest bicycle race.',
    price: 6.99,
    imageUrl: '/learnmore.png',
    category: 'PASTRIES',
    ingredients: ['Flour', 'Butter', 'Eggs', 'Sugar', 'Hazelnuts', 'Almonds', 'Cream']
  },

  // CROISSANT
  {
    id: 'croissant-1',
    name: 'Classic Butter Croissant',
    description: 'Traditional French croissant with a flaky, buttery texture.',
    price: 3.29,
    imageUrl: '/2nd.png',
    category: 'CROISSANT',
    bestSeller: true,
    ingredients: ['Flour', 'Butter', 'Sugar', 'Yeast', 'Milk', 'Salt']
  },
  {
    id: 'croissant-2',
    name: 'Almond Croissant',
    description: 'Butter croissant filled with almond cream and topped with sliced almonds.',
    price: 4.29,
    imageUrl: '/Screenshot 2025-04-14 205653.png',
    category: 'CROISSANT',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Yeast', 'Milk', 'Salt', 'Almond cream', 'Sliced almonds']
  },
  {
    id: 'croissant-3',
    name: 'Chocolate Croissant',
    description: 'Buttery croissant filled with rich chocolate batons.',
    price: 3.99,
    imageUrl: '/Screenshot_2025-04-14_211126-removebg-preview.png',
    category: 'CROISSANT',
    ingredients: ['Flour', 'Butter', 'Sugar', 'Yeast', 'Milk', 'Salt', 'Dark chocolate']
  },

  // BAGEL
  {
    id: 'bagel-1',
    name: 'Plain Bagel',
    description: 'Chewy, traditional plain bagel, perfect with cream cheese or as a sandwich.',
    price: 2.49,
    imageUrl: '/prod2.png',
    category: 'BAGEL',
    bestSeller: true,
    ingredients: ['Flour', 'Water', 'Yeast', 'Salt', 'Malt extract']
  },
  {
    id: 'bagel-2',
    name: 'Everything Bagel',
    description: 'Classic bagel topped with a mix of sesame seeds, poppy seeds, onion, and garlic.',
    price: 2.79,
    imageUrl: '/Screenshot 2025-04-14 205603.png',
    category: 'BAGEL',
    ingredients: ['Flour', 'Water', 'Yeast', 'Salt', 'Malt extract', 'Sesame seeds', 'Poppy seeds', 'Dried garlic', 'Dried onion']
  },
  {
    id: 'bagel-3',
    name: 'Cinnamon Raisin Bagel',
    description: 'Sweet bagel with cinnamon and plump raisins throughout.',
    price: 2.99,
    imageUrl: '/Screenshot 2025-04-14 210012.png',
    category: 'BAGEL',
    ingredients: ['Flour', 'Water', 'Yeast', 'Salt', 'Malt extract', 'Cinnamon', 'Raisins', 'Sugar']
  },

  // BREAD
  {
    id: 'bread-1',
    name: 'Artisan Sourdough',
    description: 'Traditional sourdough bread with a crispy crust and tangy flavor profile.',
    price: 5.99,
    imageUrl: '/prod1.png',
    category: 'BREAD',
    bestSeller: true,
    ingredients: ['Flour', 'Water', 'Salt', 'Sourdough starter'],
    nutritionalInfo: {
      calories: 120,
      protein: 4,
      carbs: 23,
      fat: 0.5
    }
  },
  {
    id: 'bread-2',
    name: 'Rustic Baguette',
    description: 'Classic French baguette with a crispy exterior and light, airy interior.',
    price: 3.49,
    imageUrl: '/Screenshot 2025-04-14 205617.png',
    category: 'BREAD',
    ingredients: ['Flour', 'Water', 'Yeast', 'Salt']
  },
  {
    id: 'bread-3',
    name: 'Whole Grain Loaf',
    description: 'Nutritious whole grain bread packed with seeds and grains.',
    price: 4.99,
    imageUrl: '/Screenshot 2025-04-14 205653.png',
    category: 'BREAD',
    ingredients: ['Whole wheat flour', 'Water', 'Yeast', 'Honey', 'Oats', 'Flax seeds', 'Sunflower seeds']
  },
  {
    id: 'bread-4',
    name: 'Ciabatta',
    description: 'Italian bread with a light, airy texture and crisp crust.',
    price: 4.49,
    imageUrl: '/prod3.png',
    category: 'BREAD',
    ingredients: ['Flour', 'Water', 'Olive oil', 'Yeast', 'Salt']
  },
  {
    id: 'bread-5',
    name: 'Brioche Loaf',
    description: 'Rich, buttery French bread perfect for breakfast toast or sandwiches.',
    price: 8.99,
    imageUrl: '/4th.png',
    category: 'BREAD',
    ingredients: ['Flour', 'Butter', 'Eggs', 'Milk', 'Sugar', 'Yeast', 'Salt']
  },
  {
    id: 'bread-6',
    name: 'Rye Bread',
    description: 'Hearty rye bread with a dense texture and rich flavor.',
    price: 7.29,
    imageUrl: '/Screenshot 2025-04-14 211126.png',
    category: 'BREAD',
    ingredients: ['Rye flour', 'Wheat flour', 'Caraway seeds', 'Molasses', 'Yeast', 'Salt']
  }
];

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  if (category === "ALL") {
    return products;
  }
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.bestSeller || product.featured);
};

export const getAllProducts = (): Product[] => {
  return products;
};
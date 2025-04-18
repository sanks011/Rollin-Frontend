import { initializeApp } from 'firebase/app';
import { getAuth, browserLocalPersistence, indexedDBLocalPersistence } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATR41dIILYkTwJgTWmcx91Lb_attz8vaw",
  authDomain: "bakery-de534.firebaseapp.com",
  projectId: "bakery-de534",
  storageBucket: "bakery-de534.firebasestorage.app",
  messagingSenderId: "443168470834",
  appId: "1:443168470834:web:52150fe8e87656ef64c92b",
  measurementId: "G-N28BE2605Q",
  databaseURL: "https://bakery-de534-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure multiple persistence mechanisms for better reliability
// This helps with token refreshing and session handling
(async () => {
  try {
    // Try to set both methods for maximum compatibility
    await auth.setPersistence(browserLocalPersistence);
    console.log("Set browserLocalPersistence successfully");
  } catch (error) {
    console.error("Error setting persistence:", error);
    
    // Fallback to another persistence method if first fails
    try {
      await auth.setPersistence(indexedDBLocalPersistence);
      console.log("Fallback to indexedDBLocalPersistence successful");
    } catch (fallbackError) {
      console.error("Error setting fallback persistence:", fallbackError);
    }
  }
})();

export { app, auth };
import React, { useState, useEffect } from 'react';
import api from '../services/api.service';
import { Product } from '../types/product.types';

const ApiTest = () => {
  const [status, setStatus] = useState<string>('Checking connection...');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testApiConnection = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Test connection to backend API
        const response = await api.get('/products');
        
        if (response.data && response.data.products) {
          setProducts(response.data.products.slice(0, 3)); // Show first 3 products
          setStatus('Connected successfully to backend API');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err: Error | unknown) {
        console.error('API connection error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(errorMessage);
        setStatus('Connection failed');
      } finally {
        setLoading(false);
      }
    };

    testApiConnection();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 my-8 shadow-sm">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-500 mr-3"></div>
          <span>Testing connection...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
          <p className="font-medium">Connection Error</p>
          <p className="text-sm mt-1">{error}</p>
          <div className="mt-3 text-sm">
            <p>Please make sure:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Backend server is running at https://rollin-backend.onrender.com</li>
              <li>CORS is properly configured on the server</li>
              <li>API endpoints are implemented correctly</li>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            <p className="font-medium">{status}</p>
          </div>
          
          {products.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Sample Products from API:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">${product.price?.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApiTest;
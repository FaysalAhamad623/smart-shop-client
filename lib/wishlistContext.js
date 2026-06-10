'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // Sync save helper
  const saveToStorage = (items) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  };

  // Add item to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist(prev => {
      if (prev.some(item => item._id === product._id)) {
        toast.error('Item already in wishlist');
        return prev;
      }
      
      const newItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        brand: product.brand,
        stock: product.stock
      };
      
      const newWishlist = [...prev, newItem];
      saveToStorage(newWishlist);
      toast.success('Added to wishlist');
      return newWishlist;
    });
  }, []);

  // Remove item from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(item => item._id !== productId);
      saveToStorage(newWishlist);
      toast.success('Removed from wishlist');
      return newWishlist;
    });
  }, []);

  // Check if item is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item._id === productId);
  }, [wishlist]);

  // Toggle wishlist item
  const toggleWishlist = useCallback((product) => {
    // We can't rely on isInWishlist here easily because of closure, 
    // so we check inside the setter or use the current state if available.
    // However, since we need to branch logic (add vs remove), let's use the state.
    // Ideally we pass the ID.
    
    // Better implementation: check state first?
    // Actually, let's keep it simple.
    // Since we need to know whether to add or remove to log/toast correctly
    
    setWishlist(prev => {
      const exists = prev.some(item => item._id === product._id);
      let newWishlist;
      if (exists) {
        newWishlist = prev.filter(item => item._id !== product._id);
        toast.success('Removed from wishlist');
      } else {
        const newItem = {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
          stock: product.stock
        };
        newWishlist = [...prev, newItem];
        toast.success('Added to wishlist');
      }
      saveToStorage(newWishlist);
      return newWishlist;
    });
  }, []);

  const getWishlistCount = useCallback(() => {
    return wishlist.length;
  }, [wishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    saveToStorage([]);
    toast.success('Wishlist cleared');
  }, []);

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    getWishlistCount,
    clearWishlist,
    isLoaded
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

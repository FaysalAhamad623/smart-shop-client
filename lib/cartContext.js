'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('cart');
        console.log('CartContext: INIT - Loading from localStorage:', savedCart);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
            console.log('CartContext: INIT - Set cart state to:', parsedCart);
          }
        }
      } catch (error) {
        console.error('CartContext: INIT - Error loading cart:', error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  // We only save if isLoaded is true to prevent overwriting existing data with empty init state
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      console.log('CartContext: EFFECT - Saving to localStorage:', cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Add item to cart
  const addToCart = useCallback((product, quantity = 1, selectedSize = null, selectedColor = null) => {
    if (!product || !product._id) {
      console.error('CartContext: Invalid product provided to addToCart');
      return;
    }

    console.log('CartContext: ACTION - addToCart', { product: product.name, quantity, selectedSize, selectedColor });

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => 
          item._id === product._id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );

      let newCart;
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        newCart = updatedCart;
      } else {
        // Add new item
        newCart = [...prevCart, {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
          quantity,
          selectedSize,
          selectedColor,
          stock: product.stock
        }];
      }
      
      // IMMEDIATE SYNC SC SAVE
      // This ensures that even if the effect is delayed or interrupted, the data hits disk.
      if (typeof window !== 'undefined') {
        console.log('CartContext: SYNC SAVE - Writing to localStorage immediately:', newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      
      return newCart;
    });

    toast.success(`Added ${product.name} to cart!`);
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((productId, selectedSize = null, selectedColor = null) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.find(
        item => 
          item._id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      
      const newCart = prevCart.filter(
        item => 
          !(item._id === productId && 
            item.selectedSize === selectedSize && 
            item.selectedColor === selectedColor)
      );
      
      // Immediate sync save
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      
      return newCart;
    });
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((productId, quantity, selectedSize = null, selectedColor = null) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }

    setCart(prevCart => {
      const newCart = prevCart.map(item => {
        if (
          item._id === productId && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      });
      
      // Immediate sync save
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(newCart));
      }
      return newCart;
    });
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    toast.success('Cart cleared');
  }, []);

  // Get cart total - memoized value
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Get cart item count - memoized value
  const getCartCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    isLoaded
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;

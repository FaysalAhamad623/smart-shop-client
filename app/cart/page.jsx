'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingBag, FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '@/lib/cartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary">
              Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h1>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-2"
            >
              <FiTrash2 /> Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item._id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 flex gap-6"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{item.brand}</p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-gray-500 text-sm mt-1">
                            {item.selectedSize && <span className="mr-3">Size: {item.selectedSize}</span>}
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id, item.selectedSize, item.selectedColor)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                          disabled={item.quantity >= item.stock}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-28"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 border-b pb-4 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-gray-800 mb-6">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </motion.button>

                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 border-2 border-gray-300 text-gray-700 py-4 rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

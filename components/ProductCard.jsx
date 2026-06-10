'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import { useWishlist } from '@/lib/wishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isLiked = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes?.[0] || null, product.colors?.[0] || null);
  };
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Container */}
      <Link href={`/products/${product._id}`}>
        <div className="relative h-80 overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {hasDiscount && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                -{discount}%
              </span>
            )}
            {product.isNewArrival && (
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                NEW
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <FiHeart className={isLiked ? 'fill-current' : ''} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white transition-all"
            >
              <FiEye />
            </motion.button>
          </div>

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-800 px-4 py-2 rounded-md font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500 mb-3">{product.brand}</p>
        )}

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(product.rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.numReviews})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {product.sizes.slice(0, 4).map((size, index) => (
              <span
                key={index}
                className="text-xs border border-gray-300 px-2 py-1 rounded hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {size}
              </span>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={product.stock === 0}
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <FiShoppingCart />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}

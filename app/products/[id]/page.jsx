'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart, FiStar, FiCheck, FiTruck, FiRefreshCw } from 'react-icons/fi';
import { productService } from '@/lib/products';
import toast from 'react-hot-toast';

import { useCart } from '@/lib/cartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductById(params.id);
      setProduct(response.data);
      if (response.data.sizes?.length > 0) {
        setSelectedSize(response.data.sizes[0]);
      }
      if (response.data.colors?.length > 0) {
        setSelectedColor(response.data.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link href="/products" className="text-primary hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const discount = product.discount || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-[500px] bg-white rounded-lg overflow-hidden mb-4"
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}% OFF
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-white rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Category & Brand */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
                {product.brand && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-600">{product.brand}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-yellow-400 text-lg">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.numReviews} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-md transition-all ${
                          selectedColor === color
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Size: <span className="font-normal text-gray-600">{selectedSize}</span>
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 border-2 rounded-md flex items-center justify-center font-semibold transition-all ${
                          selectedSize === size
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 hover:border-primary'
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">
                    ({product.stock} in stock)
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <FiShoppingCart />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 border-2 border-primary rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                >
                  <FiHeart className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiTruck className="w-5 h-5" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiRefreshCw className="w-5 h-5" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiCheck className="w-5 h-5" />
                  <span>Authentic and high-quality products</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

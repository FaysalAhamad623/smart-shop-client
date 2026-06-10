'use client';
import { useWishlist } from '@/lib/wishlistContext';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-heading font-bold text-primary">
            My Wishlist
          </h1>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-500 hover:text-red-700 font-medium text-sm"
            >
              Clear Wishlist
            </button>
          )}
        </motion.div>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your wishlist yet.
            </p>
            <Link href="/products">
              <span className="inline-block bg-primary text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer">
                Start Shopping
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

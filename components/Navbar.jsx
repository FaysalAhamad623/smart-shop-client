'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag, FiUser, FiLogOut, FiSearch, FiHeart } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useWishlist } from '@/lib/wishlistContext';
import { useCart } from '@/lib/cartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
      setShowSearch(false);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      toast.success('Logged out successfully!');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const user = session?.user;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white text-xs py-2 w-full">
        <div className="container-custom flex justify-between items-center">
          <p>Free shipping, 30-day return or refund guarantee.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-accent transition-colors">
              SIGN IN
            </Link>
            <span>|</span>
            <Link href="/register" className="hover:text-accent transition-colors">
              SIGN UP
            </Link>
            <span>|</span>
            <Link href="/faq" className="hover:text-accent transition-colors">
              FAQs
            </Link>
            <span>|</span>
            <span>USD $</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.h1
                whileHover={{ scale: 1.05 }}
                className="text-2xl lg:text-3xl font-heading font-bold text-primary"
              >
                Male fashion<span className="text-accent">.</span>
              </motion.h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors relative group ${
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                      pathname === link.href ? 'w-full' : ''
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">


              {/* Search */}
              <div className="hidden lg:flex items-center">
                {showSearch ? (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="relative mr-2"
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      autoFocus
                      className="w-full pl-3 pr-8 py-1 border-b-2 border-primary focus:outline-none bg-transparent"
                      onBlur={() => !searchTerm && setShowSearch(false)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearch(false)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSearch(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiSearch className="w-5 h-5 text-gray-700" />
                  </motion.button>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/wishlist">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:block p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  <FiHeart className="w-5 h-5 text-gray-700" />
                  {getWishlistCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {getWishlistCount()}
                    </span>
                  )}
                </motion.button>
              </Link>

              {/* Shopping Bag */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <FiShoppingBag className="w-5 h-5 text-gray-700" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {getCartCount()}
                    </span>
                  )}
                </motion.div>
              </Link>

              {/* User Menu - Sidebar Panel */}
              {user ? (
                <>
                  {/* Avatar Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSidebarOpen(true)}
                    className="hidden lg:flex w-11 h-11 rounded-full bg-gradient-to-br from-primary via-gray-700 to-gray-900 items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-white ring-offset-2 cursor-pointer"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </motion.button>

                  {/* Sidebar Overlay */}
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <>
                        {/* Dark Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsSidebarOpen(false)}
                          className="fixed inset-0 bg-black/50 z-[100]"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                          initial={{ x: '100%' }}
                          animate={{ x: 0 }}
                          exit={{ x: '100%' }}
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-[101] overflow-y-auto"
                        >
                          {/* Panel Header */}
                          <div className="bg-gradient-to-r from-primary to-gray-800 p-6 text-white">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">Account Menu</h3>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                              >
                                <FiX className="w-5 h-5" />
                              </motion.button>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                                {user.name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold text-lg">{user.name}</p>
                                <p className="text-white/70 text-sm">{user.email}</p>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                  {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Panel Content */}
                          <div className="p-4">
                            {/* Admin Section */}
                            {user.role === 'admin' && (
                              <div className="mb-6">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-2">Admin Tools</p>
                                <Link 
                                  href="/admin"
                                  onClick={() => setIsSidebarOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all mb-2"
                                >
                                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FiShoppingBag className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Dashboard</p>
                                    <p className="text-xs text-gray-500">Manage your store</p>
                                  </div>
                                </Link>
                                <Link 
                                  href="/admin/add-product"
                                  onClick={() => setIsSidebarOpen(false)}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                                >
                                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <FiShoppingBag className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Add Product</p>
                                    <p className="text-xs text-gray-500">Create new listing</p>
                                  </div>
                                </Link>
                              </div>
                            )}

                            {/* User Section */}
                            <div className="mb-6">
                              <p className="text-xs text-gray-500 uppercase tracking-wide mb-3 px-2">Account</p>
                              <Link 
                                href="/profile"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all mb-2"
                              >
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <FiUser className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                  <p className="font-medium">My Profile</p>
                                  <p className="text-xs text-gray-500">View & edit profile</p>
                                </div>
                              </Link>
                              <Link 
                                href="/cart"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all mb-2"
                              >
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                  <FiShoppingBag className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                  <p className="font-medium">My Cart</p>
                                  <p className="text-xs text-gray-500">View shopping cart</p>
                                </div>
                              </Link>
                              <Link 
                                href="/products"
                                onClick={() => setIsSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                              >
                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                  <FiHeart className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Browse Shop</p>
                                  <p className="text-xs text-gray-500">Explore products</p>
                                </div>
                              </Link>
                            </div>

                            {/* Logout */}
                            <div className="border-t pt-4">
                              <button 
                                onClick={() => {
                                  handleLogout();
                                  setIsSidebarOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                              >
                                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                  <FiLogOut className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                  <p className="font-medium">Logout</p>
                                  <p className="text-xs text-gray-500">Sign out of account</p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      Login
                    </motion.button>
                  </Link>
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Register
                    </motion.button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-gray-700"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="container-custom py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 font-medium ${
                      pathname === link.href
                        ? 'text-primary'
                        : 'text-gray-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 font-medium text-gray-600"
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <>
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block py-2 font-medium text-primary"
                        >
                          📊 Dashboard
                        </Link>
                        <Link
                          href="/admin/add-product"
                          onClick={() => setIsOpen(false)}
                          className="block py-2 font-medium text-gray-600"
                        >
                          Add Product
                        </Link>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block py-2 font-medium text-red-600 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 font-medium text-gray-600"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 font-medium text-primary"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

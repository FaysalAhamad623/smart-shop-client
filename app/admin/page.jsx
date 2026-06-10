'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  FiPackage, 
  FiUsers, 
  FiShoppingCart, 
  FiDollarSign, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiTrendingUp,
  FiEye,
  FiGrid,
  FiList
} from 'react-icons/fi';
import { productService } from '@/lib/products';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    featured: 0
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      router.push('/login');
      return;
    }

    fetchProducts();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAllProducts({});
      const productData = response.data || [];
      setProducts(productData);
      
      // Calculate stats
      const totalValue = productData.reduce((acc, p) => acc + (p.price * p.stock), 0);
      const lowStock = productData.filter(p => p.stock < 10).length;
      const featured = productData.filter(p => p.isFeatured).length;
      
      setStats({
        totalProducts: productData.length,
        totalValue: totalValue.toFixed(2),
        lowStock,
        featured
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productService.deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: FiPackage, label: 'Total Products', value: stats.totalProducts, color: 'bg-blue-500' },
    { icon: FiDollarSign, label: 'Inventory Value', value: `$${stats.totalValue}`, color: 'bg-green-500' },
    { icon: FiTrendingUp, label: 'Featured Items', value: stats.featured, color: 'bg-purple-500' },
    { icon: FiShoppingCart, label: 'Low Stock', value: stats.lowStock, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl font-heading font-bold text-primary">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {session?.user?.name || 'Admin'}</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-4 md:mt-0"
          >
            <Link 
              href="/admin/add-product"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <FiPlus className="w-5 h-5" />
              Add New Product
            </Link>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/admin/add-product"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FiPlus className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-600">Add Product</span>
            </Link>
            <Link 
              href="/products"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FiEye className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-600">View Store</span>
            </Link>
            <button 
              onClick={fetchProducts}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FiTrendingUp className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-600">Refresh Stats</span>
            </button>
            <Link 
              href="/profile"
              className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FiUsers className="w-8 h-8 text-primary" />
              <span className="text-sm text-gray-600">My Profile</span>
            </Link>
          </div>
        </motion.div>

        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Products ({products.length})</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No products found</p>
              <Link 
                href="/admin/add-product"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <FiPlus /> Add your first product
              </Link>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isFeatured && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    {product.stock < 10 && (
                      <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-primary font-bold">${product.price}</span>
                      <span className="text-gray-500 text-sm">Stock: {product.stock}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1 flex items-center justify-center gap-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                      >
                        <FiEye className="w-4 h-4" /> View
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <FiTrash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <span className="font-medium text-gray-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 capitalize">{product.category}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">${product.price}</td>
                      <td className="px-4 py-3">
                        <span className={`${product.stock < 10 ? 'text-orange-600' : 'text-gray-600'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {product.isFeatured && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {product.isNewArrival && (
                          <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full ml-1">
                            New
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product._id}`}
                            className="p-2 text-gray-500 hover:text-primary transition-colors"
                          >
                            <FiEye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

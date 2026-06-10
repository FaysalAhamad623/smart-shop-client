'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiShield, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      toast.error('Please login to view your profile');
      router.push('/login');
      return;
    }

    // Initialize form data with session data
    setFormData({
      name: session.user.name || '',
      email: session.user.email || '',
    });
  }, [session, status, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // In a real app, you'd update the user profile here
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setFormData({
      name: session.user.name || '',
      email: session.user.email || '',
    });
    setIsEditing(false);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen gradient-bg py-12 px-4">
      <div className="container-custom max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">
              My Profile
            </h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Profile Header with Gradient */}
            <div className="bg-gradient-to-r from-primary to-gray-800 px-8 py-12 text-white relative">
              <div className="absolute top-4 right-4">
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all"
                  >
                    <FiEdit2 className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-all"
                    >
                      <FiSave className="w-4 h-4" />
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all"
                    >
                      <FiX className="w-4 h-4" />
                      Cancel
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center">
                {/* Profile Avatar */}
                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-5xl mb-4 ring-4 ring-white/30">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                
                {/* User Name */}
                <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                
                {/* Role Badge */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <FiShield className="w-4 h-4" />
                  <span className="font-medium">
                    {user.role === 'admin' ? '👑 Administrator' : '👤 User'}
                  </span>
                </div>

                {user.isMock && (
                  <div className="mt-3 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full text-sm">
                    🔐 Mock Account
                  </div>
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="p-8 space-y-6">
              {/* Personal Information Section */}
              <div>
                <h3 className="text-xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5" />
                  Personal Information
                </h3>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                        {user.name}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                        <FiMail className="w-4 h-4 text-gray-500" />
                        {user.email}
                      </div>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Role
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center gap-2">
                      <FiShield className="w-4 h-4 text-gray-500" />
                      <span className="capitalize">{user.role}</span>
                      {user.role === 'admin' && (
                        <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                          Full Access
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Statistics */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Account Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-1">0</div>
                    <div className="text-sm text-gray-600">Orders Placed</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-1">0</div>
                    <div className="text-sm text-gray-600">Wishlist Items</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {user.role === 'admin' ? '∞' : '0'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {user.role === 'admin' ? 'Admin Access' : 'Reviews'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Section */}
              {user.role === 'admin' && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-heading font-bold text-primary mb-4">
                    👑 Admin Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push('/admin/add-product')}
                      className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center gap-3 font-medium"
                    >
                      <FiEdit2 className="w-5 h-5" />
                      Add New Product
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push('/admin')}
                      className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3 font-medium"
                    >
                      <FiShield className="w-5 h-5" />
                      Admin Dashboard
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

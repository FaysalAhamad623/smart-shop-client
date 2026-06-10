'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiCheck, FiTruck, FiHeart, FiShield } from 'react-icons/fi';

export default function AboutPage() {
  const values = [
    {
      icon: FiHeart,
      title: 'Quality First',
      description: 'We source only the finest materials and work with skilled artisans to ensure every piece meets our high standards.',
      color: 'bg-red-50 text-red-600'
    },
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'With our efficient logistics network, we ensure your orders reach you quickly and safely.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: FiShield,
      title: 'Customer Trust',
      description: 'Your satisfaction is our priority. We stand behind every product with our satisfaction guarantee.',
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-primary to-gray-800">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full flex items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">
              About Male Fashion
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Redefining men's fashion with timeless style and exceptional quality
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-heading font-bold text-primary mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020, Male Fashion was born from a simple idea: every man deserves to look and feel his best. We believe that great style shouldn't be complicated or inaccessible.
                </p>
                <p>
                  Our mission is to provide premium menswear that combines timeless elegance with contemporary design. Each piece in our collection is carefully curated to ensure it meets our exacting standards for quality, fit, and style.
                </p>
                <p>
                  From casual essentials to formal wear, we offer a comprehensive range of products that cater to the modern gentleman's lifestyle. Whether  you're dressing for a business meeting or a weekend getaway, we've got you covered.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80"
                alt="About Us"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Happy Customers' },
              { number: '500+', label: 'Products' },
              { number: '50+', label: 'Countries' },
              { number: '4.8', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team/Commitment Section */}
      <div className="section-padding">
        <div className="container-custom max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-heading font-bold text-primary mb-6">
              Our Commitment to You
            </h2>
            <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
              <p>
                At Male Fashion, we're committed to providing you with an exceptional shopping experience from start to finish. Our customer service team is always ready to assist you, and our hassle-free return policy ensures your complete satisfaction.
              </p>
              <p>
                We're constantly updating our collection with the latest trends while staying true to classic styles that never go out of fashion. Thank you for choosing Male Fashion as your style partner.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['Free Shipping', '30-Day Returns', 'Secure Checkout', '24/7 Support'].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full"
                >
                  <FiCheck className="w-5 h-5" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

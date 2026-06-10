'use client';
import { motion } from 'framer-motion';
import { FiTruck, FiRefreshCw, FiHeadphones, FiCreditCard } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'On all orders over $50',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      description: '30-day return policy',
      color: 'bg-green-50 text-green-600'
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Dedicated customer service',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: FiCreditCard,
      title: 'Secure Payment',
      description: '100% secure transactions',
      color: 'bg-orange-50 text-orange-600'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <feature.icon className="w-8 h-8" />
              </motion.div>
              <h3 className="font-heading font-semibold text-xl text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      name: 'Shirts',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
      count: '156 items',
      href: '/products?category=shirts'
    },
    {
      id: 2,
      name: 'Jackets',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
      count: '89 items',
      href: '/products?category=jackets'
    },
    {
      id: 3,
      name: 'Casual',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80',
      count: '234 items',
      href: '/products?category=casual'
    },
    {
      id: 4,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      count: '67 items',
      href: '/products?category=accessories'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collections designed for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-80">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-heading font-bold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200">{category.count}</p>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <span className="text-primary text-xl">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

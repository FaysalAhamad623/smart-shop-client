'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function BannerSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Large Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-lg group cursor-pointer h-96 lg:h-full"
          >
            <Link href="/products?category=casual">
              <div className="relative h-full">
                <Image
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
                  alt="Clothing Collections 2030"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-3xl font-heading font-bold mb-2">
                    Clothing Collections 2030
                  </h3>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-sm font-semibold underline flex items-center gap-2"
                  >
                    SHOP NOW →
                  </motion.button>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Small Banners */}
          <div className="grid grid-rows-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-lg group cursor-pointer h-48 lg:h-auto"
            >
              <Link href="/products?category=accessories">
                <div className="relative h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80"
                    alt="Accessories"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-heading font-bold mb-1">
                      Accessories
                    </h3>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-sm font-semibold underline flex items-center gap-2"
                    >
                      SHOP NOW →
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden rounded-lg group cursor-pointer h-48 lg:h-auto"
            >
              <Link href="/products?category=shoes">
                <div className="relative h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"
                    alt="Footwear"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-heading font-bold mb-1">
                      Footwear
                    </h3>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-sm font-semibold underline flex items-center gap-2"
                    >
                      SHOP NOW →
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

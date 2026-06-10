'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: 'SUMMER COLLECTION',
      title: 'Fall - Winter Collections 2030',
      description: 'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
      image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80',
      bgColor: 'from-rose-50/50 to-orange-50/50'
    },
    {
      id: 2,
      tag: 'NEW ARRIVAL',
      title: 'Discover Your Style',
      description: 'Elevate your wardrobe with our curated collection of premium menswear designed for the modern gentleman.',
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
      bgColor: 'from-blue-50/50 to-indigo-50/50'
    },
    {
      id: 3,
      tag: 'TRENDING NOW',
      title: 'Timeless Classics',
      description: 'Invest in pieces that transcend seasons. Our collection combines contemporary style with enduring quality.',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
      bgColor: 'from-gray-50/50 to-slate-50/50'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            x: currentSlide === index ? 0 : currentSlide > index ? -100 : 100
          }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`}
          style={{ 
            pointerEvents: currentSlide === index ? 'auto' : 'none' 
          }}
        >
          <div className="container-custom h-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-20">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : -50
                }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-6 z-10"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20
                  }}
                  transition={{ delay: 0.3 }}
                  className="text-accent font-semibold tracking-wider text-sm"
                >
                  {slide.tag}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20
                  }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20
                  }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-lg max-w-lg"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20
                  }}
                  transition={{ delay: 0.6 }}
                >
                  <Link href="/products">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group bg-primary text-white px-8 py-4 rounded-md font-medium flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                    >
                      SHOP NOW
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Social Media Icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4 pt-4"
                >
                  {['Facebook', 'Twitter', 'Pinterest', 'Instagram'].map((social, idx) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: currentSlide === index ? 1 : 0,
                        y: currentSlide === index ? 0 : 20
                      }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                    >
                      <span className="text-xs font-semibold">
                        {social.charAt(0)}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : 50
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative h-[400px] lg:h-[600px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
                <div className="relative h-full flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
        >
          <FiArrowLeft className="w-6 h-6 text-primary" />
        </motion.button>
      </div>

      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
        >
          <FiArrowRight className="w-6 h-6 text-primary" />
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Fashion Enthusiast',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Absolutely love the quality! The fit is perfect and the fabric feels premium. Will definitely be ordering more.'
    },
    {
      id: 2,
      name: 'Mike Johnson',
      role: 'Business Professional',
      image: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      text: 'Best online shopping experience. Fast delivery and the customer service is outstanding. Highly recommended!'
    },
    {
      id: 3,
      name: 'David Lee',
      role: 'Style Blogger',
      image: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      text: 'The attention to detail is impressive. Every piece I have ordered has exceeded my expectations.'
    }
  ];

  return (
    <section className="section-padding gradient-bg">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

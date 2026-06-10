'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    category: 'Ordering',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Simply browse our products, select your size and color, and click "Add to Cart". When you are ready, proceed to checkout and follow the instructions to enter your shipping and payment details.'
      },
      {
        q: 'Can I modify or cancel my order?',
        a: 'You can modify or cancel your order within 1 hour of placing it. Please contact our support team immediately. Once the order has been processed, we cannot make changes.'
      }
    ]
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by location.'
      },
      {
        q: 'How long will delivery take?',
        a: 'Standard shipping takes 5-7 business days for domestic orders and 10-21 days for international orders. Express shipping options are available at checkout.'
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order is shipped, you will receive a confirmation email with a tracking number and a link to track your package.'
      }
    ]
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with tags attached.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Log in to your account, go to "My Orders", and select the order you wish to return. Follow the prompts to generate a return label.'
      }
    ]
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800">{question}</span>
        {isOpen ? <FiMinus className="text-primary" /> : <FiPlus className="text-gray-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gray-50"
          >
            <div className="p-5 text-gray-600 leading-relaxed border-t border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {faqs.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              {section.category}
            </h2>
            <div>
              {section.questions.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

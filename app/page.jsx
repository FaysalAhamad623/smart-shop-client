import Hero from '@/components/Hero';
import FeaturedCategories from '@/components/FeaturedCategories';
import NewArrivals from '@/components/NewArrivals';
import BannerSection from '@/components/BannerSection';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Featured Categories */}
      <FeaturedCategories />
      
      {/* 3. New Arrivals */}
      <NewArrivals />
      
      {/* 4. Banner Section / Collections */}
      <BannerSection />
      
      {/* 5. Features Section */}
      <Features />
      
      {/* 6. Testimonials */}
      <Testimonials />
      
      {/* 7. Newsletter is in Footer */}
    </>
  );
}

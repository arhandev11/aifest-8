import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import CountdownSection from '@/components/sections/CountdownSection';
import VideoSection from '@/components/sections/VideoSection';
import TimelineSection from '@/components/sections/TimelineSection';
import CompetitionsSection from '@/components/sections/CompetitionsSection';
import EventsSection from '@/components/sections/EventsSection';
import GuestStarsSection from '@/components/sections/GuestStarsSection';
import GallerySection from '@/components/sections/GallerySection';
import FAQSection from '@/components/sections/FAQSection';
import Footer from '@/components/sections/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-festival-black">
      <Header />
      <main>
        <HeroSection />
        <CountdownSection />
        <VideoSection />
        <TimelineSection />
        <CompetitionsSection />
        <EventsSection />
        {/* <GuestStarsSection /> */}
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

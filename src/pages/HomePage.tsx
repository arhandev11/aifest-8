import CompetitionsSection from "@/components/sections/CompetitionsSection";
import CountdownSection from "@/components/sections/CountdownSection";
import EventsSection from "@/components/sections/EventsSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/sections/Footer";
import GallerySection from "@/components/sections/GallerySection";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import TimelineSection from "@/components/sections/TimelineSection";
import VideoSection from "@/components/sections/VideoSection";

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
        {/* Location Map */}
        <div className="w-full max-w-4xl mx-auto px-6 py-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-10 text-center tracking-widest"
            style={{ fontFamily: 'var(--font-family-sansita)' }}
          >
            LOKASI
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15852.148799541812!2d106.737341!3d-6.6423028!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cfefb49412f5%3A0xb0c8f8a6c317b484!2sMa'had%20Aisyah%20binti%20Abu%20Bakar%20Li%20al-Dakwah!5e0!3m2!1sen!2sid!4v1732267461015!5m2!1sen!2sid"
            className="w-full h-[300px] sm:h-[400px] rounded-xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

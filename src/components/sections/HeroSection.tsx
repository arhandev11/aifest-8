import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden"
    >
      {/* Base Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/bg-section-1.png)',
          y,
        }}
      />

      {/* Sparkle Overlay Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: 'url(/assets/sparkle-bg-1.png)',
          y: useTransform(scrollY, [0, 500], [0, 100]),
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-festival-black/80"></div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Main Title Image */}
        <motion.div
          className="flex items-center justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/assets/section-1.png"
            alt="Aisyah Festival 8.0"
            className="w-[280px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
          />
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          className="font-playfair text-white/95 text-center text-lg sm:text-xl md:text-2xl font-normal tracking-wide leading-relaxed max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          In the Age of Illusion: We Choose to See
        </motion.h2>
      </motion.div>
    </section>
  );
};

export default HeroSection;

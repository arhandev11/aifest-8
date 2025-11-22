import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import CountdownTimer from '../CountdownTimer';

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Set target date - example: December 31, 2025
  const targetDate = new Date('2025-12-31T00:00:00');

  return (
    <section
      id="countdown"
      ref={ref}
      className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/bg-section-2.jpeg)',
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CountdownTimer targetDate={targetDate} />
      </motion.div>
    </section>
  );
};

export default CountdownSection;

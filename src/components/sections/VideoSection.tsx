import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="video"
      ref={ref}
      className="relative min-h-[50vh] flex items-center justify-center px-6 py-20 bg-black"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Video Placeholder */}
        <div className="bg-white rounded-lg aspect-video flex items-center justify-center">
          <p className="text-gray-400 font-inter text-sm sm:text-base">
            Video Placeholder
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection;

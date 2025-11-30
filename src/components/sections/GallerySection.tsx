import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Gallery items with images and varied sizes for masonry layout
  const galleryItemsMobile = [
    { id: 1, image: '/gallery/1.JPG', span: 'col-span-1 row-span-1' },
    { id: 2, image: '/gallery/2.JPG', span: 'col-span-1 row-span-1' },
    { id: 3, image: '/gallery/3.JPG', span: 'col-span-2 row-span-1' }, // Wide
    { id: 4, image: '/gallery/4.JPG', span: 'col-span-1 row-span-2' }, // Tall
    { id: 5, image: '/gallery/5.JPG', span: 'col-span-1 row-span-1' },
    { id: 6, image: '/gallery/6.JPG', span: 'col-span-1 row-span-1' },
    { id: 7, image: '/gallery/7.JPG', span: 'col-span-2 row-span-1' }, // Wide
    { id: 8, image: '/gallery/8.JPG', span: 'col-span-1 row-span-1' },
    { id: 9, image: '/gallery/9.JPG', span: 'col-span-1 row-span-1' },
  ];

  const galleryItemsDesktop = [
    { id: 1, image: '/gallery/1.JPG', span: 'col-span-1 row-span-1' },
    { id: 2, image: '/gallery/2.JPG', span: 'col-span-1 row-span-1' },
    { id: 3, image: '/gallery/3.JPG', span: 'col-span-1 row-span-1' },
    { id: 4, image: '/gallery/4.JPG', span: 'col-span-1 row-span-1' },
    { id: 5, image: '/gallery/5.JPG', span: 'col-span-2 row-span-1' }, // Wide
    { id: 6, image: '/gallery/6.JPG', span: 'col-span-1 row-span-2' }, // Tall
    { id: 7, image: '/gallery/7.JPG', span: 'col-span-1 row-span-1' },
    { id: 8, image: '/gallery/8.JPG', span: 'col-span-2 row-span-1' }, // Wide
    { id: 9, image: '/gallery/9.JPG', span: 'col-span-1 row-span-1' },
  ];

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black"
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-16 text-center tracking-widest"
        style={{ fontFamily: 'var(--font-family-sansita)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        GALLERY AIFEST
      </motion.h2>

      <div className="max-w-7xl mx-auto w-full">
        {/* Mobile Layout */}
        <div className="md:hidden grid grid-cols-2 auto-rows-[180px] gap-3">
          {galleryItemsMobile.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative ${item.span} rounded-2xl overflow-hidden border border-festival-gold/20 group cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gallery Image */}
              <img
                src={item.image}
                alt={`Gallery ${item.id}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-festival-gold/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-festival-gold/10 rounded-tr-full transform -translate-x-10 translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-300"></div>

              {/* Hover Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-festival-gold/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-4 auto-rows-[200px] gap-4">
          {galleryItemsDesktop.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative ${item.span} rounded-2xl overflow-hidden border border-festival-gold/20 group cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gallery Image */}
              <img
                src={item.image}
                alt={`Gallery ${item.id}`}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-festival-gold/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-festival-gold/10 rounded-tr-full transform -translate-x-10 translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-300"></div>

              {/* Hover Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-festival-gold/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default GallerySection;

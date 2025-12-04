import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Gallery items with images and varied sizes for masonry layout
  const galleryItemsMobile = [
    { id: 1, image: '/gallery/Bazar.JPG', title: 'Bazar', span: 'col-span-1 row-span-1' },
    { id: 2, image: '/gallery/Lomba Cerdas Cermat.jpeg', title: 'Lomba Cerdas Cermat', span: 'col-span-1 row-span-1' },
    { id: 3, image: '/gallery/Lomba Esai.jpeg', title: 'Lomba Esai', span: 'col-span-2 row-span-1' }, // Wide
    { id: 4, image: '/gallery/Lomba Hadits Arba_in.jpeg', title: 'Lomba Hadits Arba\'in', span: 'col-span-1 row-span-2' }, // Tall
    { id: 5, image: '/gallery/MHQ.jpeg', title: 'MHQ', span: 'col-span-1 row-span-1' },
    { id: 6, image: '/gallery/Peduli Sosial.jpeg', title: 'Peduli Sosial', span: 'col-span-1 row-span-1' },
    { id: 7, image: '/gallery/Tabligh Akbar.JPG', title: 'Tabligh Akbar', span: 'col-span-2 row-span-1' }, // Wide
    { id: 8, image: '/gallery/Tabligh Akbar(1).JPG', title: 'Tabligh Akbar', span: 'col-span-1 row-span-1' },
    { id: 9, image: '/gallery/Tabligh Akbar(2).JPG', title: 'Tabligh Akbar', span: 'col-span-1 row-span-1' },
  ];

  const galleryItemsDesktop = [
    { id: 1, image: '/gallery/Bazar.JPG', title: 'Bazar', span: 'col-span-1 row-span-1' },
    { id: 2, image: '/gallery/Lomba Cerdas Cermat.jpeg', title: 'Lomba Cerdas Cermat', span: 'col-span-1 row-span-1' },
    { id: 3, image: '/gallery/Lomba Esai.jpeg', title: 'Lomba Esai', span: 'col-span-1 row-span-1' },
    { id: 4, image: '/gallery/Lomba Hadits Arba_in.jpeg', title: 'Lomba Hadits Arba\'in', span: 'col-span-1 row-span-1' },
    { id: 5, image: '/gallery/MHQ.jpeg', title: 'MHQ', span: 'col-span-2 row-span-1' }, // Wide
    { id: 6, image: '/gallery/Peduli Sosial.jpeg', title: 'Peduli Sosial', span: 'col-span-1 row-span-2' }, // Tall
    { id: 7, image: '/gallery/Tabligh Akbar.JPG', title: 'Tabligh Akbar', span: 'col-span-1 row-span-1' },
    { id: 8, image: '/gallery/Tabligh Akbar(1).JPG', title: 'Tabligh Akbar', span: 'col-span-2 row-span-1' }, // Wide
    { id: 9, image: '/gallery/Tabligh Akbar(2).JPG', title: 'Tabligh Akbar', span: 'col-span-1 row-span-1' },
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
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-festival-gold/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-festival-gold/10 rounded-tr-full transform -translate-x-10 translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-300"></div>

              {/* Hover Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* Floating Title Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-40">
                <p className="text-white text-sm font-semibold text-center drop-shadow-lg bg-black/50 rounded-lg py-2 px-3" style={{ fontFamily: 'var(--font-family-lora)' }}>
                  {item.title}
                </p>
              </div>

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
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-festival-gold/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-festival-gold/10 rounded-tr-full transform -translate-x-10 translate-y-10 group-hover:-translate-x-8 group-hover:translate-y-8 transition-transform duration-300"></div>

              {/* Hover Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>

              {/* Floating Title Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 z-40">
                <p className="text-white text-sm font-semibold text-center drop-shadow-lg bg-black/50 rounded-lg py-2 px-3" style={{ fontFamily: 'var(--font-family-lora)' }}>
                  {item.title}
                </p>
              </div>

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

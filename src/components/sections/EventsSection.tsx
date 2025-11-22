import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const events = [
  {
    id: 1,
    name: 'SEMINAR',
    date: '32 November 2026',
    contact: 'Contact Person',
  },
  {
    id: 2,
    name: 'SEMINAR',
    date: '32 November 2026',
    contact: 'Contact Person',
  },
  {
    id: 3,
    name: 'SEMINAR',
    date: '32 November 2026',
    contact: 'Contact Person',
  },
  {
    id: 4,
    name: 'SEMINAR',
    date: '32 November 2026',
    contact: 'Contact Person',
  },
];

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeEvents, setActiveEvents] = useState<Set<number>>(new Set());

  const toggleEvent = (id: number) => {
    setActiveEvents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section
      id="events"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black"
    >
      <motion.h2
        className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-12 text-center tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        EVENTS
      </motion.h2>

      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {events.map((event, index) => {
            const isActive = activeEvents.has(event.id);

            return (
              <motion.div
                key={event.id}
                onClick={() => toggleEvent(event.id)}
                className={`relative rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 cursor-pointer transition-all duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-[#5a6b4a] via-[#4a5a3a] to-[#3a4a2a] shadow-[0_0_60px_rgba(134,239,172,0.4)]'
                    : 'bg-gradient-to-br from-[#1a2815] via-[#0f1a0a] to-[#0a1205]'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Glow effect when active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/20 to-green-600/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                <div className="relative z-10">
                  {/* Event Name */}
                  <h3 className={`font-inter text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-wider transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-[#2a3a1a]'
                  }`}>
                    {event.name}
                  </h3>

                  {/* Event Date */}
                  <p className={`font-inter text-center text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 transition-colors duration-500 ${
                    isActive ? 'text-white/90' : 'text-[#2a3a1a]'
                  }`}>
                    {event.date}
                  </p>

                  {/* Register Button */}
                  <motion.button
                    className={`w-full max-w-xs mx-auto block font-inter font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl lg:text-2xl tracking-wider transition-all duration-500 ${
                      isActive
                        ? 'bg-[#f5f5dc] text-[#2a3a1a] shadow-lg'
                        : 'bg-[#1a2815] text-[#3a4a2a]'
                    }`}
                    whileHover={isActive ? { scale: 1.05, y: -2 } : {}}
                    whileTap={isActive ? { scale: 0.95 } : {}}
                  >
                    Daftar
                  </motion.button>

                  {/* Contact Person */}
                  <p className={`font-inter text-center text-base sm:text-lg md:text-xl mt-6 sm:mt-8 transition-colors duration-500 ${
                    isActive ? 'text-[#2a3a1a]' : 'text-[#2a3a1a]'
                  }`}>
                    {event.contact}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const guestStars = [
  "Penceramah",
  "Pembina Yayasan Al Kholil bin ahmad al-farohidi terletak di Kota Bandung",
  "Pembina Rumah Qur'an Maryam Binti Imran",
];

const GuestStarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <section
      id="guest-stars"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black overflow-hidden"
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-16 text-center tracking-widest"
        style={{ fontFamily: 'var(--font-family-sansita)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        GUEST STARS
      </motion.h2>

      <div className="flex flex-col items-center w-full">
        {/* Interactive Card */}
        <motion.div
          className="relative w-full max-w-xl aspect-square cursor-pointer bg-black/50 rounded-3xl overflow-visible"
          onClick={() => setIsRevealed(!isRevealed)}
          initial={{ scale: 0.9, opacity: 1 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 1 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Base background layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/40 rounded-3xl z-0" />

          {/* Fog/Mist Background */}
          <motion.div
            className="absolute -inset-10 z-10 pointer-events-none overflow-hidden"
            style={{ opacity: isRevealed ? 0 : 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/assets/kabut.png"
              alt="Mist"
              className="w-full h-full object-cover scale-125"
            />
          </motion.div>

          {/* Leaf Decorations - Top Left */}
          <motion.img
            src="/assets/leaf.png"
            alt="Leaf decoration"
            className="absolute -top-16 -left-16 w-64 sm:w-72 md:w-80 z-20 pointer-events-none"
            initial={{ rotate: 10, x: 0, y: 0, scale: 1 }}
            animate={{
              rotate: isRevealed ? 0 : 10,
              x: isRevealed ? -30 : 0,
              y: isRevealed ? -30 : 0,
              scale: isRevealed ? 0.7 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Leaf Decorations - Top Right */}
          <motion.img
            src="/assets/leaf.png"
            alt="Leaf decoration"
            className="absolute -top-16 -right-16 w-64 sm:w-72 md:w-80 z-20 pointer-events-none transform scale-x-[-1]"
            initial={{ rotate: -10, x: 0, y: 0, scale: 1 }}
            animate={{
              rotate: isRevealed ? 0 : -10,
              x: isRevealed ? 30 : 0,
              y: isRevealed ? -30 : 0,
              scale: isRevealed ? 0.7 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Leaf Decorations - Bottom Left */}
          <motion.img
            src="/assets/leaf.png"
            alt="Leaf decoration"
            className="absolute -bottom-16 -left-16 w-64 sm:w-72 md:w-80 z-20 pointer-events-none transform scale-y-[-1]"
            initial={{ rotate: -10, x: 0, y: 0, scale: 1 }}
            animate={{
              rotate: isRevealed ? 0 : -10,
              x: isRevealed ? -30 : 0,
              y: isRevealed ? 30 : 0,
              scale: isRevealed ? 0.7 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Leaf Decorations - Bottom Right */}
          <motion.img
            src="/assets/leaf.png"
            alt="Leaf decoration"
            className="absolute -bottom-16 -right-16 w-64 sm:w-72 md:w-80 z-20 pointer-events-none transform scale-x-[-1] scale-y-[-1]"
            initial={{ rotate: 10, x: 0, y: 0, scale: 1 }}
            animate={{
              rotate: isRevealed ? 0 : 10,
              x: isRevealed ? 30 : 0,
              y: isRevealed ? 30 : 0,
              scale: isRevealed ? 0.7 : 1,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.p
                  key="prompt"
                  className="font-inter text-white text-lg sm:text-xl md:text-2xl font-bold text-center z-30 px-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  Klik untuk melihat
                  <br />
                  guest star
                </motion.p>
              ) : (
                <motion.div
                  key="revealed"
                  className="relative w-[70%] aspect-square"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {/* White Circle */}
                  <div className="absolute inset-0 bg-white rounded-full shadow-2xl z-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Guest Stars List - Below the circle */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              className="mt-8 max-w-md w-full px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ul className="text-white text-left space-y-3 text-sm sm:text-base">
                {guestStars.map((star, index) => (
                  <motion.li
                    key={index}
                    style={{ fontFamily: 'var(--font-family-lora)' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    • {star}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GuestStarsSection;

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const seminarSpeakers = [
  {
    name: "Dr. Daris Tamin, M.Pd.",
    honorific: "Pemateri",
    schedule: "Sabtu, 2 Mei 2026 | 09.30 WIB",
    image: "/content/pengisi-seminar/DR. DARIS TAMIN, M.png",
  },
];

const SpeakerCard = ({ speaker, delay }: { speaker: typeof seminarSpeakers[number]; delay: number }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Interactive Card */}
      <div
        className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 cursor-pointer overflow-visible"
        onClick={() => setIsRevealed(!isRevealed)}
      >
        {/* Fog/Mist Background */}
        <motion.div
          className="absolute -inset-16 z-10 pointer-events-none overflow-hidden"
          animate={{ opacity: isRevealed ? 0 : 0.9 }}
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
          className="absolute -top-16 -left-16 w-48 sm:w-56 md:w-64 z-20 pointer-events-none"
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
          className="absolute -top-16 -right-16 w-48 sm:w-56 md:w-64 z-20 pointer-events-none transform scale-x-[-1]"
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
          className="absolute -bottom-16 -left-16 w-48 sm:w-56 md:w-64 z-20 pointer-events-none transform scale-y-[-1]"
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
          className="absolute -bottom-16 -right-16 w-48 sm:w-56 md:w-64 z-20 pointer-events-none transform scale-x-[-1] scale-y-[-1]"
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
                className="font-inter text-white text-base sm:text-lg font-bold text-center z-30 px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                Klik untuk melihat
              </motion.p>
            ) : (
              <motion.div
                key="revealed"
                className="relative w-[75%] aspect-square"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-festival-gold/60 shadow-lg shadow-festival-gold/10">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Info - Below the card */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="mt-6 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3
              className="text-white text-lg sm:text-xl font-bold mb-1"
              style={{ fontFamily: "var(--font-family-sansita)" }}
            >
              {speaker.name}
            </h3>
            <p
              className="text-festival-gold/80 text-sm italic mb-3"
              style={{ fontFamily: "var(--font-family-lora)" }}
            >
              {speaker.honorific}
            </p>
            <p
              className="text-gray-400 text-sm"
              style={{ fontFamily: "var(--font-family-lora)" }}
            >
              {speaker.schedule}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SeminarSpeakersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="seminar-speakers"
      ref={ref}
      className="relative flex flex-col items-center px-6 py-20 bg-black overflow-hidden"
    >
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-16 text-center tracking-widest"
        style={{ fontFamily: "var(--font-family-sansita)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        PENGISI SEMINAR
      </motion.h2>

      <div className="flex flex-col gap-28 w-full items-center">
        {seminarSpeakers.map((speaker, index) => (
          <SpeakerCard key={index} speaker={speaker} delay={0.2 + index * 0.15} />
        ))}
      </div>
    </section>
  );
};

export default SeminarSpeakersSection;

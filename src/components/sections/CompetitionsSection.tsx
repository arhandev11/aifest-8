import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { competitions } from "@/types/competition";

const CompetitionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [litLanterns, setLitLanterns] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const handleLanternClick = (id: number) => {
    setLitLanterns((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRegistrationClick = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    navigate(`/daftar/${slug}`);
  };

  return (
    <section
      id="competitions"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black"
    >
      <motion.h2
        className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-12 text-center tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        COMPETITIONS
      </motion.h2>

      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {competitions.map((competition, index) => (
            <motion.div
              key={competition.id}
              className="relative flex flex-col items-center cursor-pointer group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleLanternClick(competition.id)}
            >
              {/* Lantern Image with Text Overlay */}
              <div className="relative w-full aspect-square max-w-[300px] mx-auto mb-4">
                {/* Competition Name - Positioned on top of lantern */}
                <div className="absolute top-[23%] left-1/2 -translate-x-1/2 z-10 text-center w-48 mx-auto">
                  <h3
                    className={`font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                      litLanterns.has(competition.id)
                        ? "text-lg sm:text-xl md:text-2xl text-white"
                        : "text-lg sm:text-xl md:text-2xl text-black"
                    }`}
                    style={{ fontFamily: 'var(--font-family-fraunces)' }}
                  >
                    {competition.name}
                  </h3>
                </div>

                {/* Text below competition name */}
                <div className="absolute top-[44%] left-1/2 -translate-x-1/2 z-10 text-center w-full px-2">
                  {competition.isFull ? (
                    <p className="font-inter font-bold text-sm sm:text-base md:text-lg text-red-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Registration is full
                    </p>
                  ) : litLanterns.has(competition.id) ? (
                    <div className="space-y-2">
                      {competition.rulebook && (
                        <a
                          href={competition.rulebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block font-inter font-bold text-base sm:text-lg md:text-xl text-amber-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-amber-700 transition-colors duration-200 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          File
                        </a>
                      )}
                      <p
                        className="font-inter font-bold text-base sm:text-lg md:text-xl text-orange-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-orange-400 transition-colors duration-200 cursor-pointer"
                        onClick={(e) => handleRegistrationClick(e, competition.slug)}
                      >
                        Registration
                      </p>
                    </div>
                  ) : (
                    <p className="font-bold text-sm sm:text-base md:text-lg text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-pre-line" style={{ fontFamily: 'var(--font-family-lora)' }}>
                      Tap to light{"\n"}the lantern!
                    </p>
                  )}
                </div>

                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/assets/lentera.png"
                    alt={`${competition.name} Lantern`}
                    className={`w-full h-full object-contain transition-all duration-300`}
                  />
                </div>

                {/* Dark overlay for off state */}
                {!litLanterns.has(competition.id) && (
                  <div className="absolute inset-0 bg-black/60 rounded-full pointer-events-none"></div>
                )}

                {/* Glow effect when lit */}
                {litLanterns.has(competition.id) && (
                  <motion.div
                    className="absolute inset-0 bg-festival-gold/30 rounded-full blur-2xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default CompetitionsSection;

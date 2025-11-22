import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const timelineData = [
  { text: "Open Registration", date: "5 Desember 2025" },
  { text: "Close Registration", date: "25 April 2025" },
  { text: "Technical Meeting", date: "28 April 2025" },
  { text: "Opening Ceremony", date: "2 Mei 2025" },
  { text: "Pelaksanaan Lomba", date: "2-3 Mei 2025" },
  { text: "Closing Ceremony", date: "3 Mei 2025" },
];

const TimelineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 bg-black"
      style={{
        backgroundImage: "url(/assets/bg-timeline.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "150%",
        backgroundPosition: "center",
      }}
    >
      <motion.h2
        className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-16 text-center tracking-widest"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        TIMELINE
      </motion.h2>

      {/* Horizontal Scrollable Container */}
      <div className="w-full overflow-x-auto scrollbar-hide py-12 px-16">
        <motion.div
          className="relative min-w-max h-[350px] px-8"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Straight Timeline Line - in the middle */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-festival-gold -translate-y-1/2"></div>

          {/* Timeline Items */}
          <div className="flex gap-16 md:gap-40 h-full pl-4 pr-4">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className="relative min-w-[220px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {/* Event Card - Above the line for even, below for odd */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                      [isEven ? "bottom" : "top"]: "55%",
                    }}
                  >
                    <div className="border-2 border-festival-gold rounded-xl bg-black/80 backdrop-blur-sm px-6 py-4 min-w-[200px]">
                      <p className="font-inter text-white text-sm sm:text-base mb-1 text-center font-medium">
                        {item.text}
                      </p>
                      <p className="font-inter text-festival-light-gold text-xs sm:text-sm text-center">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot - positioned ON the line */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white z-10 shadow-lg"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sponsors = [
  { name: "Felancy", image: "/content/sponsored-by/LOGO FLC.png" },
  { name: "Dafi Pizza", image: "/content/sponsored-by/WhatsApp Image 2026-01-10 at 17.00.30.jpeg" },
  { name: "Sari Roti", image: "/content/sponsored-by/Logo-Sari-Roti Hires.png" },
  { name: "AFI Design", image: "/content/sponsored-by/afi design.jpg.jpeg" },
  { name: "Marchee", image: "/content/sponsored-by/Marchee Logo 1_1.png" },
  { name: "Muslim Life Fest", image: "/content/sponsored-by/Logo Muslim Life Fest.png" },
  { name: "Sponsor", image: "/content/sponsored-by/IMG_5213.PNG" },
  { name: "Sponsor", image: "/content/sponsored-by/IMG_1047.JPG" },
  { name: "Sponsor", image: "/content/sponsored-by/WhatsApp Image 2026-01-11 at 20.17.04.jpeg" },
  { name: "Sponsor", image: "/content/sponsored-by/WhatsApp Image 2026-01-12 at 17.08.37.jpeg" },
];

const mediaPartners = {
  Platinum: [
    { name: "Daar Assunah", image: "/content/media-part/Platinum/logo daar assunah.PNG" },
    { name: "Sahijra", image: "/content/media-part/Platinum/logo sahijra .png" },
    { name: "Wlingi Mengaji", image: "/content/media-part/Platinum/Logo Wlingi Mengaji.jpg" },
  ],
  Gold: [
    { name: "Farhun Najah", image: "/content/media-part/Gold/Logo Farhun Najah.jpg" },
    { name: "Majelis Ilmu Bogor", image: "/content/media-part/Gold/Logo Majelis Ilmu Bogor.jpg" },
    { name: "Safari Dakwah", image: "/content/media-part/Gold/logo safari dakwah (2).png" },
  ],
  Silver: [
    { name: "Arabiyyah With Us", image: "/content/media-part/Silver/Logo Arabiyyah With Us.jpg" },
    { name: "Coretan Hijau", image: "/content/media-part/Silver/logo coretan hijau.png" },
    { name: "Hawary Academy", image: "/content/media-part/Silver/Logo Hawary Academy.png" },
    { name: "KMPI", image: "/content/media-part/Silver/LOGO KMPI.jpg" },
    { name: "Salaful Muslimah", image: "/content/media-part/Silver/logo salaful muslimah.png" },
    { name: "Sciou Indonesia", image: "/content/media-part/Silver/Logo sciouindonesia.jpg" },
    { name: "ShahihTV", image: "/content/media-part/Silver/Logo ShahihTV.png" },
    { name: "Simal Indonesia", image: "/content/media-part/Silver/logo simal.imdonesia.png" },
    { name: "Udrus Akhwat", image: "/content/media-part/Silver/logo udrus akhwat_.jpg" },
  ],
};

const supportedBy = [
  { name: "Palang Merah Indonesia", image: "/content/supported-by/seminar (3).png" },
];

const LogoGrid = ({
  items,
  delay = 0,
}: {
  items: { name: string; image: string }[];
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap justify-center gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl p-2 flex items-center justify-center shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, delay: delay + index * 0.05 }}
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

const SponsorsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="sponsors"
      ref={ref}
      className="relative flex flex-col items-center px-6 py-20 bg-black overflow-hidden"
    >
      {/* Sponsored By */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-12 text-center tracking-widest"
        style={{ fontFamily: "var(--font-family-sansita)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        SPONSORED BY
      </motion.h2>
      <div className="max-w-3xl w-full mb-20">
        <LogoGrid items={sponsors} delay={0.2} />
      </div>

      {/* Media Partner */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-12 text-center tracking-widest"
        style={{ fontFamily: "var(--font-family-sansita)" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        MEDIA PARTNER
      </motion.h2>
      <div className="max-w-3xl w-full mb-20 space-y-10">
        {/* Platinum */}
        <div>
          <motion.p
            className="text-center text-white/70 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-family-lora)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Platinum
          </motion.p>
          <LogoGrid items={mediaPartners.Platinum} delay={0.1} />
        </div>

        {/* Gold */}
        <div>
          <motion.p
            className="text-center text-festival-gold/70 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-family-lora)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Gold
          </motion.p>
          <LogoGrid items={mediaPartners.Gold} delay={0.1} />
        </div>

        {/* Silver */}
        <div>
          <motion.p
            className="text-center text-gray-400 text-sm tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-family-lora)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Silver
          </motion.p>
          <LogoGrid items={mediaPartners.Silver} delay={0.1} />
        </div>
      </div>

      {/* Supported By */}
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-12 text-center tracking-widest"
        style={{ fontFamily: "var(--font-family-sansita)" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        SUPPORTED BY
      </motion.h2>
      <div className="max-w-3xl w-full">
        <LogoGrid items={supportedBy} delay={0.2} />
      </div>
    </section>
  );
};

export default SponsorsSection;

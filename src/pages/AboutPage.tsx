import { motion } from 'framer-motion';
import { Camera, Play, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialMedia = [
  { name: '@ai.fest', platform: 'Instagram', url: 'https://instagram.com/ai.fest', icon: Camera },
  { name: '@staiaisyah', platform: 'Instagram', url: 'https://instagram.com/staiaisyah', icon: Camera },
  { name: '@bemstaiaisyah', platform: 'Instagram', url: 'https://instagram.com/bemstaiaisyah', icon: Camera },
  { name: 'STAI Aisyah binti Abu Bakar', platform: 'Youtube', url: 'https://youtube.com/@STAIAisyahbintiAbuBakar', icon: Play },
];

const contactPersons = [
  { name: 'Putri', role: 'Divisi Lomba', phone: '0812-9141-8112', whatsapp: '6281291418112' },
  { name: 'Amira', role: 'Divisi Lomba', phone: '0821-6945-0528', whatsapp: '6282169450528' },
  { name: 'Rusaifah', role: 'Media Partners', phone: '0852-1002-2201', whatsapp: '6285210022201' },
  { name: 'Bazar', role: 'Tenants', phone: '0857-1598-7008', whatsapp: '6285715987008' },
  { name: 'Layla', role: 'Sponsors', phone: '0811-1001-7706', whatsapp: '6281110017706' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/assets/bg-section-1.png)" }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: "url(/assets/sparkle-bg-1.png)" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-6 py-20">
        {/* Back to Home */}
        <motion.div
          className="max-w-6xl mx-auto mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-festival-gold hover:text-festival-light-gold transition-colors"
            style={{ fontFamily: "var(--font-family-lora)" }}
          >
            <span>&larr;</span>
            <span>Kembali ke Beranda</span>
          </Link>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl text-white font-bold text-center mb-16 tracking-widest"
          style={{ fontFamily: "var(--font-family-sansita)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT US
        </motion.h1>

        <div className="max-w-6xl mx-auto grid gap-12">
          {/* Social Media Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-2xl sm:text-3xl text-festival-gold font-bold mb-6 text-center"
              style={{ fontFamily: "var(--font-family-sansita)" }}
            >
              Sosial Media
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/60 backdrop-blur-sm border border-festival-gold/30 rounded-xl p-5 flex items-center gap-4 hover:bg-black/80 hover:border-festival-gold/60 transition-all group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-3 bg-festival-gold/20 rounded-full group-hover:bg-festival-gold/30 transition-colors">
                    <social.icon className="w-6 h-6 text-festival-gold" />
                  </div>
                  <div>
                    <p
                      className="text-white font-medium"
                      style={{ fontFamily: "var(--font-family-lora)" }}
                    >
                      {social.name}
                    </p>
                    <p className="text-gray-400 text-sm">{social.platform}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Contact Person Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2
              className="text-2xl sm:text-3xl text-festival-gold font-bold mb-6 text-center"
              style={{ fontFamily: "var(--font-family-sansita)" }}
            >
              Contact Person
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contactPersons.map((contact, index) => (
                <motion.a
                  key={index}
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/60 backdrop-blur-sm border border-festival-gold/30 rounded-xl p-5 hover:bg-black/80 hover:border-festival-gold/60 transition-all group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-600/20 rounded-full group-hover:bg-green-600/30 transition-colors">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p
                        className="text-white font-semibold"
                        style={{ fontFamily: "var(--font-family-lora)" }}
                      >
                        {contact.name}
                      </p>
                      <p className="text-festival-gold text-sm mb-1">
                        {contact.role}
                      </p>
                      <p className="text-gray-400 text-sm">{contact.phone}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Location Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2
              className="text-2xl sm:text-3xl text-festival-gold font-bold mb-6 text-center"
              style={{ fontFamily: "var(--font-family-sansita)" }}
            >
              Location
            </h2>
            <a
              href="https://share.google/JEaIC2LZqFNidTRbI"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                className="bg-black/60 backdrop-blur-sm border border-festival-gold/30 rounded-xl p-6 max-w-2xl mx-auto hover:bg-black/80 hover:border-festival-gold/60 transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-600/20 rounded-full">
                    <MapPin className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p
                      className="text-white font-semibold mb-2"
                      style={{ fontFamily: "var(--font-family-lora)" }}
                    >
                      STAI Aisyah binti Abu Bakar
                    </p>
                    <p
                      className="text-gray-300 leading-relaxed"
                      style={{ fontFamily: "var(--font-family-lora)" }}
                    >
                      Jl Jami, RT.03/RW.04, Sukajaya, Tamansari, Sukajaya, Kec.
                      Tamansari, Kabupaten Bogor, Jawa Barat 16610
                    </p>
                  </div>
                </div>
              </motion.div>
            </a>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

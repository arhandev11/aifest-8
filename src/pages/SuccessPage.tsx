import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/GY6eTnzZxU8DIlbeHZEil4';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: 'url(/assets/bg-hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <motion.div
          className="max-w-lg w-full bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-festival-gold/30 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-family-sansita)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Pendaftaran Berhasil!
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-gray-300 mb-8"
            style={{ fontFamily: 'var(--font-family-lora)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Terima kasih telah mendaftar di AIFest 8.0. Silakan bergabung ke grup WhatsApp untuk informasi lebih lanjut.
          </motion.p>

          {/* WhatsApp Button */}
          <motion.a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors mb-6 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MessageCircle className="w-6 h-6" />
            <span>Gabung Grup WhatsApp</span>
          </motion.a>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-festival-gold hover:text-festival-light-gold transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Kembali ke Beranda</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;

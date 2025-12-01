import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { competitions } from '@/types/competition';
import IndividualForm from '@/components/forms/IndividualForm';
import GroupForm from '@/components/forms/GroupForm';

const RegistrationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const competition = competitions.find(c => c.slug === slug);

  if (!competition) {
    return (
      <div className="min-h-screen bg-festival-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Lomba tidak ditemukan</h1>
          <Link to="/" className="text-festival-gold hover:text-festival-light-gold">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  if (competition.isFull) {
    return (
      <div className="min-h-screen bg-festival-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Pendaftaran {competition.name} sudah penuh</h1>
          <Link to="/" className="text-festival-gold hover:text-festival-light-gold">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background - same as HeroSection */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/bg-section-1.png)' }}
      />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: 'url(/assets/sparkle-bg-1.png)' }}
      />
      <div className="fixed inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-festival-gold transition-colors mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'var(--font-family-lora)' }}>Kembali</span>
          </motion.button>

          {/* Form Card */}
          <motion.div
            className="bg-black/70 backdrop-blur-md rounded-3xl border border-festival-gold/30 p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl text-festival-gold font-bold mb-2"
                style={{ fontFamily: 'var(--font-family-sansita)' }}
              >
                Pendaftaran {competition.name}
              </h1>
              <p
                className="text-white/70 text-sm sm:text-base"
                style={{ fontFamily: 'var(--font-family-lora)' }}
              >
                {competition.description}
              </p>
              {competition.rulebook && (
                <a
                  href={competition.rulebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-festival-gold hover:text-festival-light-gold underline text-sm"
                  style={{ fontFamily: 'var(--font-family-lora)' }}
                >
                  Lihat Rulebook
                </a>
              )}
            </div>

            {/* Form */}
            {competition.type === 'individual' ? (
              <IndividualForm competition={competition} />
            ) : (
              <GroupForm competition={competition} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

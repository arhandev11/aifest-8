import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface License {
  name: string;
  copyright: string;
  license: string;
  url: string;
}

const licenses: License[] = [
  { name: 'React', copyright: 'Meta Platforms, Inc. and affiliates', license: 'MIT', url: 'https://github.com/facebook/react' },
  { name: 'React Router DOM', copyright: 'Remix Software Inc.', license: 'MIT', url: 'https://github.com/remix-run/react-router' },
  { name: 'Framer Motion', copyright: 'Framer B.V.', license: 'MIT', url: 'https://github.com/framer/motion' },
  { name: 'Radix UI', copyright: 'WorkOS', license: 'MIT', url: 'https://github.com/radix-ui/primitives' },
  { name: 'TanStack React Table', copyright: 'Tanner Linsley', license: 'MIT', url: 'https://github.com/TanStack/table' },
  { name: 'Lucide React', copyright: 'Lucide Contributors', license: 'ISC', url: 'https://github.com/lucide-icons/lucide' },
  { name: 'Tailwind CSS', copyright: 'Tailwind Labs, Inc.', license: 'MIT', url: 'https://github.com/tailwindlabs/tailwindcss' },
  { name: 'Tailwind Merge', copyright: 'Dany Castillo', license: 'MIT', url: 'https://github.com/dcastil/tailwind-merge' },
  { name: 'clsx', copyright: 'Luke Edwards', license: 'MIT', url: 'https://github.com/lukeed/clsx' },
  { name: 'class-variance-authority', copyright: 'Joe Bell', license: 'Apache-2.0', url: 'https://github.com/joe-bell/cva' },
  { name: 'SheetJS (xlsx)', copyright: 'SheetJS LLC', license: 'Apache-2.0', url: 'https://github.com/SheetJS/sheetjs' },
  { name: 'FileSaver.js', copyright: 'Eli Grey', license: 'MIT', url: 'https://github.com/eligrey/FileSaver.js' },
  { name: 'Vite', copyright: 'Evan You and Vite Contributors', license: 'MIT', url: 'https://github.com/vitejs/vite' },
];

interface LicensesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LicensesModal = ({ isOpen, onClose }: LicensesModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border border-festival-gold/30 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-festival-gold/20">
                <h2
                  className="text-2xl font-bold text-festival-gold"
                  style={{ fontFamily: 'var(--font-family-sansita)' }}
                >
                  Tentang Aplikasi
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p
                  className="text-gray-300 mb-6"
                  style={{ fontFamily: 'var(--font-family-lora)' }}
                >
                  Aplikasi AIFest 8.0 dibangun menggunakan teknologi open source berikut. Kami berterima kasih kepada para pengembang dan pengelola proyek-proyek ini.
                </p>

                <div className="space-y-4">
                  {licenses.map((lib) => (
                    <div
                      key={lib.name}
                      className="bg-black/40 border border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-white font-semibold">{lib.name}</h3>
                          <p className="text-gray-400 text-sm mt-1">
                            Copyright (c) {lib.copyright}
                          </p>
                          <span className="inline-block mt-2 px-2 py-1 bg-festival-gold/20 text-festival-gold text-xs rounded">
                            {lib.license}
                          </span>
                        </div>
                        <a
                          href={lib.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-festival-gold transition-colors"
                          title="View on GitHub"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <a
                    href="/LICENSES.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-festival-gold hover:text-festival-light-gold transition-colors text-sm flex items-center gap-2"
                  >
                    <ExternalLink size={14} />
                    Lihat teks lisensi lengkap
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const useLicensesModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    openLicenses: () => setIsOpen(true),
    closeLicenses: () => setIsOpen(false),
  };
};

export default LicensesModal;

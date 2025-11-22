import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Apa itu AiFest?',
    answer:
      'Aisyah Festival merupakan ajang festival yang diselenggarakan oleh BEM STAI Aisyah binti Abu Bakar setiap tahunnya. Acara ini berlangsung selama dua hari.',
  },
  {
    question: 'Kegiatan apa saja yang ada di Aifest?',
    answer:
      'Didalam acara Aisyah Festival, terdapat berbagai macam lomba juga kegiatan bermanfaat lainnya seperti tabligh akbar, seminar, pengobatan gratis, donor darah, bakti sosial dan lainnya.',
  },
  {
    question: 'Siapa saja yang pernah ikut memeriahkan AiFest?',
    answer:
      'Dalam salah satu kegiatan AiFest yaitu Tabligh Akbar, kami pernah mengundang ustadz-ustadz kibar seperti Ustadz Erwandi Tarmizi Anwar, Ustadz Khalid Basalamah, Ustadz Firanda Andirja, Ustadz Subhan Bawazier, Ustadz Abu Qatadah, Ustadz Harits Abu Naufal, dan Ustadz Zainal Abidin',
  },
  {
    question: 'Perlombaan apa saja yang ada di AiFest?',
    answer:
      'AiFest menyelenggarakan berbagai macam lomba, seperti lomba MHQ kategori 5, 10, 20, dan 30 Juz, Pidato, Ilqo Syi\'ir, Karya Ilmiah, Kaligrafi, Video Kreatif dan Sparkling Idea.',
  },
  {
    question: 'Siapa saja yang bisa mengikuti lomba di AiFest ini?',
    answer:
      'Lomba AiFest dapat diikuti oleh seluruh siswi-siswi jenjang SMP/MTs, SMA/MA/SMK, hingga mahasiswi perguruan tinggi.',
  },
  {
    question: 'Bagaimana cara mendaftar?',
    answer:
      'Peserta bisa langsung mendaftar lewat Website Official AiFest, yaitu <a href="https://aisyahfestival.com" target="_blank" rel="noopener noreferrer" class="text-festival-gold hover:text-festival-light-gold underline">aisyahfestival.com</a>.',
  },
  {
    question: 'Kapan batas waktu pendaftaran?',
    answer:
      'Pendaftaran akan ditutup pada tanggal 25 April 2026.',
  },
  {
    question: 'Mengapa harus ada biaya pendaftaran?',
    answer:
      'Biaya pendaftaran nantinya akan digunakan untuk biaya operasional seperti snack dan merchandise peserta pada hari H dan tidak akan digunakan sebagai dana hadiah.',
  },
  {
    question: 'Bagaimana jika ada pertanyaan lebih lanjut?',
    answer:
      'Jika ada hal-hal yang belum jelas, bisa langsung ditanyakan ke nomor yang tertera di bagian paling bawah website.',
  },
  {
    question: 'Apa saja kebijakan dan peraturan yang perlu diketahui oleh peserta dan sekolah?',
    answer:
      'Lomba AiFest hanya boleh diikuti oleh Muslimah dan sebuah instansi pendidikan hanya boleh mengirim maksimal 5 orang perwakilan untuk setiap cabang lombanya.',
  },
  {
    question: 'Apakah saya boleh menarik kembali karya yang sudah saya kirimkan setelah mendaftar?',
    answer:
      'Tidak, karena karya yang sudah dikirimkan akan menjadi hak panitia.',
  },
  {
    question: 'Bagaimana kriteria karya yang boleh diikutsertakan?',
    answer:
      'Karya yang boleh diikutsertakan haruslah karya orisinil yang baru dibuat dan belum pernah dipublikasikan di laman manapun.',
  },
  {
    question: 'Bagaimana jika peserta mengundurkan diri?',
    answer:
      'Apabila uang sudah dibayar oleh peserta, maka tidak bisa dikembalikan atau direfund.',
  },
  {
    question: 'Apakah peserta yang pernah memenangkan lomba di satu cabang, boleh ikut lagi di cabang lomba yang sama?',
    answer:
      'Peserta yang pernah memenangkan suatu lomba pada AiFest yang lalu, tidak diperbolehkan mendaftar pada cabang lomba yang sama ditahun ini. Juga untuk peserta yang pernah memenangkan juara 1 lomba MHQ 30 juz, tidak diperbolehkan untuk mengikuti berbagai cabang MHQ lainnya pada tahun ini.',
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="faq"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-festival-gold font-bold mb-4 text-center">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="font-inter text-festival-light-gold text-xl sm:text-2xl text-center mb-12">
          FAQs
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AccordionItem
                value={`item-${index}`}
                className="border border-festival-gold/30 rounded-lg px-6 data-[state=open]:border-festival-gold/60 transition-colors duration-300"
              >
                <AccordionTrigger className="font-inter text-white hover:text-festival-gold text-left py-4 text-base sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-white/80 text-sm sm:text-base pb-4">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
};

export default FAQSection;

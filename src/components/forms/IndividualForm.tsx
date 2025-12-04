import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { Competition, IndividualFormData, jenjangOptions } from '@/types/competition';
import { apiFetch } from '@/lib/api';

interface IndividualFormProps {
  competition: Competition;
}

const IndividualForm = ({ competition }: IndividualFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IndividualFormData>({
    nama: '',
    nama_arab: '',
    usia: '',
    jenjang: '',
    instansi: '',
    email: '',
    handphone: '',
    jenis: competition.slug,
    bukti_bayar: null,
    story_1: null,
    story_2: null,
    twibbon: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'usia' ? (value === '' ? '' : parseInt(value)) : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
      }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama.trim()) newErrors.nama = 'Nama wajib diisi';
    if (!formData.nama_arab.trim()) newErrors.nama_arab = 'Nama Arab wajib diisi';
    if (!formData.usia) newErrors.usia = 'Usia wajib diisi';
    if (!formData.jenjang) newErrors.jenjang = 'Jenjang wajib dipilih';
    if (!formData.instansi.trim()) newErrors.instansi = 'Instansi wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.handphone.trim()) newErrors.handphone = 'No. Handphone wajib diisi';
    if (!formData.bukti_bayar) newErrors.bukti_bayar = 'Bukti bayar wajib diupload';
    if (!formData.story_1) newErrors.story_1 = 'Screenshot story Instagram wajib diupload';
    if (!formData.story_2) newErrors.story_2 = 'Screenshot story WhatsApp wajib diupload';
    if (!formData.twibbon) newErrors.twibbon = 'Screenshot twibbon wajib diupload';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('nama', formData.nama);
      submitData.append('nama_arab', formData.nama_arab);
      submitData.append('usia', String(formData.usia));
      submitData.append('jenjang', formData.jenjang);
      submitData.append('instansi', formData.instansi);
      submitData.append('email', formData.email);
      submitData.append('handphone', formData.handphone);
      submitData.append('jenis', formData.jenis);
      if (formData.bukti_bayar) submitData.append('bukti_bayar', formData.bukti_bayar);
      if (formData.story_1) submitData.append('story_1', formData.story_1);
      if (formData.story_2) submitData.append('story_2', formData.story_2);
      if (formData.twibbon) submitData.append('twibbon', formData.twibbon);

      const response = await apiFetch('/api/lomba-individu', {
        method: 'POST',
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const apiErrors: Record<string, string> = {};
          Object.entries(result.errors).forEach(([key, value]) => {
            apiErrors[key] = Array.isArray(value) ? value[0] : String(value);
          });
          setErrors(apiErrors);
        } else {
          setErrors({ submit: result.info || 'Terjadi kesalahan saat mendaftar' });
        }
        return;
      }

      navigate('/success');
    } catch {
      setErrors({ submit: 'Terjadi kesalahan jaringan. Silakan coba lagi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-black/50 border border-festival-gold/30 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-festival-gold transition-colors";
  const labelClasses = "block text-white/90 text-sm mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: 'var(--font-family-lora)' }}>
      {errors.submit && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400 text-sm">
          {errors.submit}
        </div>
      )}

      {/* Nama */}
      <div>
        <label className={labelClasses}>Nama Lengkap *</label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          placeholder="Masukkan nama lengkap"
          className={inputClasses}
        />
        {errors.nama && <p className="text-red-400 text-xs mt-1">{errors.nama}</p>}
      </div>

      {/* Nama Arab */}
      <div>
        <label className={labelClasses}>Nama Arab *</label>
        <input
          type="text"
          name="nama_arab"
          value={formData.nama_arab}
          onChange={handleInputChange}
          placeholder="Masukkan nama dalam bahasa Arab"
          className={inputClasses}
          dir="rtl"
        />
        {errors.nama_arab && <p className="text-red-400 text-xs mt-1">{errors.nama_arab}</p>}
      </div>

      {/* Usia & Jenjang */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Usia *</label>
          <input
            type="number"
            name="usia"
            value={formData.usia}
            onChange={handleInputChange}
            placeholder="Usia"
            min="1"
            max="100"
            className={inputClasses}
          />
          {errors.usia && <p className="text-red-400 text-xs mt-1">{errors.usia}</p>}
        </div>
        <div>
          <label className={labelClasses}>Jenjang *</label>
          <select
            name="jenjang"
            value={formData.jenjang}
            onChange={handleInputChange}
            className={inputClasses}
          >
            <option value="">Pilih Jenjang</option>
            {jenjangOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {errors.jenjang && <p className="text-red-400 text-xs mt-1">{errors.jenjang}</p>}
        </div>
      </div>

      {/* Instansi */}
      <div>
        <label className={labelClasses}>Instansi/Sekolah *</label>
        <input
          type="text"
          name="instansi"
          value={formData.instansi}
          onChange={handleInputChange}
          placeholder="Nama sekolah/instansi"
          className={inputClasses}
        />
        {errors.instansi && <p className="text-red-400 text-xs mt-1">{errors.instansi}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelClasses}>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          className={inputClasses}
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Handphone */}
      <div>
        <label className={labelClasses}>No. Handphone *</label>
        <input
          type="tel"
          name="handphone"
          value={formData.handphone}
          onChange={handleInputChange}
          placeholder="08xxxxxxxxxx"
          className={inputClasses}
        />
        {errors.handphone && <p className="text-red-400 text-xs mt-1">{errors.handphone}</p>}
      </div>

      {/* File Uploads */}
      <div className="space-y-4 pt-2">
        <p className="text-white/70 text-sm border-t border-festival-gold/20 pt-4">Upload Dokumen</p>

        {/* Bukti Bayar */}
        <div>
          <label className={labelClasses}>Bukti Pembayaran *</label>
          <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-festival-gold/30 border-dashed rounded-xl px-4 py-4 hover:border-festival-gold transition-colors">
            <Upload size={20} className="text-festival-gold" />
            <span className="text-white/60 text-sm">
              {formData.bukti_bayar ? formData.bukti_bayar.name : 'Pilih file (jpg, png, pdf)'}
            </span>
            <input
              type="file"
              name="bukti_bayar"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
          </label>
          {errors.bukti_bayar && <p className="text-red-400 text-xs mt-1">{errors.bukti_bayar}</p>}
        </div>

        {/* Story Instagram */}
        <div>
          <label className={labelClasses}>Screenshot Story Instagram *</label>
          <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-festival-gold/30 border-dashed rounded-xl px-4 py-4 hover:border-festival-gold transition-colors">
            <Upload size={20} className="text-festival-gold" />
            <span className="text-white/60 text-sm">
              {formData.story_1 ? formData.story_1.name : 'Pilih file (jpg, png, pdf)'}
            </span>
            <input
              type="file"
              name="story_1"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
          </label>
          {errors.story_1 && <p className="text-red-400 text-xs mt-1">{errors.story_1}</p>}
        </div>

        {/* Story WhatsApp */}
        <div>
          <label className={labelClasses}>Screenshot Story WhatsApp *</label>
          <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-festival-gold/30 border-dashed rounded-xl px-4 py-4 hover:border-festival-gold transition-colors">
            <Upload size={20} className="text-festival-gold" />
            <span className="text-white/60 text-sm">
              {formData.story_2 ? formData.story_2.name : 'Pilih file (jpg, png, pdf)'}
            </span>
            <input
              type="file"
              name="story_2"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
          </label>
          {errors.story_2 && <p className="text-red-400 text-xs mt-1">{errors.story_2}</p>}
        </div>

        {/* Twibbon */}
        <div>
          <label className={labelClasses}>Screenshot Twibbon *</label>
          <label className="flex items-center gap-3 cursor-pointer bg-black/50 border border-festival-gold/30 border-dashed rounded-xl px-4 py-4 hover:border-festival-gold transition-colors">
            <Upload size={20} className="text-festival-gold" />
            <span className="text-white/60 text-sm">
              {formData.twibbon ? formData.twibbon.name : 'Pilih file (jpg, png, pdf)'}
            </span>
            <input
              type="file"
              name="twibbon"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
            />
          </label>
          {errors.twibbon && <p className="text-red-400 text-xs mt-1">{errors.twibbon}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-festival-gold text-black font-bold py-4 px-8 rounded-full text-lg hover:bg-festival-light-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        style={{ fontFamily: 'var(--font-family-sansita)' }}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Mendaftar...
          </>
        ) : (
          'Daftar Sekarang'
        )}
      </motion.button>
    </form>
  );
};

export default IndividualForm;

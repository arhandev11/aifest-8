import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Loader2 } from 'lucide-react';
import { Competition, GroupFormData, jenjangOptions } from '@/types/competition';
import { apiFetch } from '@/lib/api';

interface GroupFormProps {
  competition: Competition;
}

const GroupForm = ({ competition }: GroupFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<GroupFormData>({
    nama_1: '',
    nama_arab_1: '',
    usia_1: '',
    instansi_1: '',
    nama_2: '',
    nama_arab_2: '',
    usia_2: '',
    instansi_2: '',
    nama_3: '',
    nama_arab_3: '',
    usia_3: '',
    instansi_3: '',
    jenjang: '',
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
      [name]: name.startsWith('usia') ? (value === '' ? '' : parseInt(value)) : value,
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

    // Member 1
    if (!formData.nama_1.trim()) newErrors.nama_1 = 'Nama wajib diisi';
    if (!formData.nama_arab_1.trim()) newErrors.nama_arab_1 = 'Nama Arab wajib diisi';
    if (!formData.usia_1) newErrors.usia_1 = 'Usia wajib diisi';
    if (!formData.instansi_1.trim()) newErrors.instansi_1 = 'Instansi wajib diisi';

    // Member 2
    if (!formData.nama_2.trim()) newErrors.nama_2 = 'Nama wajib diisi';
    if (!formData.nama_arab_2.trim()) newErrors.nama_arab_2 = 'Nama Arab wajib diisi';
    if (!formData.usia_2) newErrors.usia_2 = 'Usia wajib diisi';
    if (!formData.instansi_2.trim()) newErrors.instansi_2 = 'Instansi wajib diisi';

    // Member 3
    if (!formData.nama_3.trim()) newErrors.nama_3 = 'Nama wajib diisi';
    if (!formData.nama_arab_3.trim()) newErrors.nama_arab_3 = 'Nama Arab wajib diisi';
    if (!formData.usia_3) newErrors.usia_3 = 'Usia wajib diisi';
    if (!formData.instansi_3.trim()) newErrors.instansi_3 = 'Instansi wajib diisi';

    // Common fields
    if (!formData.jenjang) newErrors.jenjang = 'Jenjang wajib dipilih';
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

      // Member 1
      submitData.append('nama_1', formData.nama_1);
      submitData.append('nama_arab_1', formData.nama_arab_1);
      submitData.append('usia_1', String(formData.usia_1));
      submitData.append('instansi_1', formData.instansi_1);

      // Member 2
      submitData.append('nama_2', formData.nama_2);
      submitData.append('nama_arab_2', formData.nama_arab_2);
      submitData.append('usia_2', String(formData.usia_2));
      submitData.append('instansi_2', formData.instansi_2);

      // Member 3
      submitData.append('nama_3', formData.nama_3);
      submitData.append('nama_arab_3', formData.nama_arab_3);
      submitData.append('usia_3', String(formData.usia_3));
      submitData.append('instansi_3', formData.instansi_3);

      // Common fields
      submitData.append('jenjang', formData.jenjang);
      submitData.append('email', formData.email);
      submitData.append('handphone', formData.handphone);
      submitData.append('jenis', formData.jenis);

      // Files
      if (formData.bukti_bayar) submitData.append('bukti_bayar', formData.bukti_bayar);
      if (formData.story_1) submitData.append('story_1', formData.story_1);
      if (formData.story_2) submitData.append('story_2', formData.story_2);
      if (formData.twibbon) submitData.append('twibbon', formData.twibbon);

      const response = await apiFetch('/api/lomba-kelompok', {
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

  const renderMemberFields = (memberNum: 1 | 2 | 3) => (
    <div className="space-y-4 p-4 bg-black/30 rounded-xl border border-festival-gold/20">
      <h3 className="text-festival-gold font-bold text-lg" style={{ fontFamily: 'var(--font-family-sansita)' }}>
        Anggota {memberNum}
      </h3>

      {/* Nama */}
      <div>
        <label className={labelClasses}>Nama Lengkap *</label>
        <input
          type="text"
          name={`nama_${memberNum}`}
          value={formData[`nama_${memberNum}` as keyof GroupFormData] as string}
          onChange={handleInputChange}
          placeholder="Masukkan nama lengkap"
          className={inputClasses}
        />
        {errors[`nama_${memberNum}`] && <p className="text-red-400 text-xs mt-1">{errors[`nama_${memberNum}`]}</p>}
      </div>

      {/* Nama Arab */}
      <div>
        <label className={labelClasses}>Nama Arab *</label>
        <input
          type="text"
          name={`nama_arab_${memberNum}`}
          value={formData[`nama_arab_${memberNum}` as keyof GroupFormData] as string}
          onChange={handleInputChange}
          placeholder="Masukkan nama dalam bahasa Arab"
          className={inputClasses}
          dir="rtl"
        />
        {errors[`nama_arab_${memberNum}`] && <p className="text-red-400 text-xs mt-1">{errors[`nama_arab_${memberNum}`]}</p>}
      </div>

      {/* Usia & Instansi */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClasses}>Usia *</label>
          <input
            type="number"
            name={`usia_${memberNum}`}
            value={formData[`usia_${memberNum}` as keyof GroupFormData] as number | ''}
            onChange={handleInputChange}
            placeholder="Usia"
            min="1"
            max="100"
            className={inputClasses}
          />
          {errors[`usia_${memberNum}`] && <p className="text-red-400 text-xs mt-1">{errors[`usia_${memberNum}`]}</p>}
        </div>
        <div>
          <label className={labelClasses}>Instansi *</label>
          <input
            type="text"
            name={`instansi_${memberNum}`}
            value={formData[`instansi_${memberNum}` as keyof GroupFormData] as string}
            onChange={handleInputChange}
            placeholder="Instansi"
            className={inputClasses}
          />
          {errors[`instansi_${memberNum}`] && <p className="text-red-400 text-xs mt-1">{errors[`instansi_${memberNum}`]}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5" style={{ fontFamily: 'var(--font-family-lora)' }}>
      {errors.submit && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400 text-sm">
          {errors.submit}
        </div>
      )}

      {/* Member Fields */}
      {renderMemberFields(1)}
      {renderMemberFields(2)}
      {renderMemberFields(3)}

      {/* Common Fields */}
      <div className="space-y-4 pt-4 border-t border-festival-gold/20">
        <h3 className="text-festival-gold font-bold text-lg" style={{ fontFamily: 'var(--font-family-sansita)' }}>
          Informasi Kontak
        </h3>

        {/* Jenjang */}
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

export default GroupForm;

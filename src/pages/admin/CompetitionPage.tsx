import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2, Download, FileSpreadsheet, FileText, Trash2, CreditCard, Instagram, MessageCircle, Image } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useAuth } from '@/context/AuthContext';
import { competitions } from '@/types/competition';
import { apiFetchWithAuth } from '@/lib/api';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface LombaIndividu {
  id: string;
  nama: string;
  nama_arab: string;
  usia: number;
  jenjang: string;
  instansi: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar_url: string;
  story_1_url: string;
  story_2_url: string;
  twibbon_url: string;
  story_instagram_full_url: string;
  story_whatsapp_full_url: string;
  twibbon_full_url: string;
  created_at: string;
  updated_at: string;
}

interface LombaKelompok {
  id: string;
  nama_1: string;
  nama_arab_1: string;
  usia_1: number;
  instansi_1: string;
  nama_2: string;
  nama_arab_2: string;
  usia_2: number;
  instansi_2: string;
  nama_3: string;
  nama_arab_3: string;
  usia_3: number;
  instansi_3: string;
  jenjang: string;
  email: string;
  handphone: string;
  jenis: string;
  bukti_bayar_url: string;
  story_1_url: string;
  story_2_url: string;
  twibbon_url: string;
  story_instagram_full_url: string;
  story_whatsapp_full_url: string;
  twibbon_full_url: string;
  created_at: string;
  updated_at: string;
}

const CompetitionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token } = useAuth();
  const [dataIndividu, setDataIndividu] = useState<LombaIndividu[]>([]);
  const [dataKelompok, setDataKelompok] = useState<LombaKelompok[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Find competition details
  const competition = competitions.find(c => c.slug === slug);
  const isGroupCompetition = competition?.type === 'group';

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;

      setIsLoading(true);
      setError(null);

      try {
        const endpoint = isGroupCompetition
          ? `/api/lomba-kelompok?jenis=${slug}`
          : `/api/lomba-individu?jenis=${slug}`;

        const response = await apiFetchWithAuth(endpoint, token || '');

        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const result = await response.json();

        if (isGroupCompetition) {
          setDataKelompok(result.data.lomba_kelompok || []);
          setDataIndividu([]);
        } else {
          setDataIndividu(result.data.lomba_individu || []);
          setDataKelompok([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, slug, isGroupCompetition]);

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      const endpoint = isGroupCompetition
        ? `/api/lomba-kelompok/${id}`
        : `/api/lomba-individu/${id}`;

      const response = await apiFetchWithAuth(endpoint, token || '', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus data');
      }

      // Remove from local state
      if (isGroupCompetition) {
        setDataKelompok(prev => prev.filter(item => item.id !== id));
      } else {
        setDataIndividu(prev => prev.filter(item => item.id !== id));
      }

      setDeleteConfirm(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Terjadi kesalahan saat menghapus');
    } finally {
      setIsDeleting(false);
    }
  };

  const columnsIndividu: ColumnDef<LombaIndividu, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id.slice(0, 8)}...</span>
      ),
    },
    {
      accessorKey: 'nama',
      header: 'Nama',
    },
    {
      accessorKey: 'nama_arab',
      header: 'Nama Arab',
      cell: ({ row }) => (
        <span dir="rtl">{row.original.nama_arab}</span>
      ),
    },
    {
      accessorKey: 'usia',
      header: 'Usia',
    },
    {
      accessorKey: 'jenjang',
      header: 'Jenjang',
    },
    {
      accessorKey: 'instansi',
      header: 'Instansi',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'handphone',
      header: 'No. HP',
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Daftar',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('id-ID'),
    },
    {
      id: 'files',
      header: 'Files',
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.bukti_bayar_url && (
            <a
              href={row.original.bukti_bayar_url.startsWith('http') ? row.original.bukti_bayar_url : `https://aifest-api.arhandev.com${row.original.bukti_bayar_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded transition-colors"
              title="Bukti Bayar"
            >
              <CreditCard size={14} />
            </a>
          )}
          {row.original.story_instagram_full_url && (
            <a
              href={row.original.story_instagram_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 rounded transition-colors"
              title="Story Instagram"
            >
              <Instagram size={14} />
            </a>
          )}
          {row.original.story_whatsapp_full_url && (
            <a
              href={row.original.story_whatsapp_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 rounded transition-colors"
              title="Story WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          )}
          {row.original.twibbon_full_url && (
            <a
              href={row.original.twibbon_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded transition-colors"
              title="Twibbon"
            >
              <Image size={14} />
            </a>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <button
          onClick={() => setDeleteConfirm({ id: row.original.id, name: row.original.nama })}
          className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors"
          title="Hapus"
        >
          <Trash2 size={14} />
        </button>
      ),
    },
  ];

  const columnsKelompok: ColumnDef<LombaKelompok, unknown>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.id.slice(0, 8)}...</span>
      ),
    },
    {
      accessorKey: 'nama_1',
      header: 'Anggota 1',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.nama_1}</p>
          <p className="text-xs text-gray-400">{row.original.instansi_1}</p>
        </div>
      ),
    },
    {
      accessorKey: 'nama_2',
      header: 'Anggota 2',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.nama_2}</p>
          <p className="text-xs text-gray-400">{row.original.instansi_2}</p>
        </div>
      ),
    },
    {
      accessorKey: 'nama_3',
      header: 'Anggota 3',
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.nama_3}</p>
          <p className="text-xs text-gray-400">{row.original.instansi_3}</p>
        </div>
      ),
    },
    {
      accessorKey: 'jenjang',
      header: 'Jenjang',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'handphone',
      header: 'No. HP',
    },
    {
      accessorKey: 'created_at',
      header: 'Tanggal Daftar',
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString('id-ID'),
    },
    {
      id: 'files',
      header: 'Files',
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.bukti_bayar_url && (
            <a
              href={row.original.bukti_bayar_url.startsWith('http') ? row.original.bukti_bayar_url : `https://aifest-api.arhandev.com${row.original.bukti_bayar_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-green-600/20 text-green-400 hover:bg-green-600/30 rounded transition-colors"
              title="Bukti Bayar"
            >
              <CreditCard size={14} />
            </a>
          )}
          {row.original.story_instagram_full_url && (
            <a
              href={row.original.story_instagram_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 rounded transition-colors"
              title="Story Instagram"
            >
              <Instagram size={14} />
            </a>
          )}
          {row.original.story_whatsapp_full_url && (
            <a
              href={row.original.story_whatsapp_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 rounded transition-colors"
              title="Story WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          )}
          {row.original.twibbon_full_url && (
            <a
              href={row.original.twibbon_full_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 rounded transition-colors"
              title="Twibbon"
            >
              <Image size={14} />
            </a>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <button
          onClick={() => setDeleteConfirm({ id: row.original.id, name: row.original.nama_1 })}
          className="p-1.5 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded transition-colors"
          title="Hapus"
        >
          <Trash2 size={14} />
        </button>
      ),
    },
  ];

  const getFullUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://aifest-api.arhandev.com${url}`;
  };

  const handleExportExcel = () => {
    const data = isGroupCompetition ? dataKelompok : dataIndividu;
    const exportData = data.map((item, index) => {
      if (isGroupCompetition) {
        const kelompok = item as LombaKelompok;
        return {
          'No': index + 1,
          'Nama 1': kelompok.nama_1,
          'Nama Arab 1': kelompok.nama_arab_1,
          'Usia 1': kelompok.usia_1,
          'Instansi 1': kelompok.instansi_1,
          'Nama 2': kelompok.nama_2,
          'Nama Arab 2': kelompok.nama_arab_2,
          'Usia 2': kelompok.usia_2,
          'Instansi 2': kelompok.instansi_2,
          'Nama 3': kelompok.nama_3,
          'Nama Arab 3': kelompok.nama_arab_3,
          'Usia 3': kelompok.usia_3,
          'Instansi 3': kelompok.instansi_3,
          'Jenjang': kelompok.jenjang,
          'Email': kelompok.email,
          'No. HP': kelompok.handphone,
          'Tanggal Daftar': new Date(kelompok.created_at).toLocaleDateString('id-ID'),
          'Bukti Bayar': getFullUrl(kelompok.bukti_bayar_url),
          'Story Instagram': kelompok.story_instagram_full_url || '',
          'Story WhatsApp': kelompok.story_whatsapp_full_url || '',
          'Twibbon': kelompok.twibbon_full_url || '',
        };
      } else {
        const individu = item as LombaIndividu;
        return {
          'No': index + 1,
          'Nama': individu.nama,
          'Nama Arab': individu.nama_arab,
          'Usia': individu.usia,
          'Jenjang': individu.jenjang,
          'Instansi': individu.instansi,
          'Email': individu.email,
          'No. HP': individu.handphone,
          'Tanggal Daftar': new Date(individu.created_at).toLocaleDateString('id-ID'),
          'Bukti Bayar': getFullUrl(individu.bukti_bayar_url),
          'Story Instagram': individu.story_instagram_full_url || '',
          'Story WhatsApp': individu.story_whatsapp_full_url || '',
          'Twibbon': individu.twibbon_full_url || '',
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, competition?.name || 'Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${competition?.name || 'lomba'}_${new Date().toISOString().split('T')[0]}.xlsx`);
    setShowExportMenu(false);
  };

  const handleExportCSV = () => {
    const data = isGroupCompetition ? dataKelompok : dataIndividu;
    const exportData = data.map((item, index) => {
      if (isGroupCompetition) {
        const kelompok = item as LombaKelompok;
        return {
          'No': index + 1,
          'Nama 1': kelompok.nama_1,
          'Nama Arab 1': kelompok.nama_arab_1,
          'Usia 1': kelompok.usia_1,
          'Instansi 1': kelompok.instansi_1,
          'Nama 2': kelompok.nama_2,
          'Nama Arab 2': kelompok.nama_arab_2,
          'Usia 2': kelompok.usia_2,
          'Instansi 2': kelompok.instansi_2,
          'Nama 3': kelompok.nama_3,
          'Nama Arab 3': kelompok.nama_arab_3,
          'Usia 3': kelompok.usia_3,
          'Instansi 3': kelompok.instansi_3,
          'Jenjang': kelompok.jenjang,
          'Email': kelompok.email,
          'No. HP': kelompok.handphone,
          'Tanggal Daftar': new Date(kelompok.created_at).toLocaleDateString('id-ID'),
          'Bukti Bayar': getFullUrl(kelompok.bukti_bayar_url),
          'Story Instagram': kelompok.story_instagram_full_url || '',
          'Story WhatsApp': kelompok.story_whatsapp_full_url || '',
          'Twibbon': kelompok.twibbon_full_url || '',
        };
      } else {
        const individu = item as LombaIndividu;
        return {
          'No': index + 1,
          'Nama': individu.nama,
          'Nama Arab': individu.nama_arab,
          'Usia': individu.usia,
          'Jenjang': individu.jenjang,
          'Instansi': individu.instansi,
          'Email': individu.email,
          'No. HP': individu.handphone,
          'Tanggal Daftar': new Date(individu.created_at).toLocaleDateString('id-ID'),
          'Bukti Bayar': getFullUrl(individu.bukti_bayar_url),
          'Story Instagram': individu.story_instagram_full_url || '',
          'Story WhatsApp': individu.story_whatsapp_full_url || '',
          'Twibbon': individu.twibbon_full_url || '',
        };
      }
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, `${competition?.name || 'lomba'}_${new Date().toISOString().split('T')[0]}.csv`);
    setShowExportMenu(false);
  };

  const currentData = isGroupCompetition ? dataKelompok : dataIndividu;

  if (!competition) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="text-center py-20">
            <p className="text-red-400">Kompetisi tidak ditemukan</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-family-sansita)' }}>
              {competition.name}
            </h1>
            <p className="text-gray-400 mt-1" style={{ fontFamily: 'var(--font-family-lora)' }}>
              Data pendaftaran {isGroupCompetition ? 'lomba kelompok' : 'lomba individu'}
            </p>
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-festival-gold text-black font-medium rounded-lg hover:bg-festival-light-gold transition-colors"
              disabled={currentData.length === 0}
            >
              <Download size={20} />
              Export
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleExportExcel}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                >
                  <FileSpreadsheet size={18} className="text-green-400" />
                  Export Excel
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-3 w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-b-lg"
                >
                  <FileText size={18} className="text-blue-400" />
                  Export CSV
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-festival-gold animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : isGroupCompetition ? (
          <DataTable
            data={dataKelompok}
            columns={columnsKelompok}
            searchPlaceholder="Cari nama, email, instansi..."
          />
        ) : (
          <DataTable
            data={dataIndividu}
            columns={columnsIndividu}
            searchPlaceholder="Cari nama, email, instansi..."
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-family-sansita)' }}>
                Konfirmasi Hapus
              </h3>
              <p className="text-gray-300 mb-6" style={{ fontFamily: 'var(--font-family-lora)' }}>
                Apakah Anda yakin ingin menghapus data peserta <span className="text-festival-gold font-semibold">{deleteConfirm.name}</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      Hapus
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CompetitionPage;

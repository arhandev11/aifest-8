import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2, Download, FileSpreadsheet, FileText, ExternalLink } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useAuth } from '@/context/AuthContext';
import { LombaIndividu } from '@/types/admin';
import { exportIndividuToExcel, exportIndividuToCSV } from '@/lib/export';
import { API_BASE_URL } from '@/lib/api';

const LombaIndividuPage = () => {
  const { token } = useAuth();
  const [data, setData] = useState<LombaIndividu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/lomba-individu`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data');
        }

        const result = await response.json();
        setData(result.data.lomba_individu);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const columns: ColumnDef<LombaIndividu, unknown>[] = [
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
      accessorKey: 'jenis',
      header: 'Jenis Lomba',
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-festival-gold/20 text-festival-gold rounded text-xs uppercase">
          {row.original.jenis}
        </span>
      ),
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
              href={`${API_BASE_URL}${row.original.bukti_bayar_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
              title="Bukti Bayar"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      ),
    },
  ];

  const handleExportExcel = () => {
    exportIndividuToExcel(data);
    setShowExportMenu(false);
  };

  const handleExportCSV = () => {
    exportIndividuToCSV(data);
    setShowExportMenu(false);
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-family-sansita)' }}>
              Lomba Individu
            </h1>
            <p className="text-gray-400 mt-1" style={{ fontFamily: 'var(--font-family-lora)' }}>
              Data pendaftaran lomba individu
            </p>
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-festival-gold text-black font-medium rounded-lg hover:bg-festival-light-gold transition-colors"
              disabled={data.length === 0}
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
        ) : (
          <DataTable
            data={data}
            columns={columns}
            searchPlaceholder="Cari nama, email, instansi..."
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default LombaIndividuPage;

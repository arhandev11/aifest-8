import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, UsersRound, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { LombaIndividu, LombaKelompok } from '@/types/admin';
import { API_BASE_URL } from '@/lib/api';

const DashboardPage = () => {
  const { token } = useAuth();
  const [individuCount, setIndividuCount] = useState<number | null>(null);
  const [kelompokCount, setKelompokCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [individuRes, kelompokRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/lomba-individu`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/lomba-kelompok`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }),
        ]);

        if (individuRes.ok) {
          const individuData = await individuRes.json();
          setIndividuCount((individuData.data.lomba_individu as LombaIndividu[]).length);
        }

        if (kelompokRes.ok) {
          const kelompokData = await kelompokRes.json();
          setKelompokCount((kelompokData.data.lomba_kelompok as LombaKelompok[]).length);
        }
      } catch {
        // Handle error silently
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  const stats = [
    {
      title: 'Lomba Individu',
      count: individuCount,
      icon: Users,
      link: '/admin/lomba-individu',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Lomba Kelompok',
      count: kelompokCount,
      icon: UsersRound,
      link: '/admin/lomba-kelompok',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-family-sansita)' }}>
            Dashboard
          </h1>
          <p className="text-gray-400 mt-1" style={{ fontFamily: 'var(--font-family-lora)' }}>
            Selamat datang di panel admin Aisyah Festival 8.0
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="block bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-festival-gold/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
                  ) : (
                    <p className="text-4xl font-bold text-white">
                      {stat.count ?? '-'}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm mt-2">Pendaftar</p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-family-sansita)' }}>
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/admin/lomba-individu"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Users className="text-blue-400" />
              <span className="text-white">Lihat Data Lomba Individu</span>
            </Link>
            <Link
              to="/admin/lomba-kelompok"
              className="flex items-center gap-3 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <UsersRound className="text-green-400" />
              <span className="text-white">Lihat Data Lomba Kelompok</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;

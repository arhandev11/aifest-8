import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { competitions } from '@/types/competition';
import { LayoutDashboard, Users, UsersRound, LogOut, ChevronDown, ChevronRight } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCompetitionsOpen, setIsCompetitionsOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Separate competitions by type (exclude hidden)
  const individualCompetitions = competitions.filter(c => c.type === 'individual' && !c.hidden);
  const groupCompetitions = competitions.filter(c => c.type === 'group' && !c.hidden);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-festival-gold" style={{ fontFamily: 'var(--font-family-sansita)' }}>
            AiFest Admin
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link
                to="/admin"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-festival-gold/20 text-festival-gold'
                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
            </li>

            {/* Competitions Section */}
            <li>
              <button
                onClick={() => setIsCompetitionsOpen(!isCompetitionsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
              >
                <span className="font-medium">Kompetisi</span>
                {isCompetitionsOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {isCompetitionsOpen && (
                <div className="mt-2 space-y-1">
                  {/* Individual Competitions */}
                  <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} />
                    Individu
                  </p>
                  {individualCompetitions.map((comp) => {
                    const isActive = location.pathname === `/admin/lomba/${comp.slug}`;
                    return (
                      <Link
                        key={comp.id}
                        to={`/admin/lomba/${comp.slug}`}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg transition-colors text-sm ${
                          isActive
                            ? 'bg-festival-gold/20 text-festival-gold'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <span>{comp.name}</span>
                      </Link>
                    );
                  })}

                  {/* Group Competitions */}
                  <p className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2 mt-3">
                    <UsersRound size={14} />
                    Kelompok
                  </p>
                  {groupCompetitions.map((comp) => {
                    const isActive = location.pathname === `/admin/lomba/${comp.slug}`;
                    return (
                      <Link
                        key={comp.id}
                        to={`/admin/lomba/${comp.slug}`}
                        className={`flex items-center gap-3 px-4 py-2 ml-4 rounded-lg transition-colors text-sm ${
                          isActive
                            ? 'bg-festival-gold/20 text-festival-gold'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        <span>{comp.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-gray-400 text-xs">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

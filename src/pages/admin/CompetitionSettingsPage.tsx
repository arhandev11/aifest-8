import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAuth } from '@/context/AuthContext';
import { useCompetitions } from '@/context/CompetitionContext';
import { apiFetchWithAuth } from '@/lib/api';
import { Competition } from '@/types/competition';

const CompetitionSettingsPage = () => {
  const { token } = useAuth();
  const { competitions, isLoading, refetch } = useCompetitions();
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const handleToggle = async (competition: Competition, field: 'closed' | 'isFull' | 'hidden') => {
    const key = `${competition.id}-${field}`;
    setUpdatingIds((prev) => new Set(prev).add(key));

    const apiField = field === 'isFull' ? 'is_full' : field;
    const newValue = field === 'isFull' ? !competition.isFull : !competition[field];

    try {
      const res = await apiFetchWithAuth(`/api/competitions/${competition.id}`, token || '', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [apiField]: newValue }),
      });

      if (res.ok) {
        await refetch();
      }
    } catch {
      // Error handling - refetch to restore state
      await refetch();
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }
  };

  const Toggle = ({
    checked,
    loading,
    onChange,
    colorClass = 'bg-festival-gold',
  }: {
    checked: boolean;
    loading: boolean;
    onChange: () => void;
    colorClass?: string;
  }) => (
    <button
      onClick={onChange}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? colorClass : 'bg-gray-600'
      } ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const visibleCompetitions = competitions.filter((c) => !c.hidden);
  const hiddenCompetitions = competitions.filter((c) => c.hidden);

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: 'var(--font-family-sansita)' }}
          >
            Pengaturan Lomba
          </h1>
          <p
            className="text-gray-400 mt-1"
            style={{ fontFamily: 'var(--font-family-lora)' }}
          >
            Kelola status pendaftaran dan visibilitas lomba
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-festival-gold animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Main competitions table */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                      Nama Lomba
                    </th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                      Tipe
                    </th>
                    <th className="text-center text-gray-400 text-sm font-medium px-6 py-4">
                      Buka Pendaftaran
                    </th>
                    <th className="text-center text-gray-400 text-sm font-medium px-6 py-4">
                      Penuh
                    </th>
                    <th className="text-center text-gray-400 text-sm font-medium px-6 py-4">
                      Sembunyikan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleCompetitions.map((comp) => (
                    <tr
                      key={comp.id}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{comp.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            comp.type === 'individual'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {comp.type === 'individual' ? 'Individu' : 'Kelompok'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Toggle
                            checked={!comp.closed}
                            loading={updatingIds.has(`${comp.id}-closed`)}
                            onChange={() => handleToggle(comp, 'closed')}
                            colorClass="bg-green-500"
                          />
                          <span
                            className={`text-xs ${!comp.closed ? 'text-green-400' : 'text-red-400'}`}
                          >
                            {!comp.closed ? 'Buka' : 'Tutup'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Toggle
                            checked={comp.isFull}
                            loading={updatingIds.has(`${comp.id}-isFull`)}
                            onChange={() => handleToggle(comp, 'isFull')}
                            colorClass="bg-orange-500"
                          />
                          <span
                            className={`text-xs ${comp.isFull ? 'text-orange-400' : 'text-gray-500'}`}
                          >
                            {comp.isFull ? 'Penuh' : 'Tersedia'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Toggle
                            checked={comp.hidden ?? false}
                            loading={updatingIds.has(`${comp.id}-hidden`)}
                            onChange={() => handleToggle(comp, 'hidden')}
                            colorClass="bg-red-500"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hidden competitions */}
            {hiddenCompetitions.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-400 mb-3">Lomba Tersembunyi</h2>
                <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {hiddenCompetitions.map((comp) => (
                        <tr
                          key={comp.id}
                          className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="text-gray-400 font-medium">{comp.name}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                comp.type === 'individual'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-green-500/20 text-green-400'
                              }`}
                            >
                              {comp.type === 'individual' ? 'Individu' : 'Kelompok'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Toggle
                                checked={comp.hidden ?? false}
                                loading={updatingIds.has(`${comp.id}-hidden`)}
                                onChange={() => handleToggle(comp, 'hidden')}
                                colorClass="bg-red-500"
                              />
                              <span className="text-xs text-red-400">Tersembunyi</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CompetitionSettingsPage;

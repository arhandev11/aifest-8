import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Competition, competitions as fallbackCompetitions } from '@/types/competition';
import { apiFetch } from '@/lib/api';

interface CompetitionContextType {
  competitions: Competition[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const CompetitionContext = createContext<CompetitionContextType>({
  competitions: fallbackCompetitions,
  isLoading: true,
  refetch: async () => {},
});

export const useCompetitions = () => useContext(CompetitionContext);

export const CompetitionProvider = ({ children }: { children: ReactNode }) => {
  const [competitions, setCompetitions] = useState<Competition[]>(fallbackCompetitions);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompetitions = async () => {
    try {
      const res = await apiFetch('/api/competitions');
      if (res.ok) {
        const json = await res.json();
        const data = json.data.competitions as Array<{
          id: number;
          name: string;
          slug: string;
          description: string;
          type: 'individual' | 'group';
          rulebook: string | null;
          is_full: boolean;
          closed: boolean;
          hidden: boolean;
        }>;
        setCompetitions(
          data.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            type: c.type,
            rulebook: c.rulebook ?? undefined,
            isFull: c.is_full,
            closed: c.closed,
            hidden: c.hidden,
          }))
        );
      }
    } catch {
      // Keep fallback data on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  return (
    <CompetitionContext.Provider value={{ competitions, isLoading, refetch: fetchCompetitions }}>
      {children}
    </CompetitionContext.Provider>
  );
};

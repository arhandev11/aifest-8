import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from '@/types/admin';
import { apiFetch, apiFetchWithAuth } from '@/lib/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');

    if (storedToken && storedUser) {
      setAuthState({
        token: storedToken,
        user: JSON.parse(storedUser),
        isAuthenticated: true,
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiFetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        return false;
      }

      const token = result.data.token.plainTextToken;
      const user: User = result.data.user;

      localStorage.setItem('admin_token', token);
      localStorage.setItem('admin_user', JSON.stringify(user));

      setAuthState({
        token,
        user,
        isAuthenticated: true,
      });

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      if (authState.token) {
        await apiFetchWithAuth('/api/logout', authState.token, {
          method: 'POST',
        });
      }
    } catch {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

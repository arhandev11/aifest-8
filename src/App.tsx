import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import HomePage from '@/pages/HomePage';
import RegistrationPage from '@/pages/RegistrationPage';
import LoginPage from '@/pages/admin/LoginPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import LombaIndividuPage from '@/pages/admin/LombaIndividuPage';
import LombaKelompokPage from '@/pages/admin/LombaKelompokPage';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/daftar/:slug" element={<RegistrationPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lomba-individu"
            element={
              <ProtectedRoute>
                <LombaIndividuPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/lomba-kelompok"
            element={
              <ProtectedRoute>
                <LombaKelompokPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { CompetitionProvider } from '@/context/CompetitionContext';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import RegistrationPage from '@/pages/RegistrationPage';
import SuccessPage from '@/pages/SuccessPage';
import LoginPage from '@/pages/admin/LoginPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import CompetitionPage from '@/pages/admin/CompetitionPage';
import CompetitionSettingsPage from '@/pages/admin/CompetitionSettingsPage';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

function App() {
  return (
    <CompetitionProvider>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/daftar/:slug" element={<RegistrationPage />} />
          <Route path="/success" element={<SuccessPage />} />

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
            path="/admin/lomba/:slug"
            element={
              <ProtectedRoute>
                <CompetitionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <CompetitionSettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
    </CompetitionProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public pages
import { HomePage } from './pages/public/HomePage';
import { BentoHomePage } from './pages/public/BentoHomePage';
import { TrackingPage } from './pages/public/TrackingPage';
import { HelpPage } from './pages/public/HelpPage';

// Admin auth pages
import { LoginPage } from './pages/admin/LoginPage';
import { ForgotPasswordPage } from './pages/admin/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/admin/ResetPasswordPage';

// Admin pages
import { DashboardPage } from './pages/admin/DashboardPage';
import { ShipmentsPage } from './pages/admin/ShipmentsPage';
import { RegisterShipmentPage } from './pages/admin/RegisterShipmentPage';
import { ShipmentDetailPage } from './pages/admin/ShipmentDetailPage';
import { CarriersPage } from './pages/admin/CarriersPage';
import { TrackingEventsPage } from './pages/admin/TrackingEventsPage';
import { ExceptionsPage } from './pages/admin/ExceptionsPage';
import { SyncLogsPage } from './pages/admin/SyncLogsPage';
import { SettingsPage } from './pages/admin/SettingsPage';

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<BentoHomePage />} />
            <Route path="/home-old" element={<HomePage />} />
            <Route path="/track" element={<TrackingPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Admin auth routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/admin/reset-password" element={<ResetPasswordPage />} />

            {/* Protected admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/shipments"
              element={
                <ProtectedRoute>
                  <ShipmentsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/shipments/register"
              element={
                <ProtectedRoute>
                  <RegisterShipmentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/shipments/:id"
              element={
                <ProtectedRoute>
                  <ShipmentDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/carriers"
              element={
                <ProtectedRoute>
                  <CarriersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <TrackingEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/exceptions"
              element={
                <ProtectedRoute>
                  <ExceptionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sync-logs"
              element={
                <ProtectedRoute>
                  <SyncLogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<BentoHomePage />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;

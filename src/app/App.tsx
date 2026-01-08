import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import { AuthProvider, supabase } from './context/AuthContext';
import { GameTimeProvider } from './context/GameTimeContext';
import { Layout } from './components/mori/Layout';
import { LandingPage } from './components/mori/LandingPage';
import { ParentingSection } from './components/mori/ParentingSection';
import { GameSection } from './components/mori/GameSection';
import { TechSection } from './components/mori/TechSection';
import { MemberSection } from './components/mori/MemberSection';
import { ToolkitSection } from './components/mori/ToolkitSection';
import { EnglishSection } from './components/mori/EnglishSection';
import AdminDashboard from './pages/AdminDashboard';

// Wrapper to handle auth events and layout persistence
function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingResetPassword, setPendingResetPassword] = useState(false);

  useEffect(() => {
    // Listen for password recovery event at the top level to redirect to member section
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPendingResetPassword(true);
        navigate('/member');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Determine current view for Layout based on path
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/') return 'landing';
    // Handle nested paths like /games/matching -> 'games'
    const segment = path.substring(1).split('/')[0];
    return segment; 
  };

  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard onBack={() => navigate('/member')} />} />
      
      {/* Main Layout Route - Wrapper ensures Layout doesn't unmount on page change */}
      <Route element={
        <Layout currentView={getCurrentView()}>
          <Outlet />
        </Layout>
      }>
        <Route path="/" element={<LandingPage />} />
        
        {/* Nested routes for deep linking */}
        <Route path="/parenting" element={<ParentingSection />} />
        <Route path="/parenting/:articleId" element={<ParentingSection />} />
        
        <Route path="/games" element={<GameSection />} />
        <Route path="/games/:gameId" element={<GameSection />} />
        
        <Route path="/toolkit" element={<ToolkitSection />} />
        <Route path="/tech" element={<TechSection />} />
        <Route path="/english" element={<EnglishSection />} />
        
        <Route 
          path="/member" 
          element={<MemberSection defaultShowResetPassword={pendingResetPassword} />} 
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameTimeProvider>
          <AppContent />
        </GameTimeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

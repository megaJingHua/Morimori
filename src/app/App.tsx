import React from 'react';
import { AuthProvider } from './context/AuthContext';
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
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <GameTimeProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/parenting/*" element={<ParentingSection />} />
              <Route path="/games/*" element={<GameSection />} />
              <Route path="/toolkit/*" element={<ToolkitSection />} />
              <Route path="/tech/*" element={<TechSection />} />
              <Route path="/english/*" element={<EnglishSection />} />
              <Route path="/member" element={<MemberSection />} />
              <Route path="/admin" element={<AdminDashboard onBack={() => window.location.href = '/member'} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </GameTimeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

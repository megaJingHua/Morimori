import React, { useState, useEffect } from 'react';
import { AuthProvider, supabase } from './context/AuthContext';
import { GameTimeProvider } from './context/GameTimeContext';
import { Layout } from './components/mori/Layout';
import { LandingPage } from './components/mori/LandingPage';
import { ParentingSection } from './components/mori/ParentingSection';
import { GameSection } from './components/mori/GameSection';
import { TechSection } from './components/mori/TechSection';
import { MemberSection } from './components/mori/MemberSection';
import { ToolkitSection } from './components/mori/ToolkitSection';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [pendingResetPassword, setPendingResetPassword] = useState(false);

  useEffect(() => {
    // Listen for password recovery event at the top level to redirect to member section
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPendingResetPassword(true);
        setCurrentView('member');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage setView={setCurrentView} />;
      case 'parenting':
        return <ParentingSection />;
      case 'games':
        return <GameSection />;
      case 'toolkit':
        return <ToolkitSection setView={setCurrentView} />;
      case 'tech':
        return <TechSection />;
      case 'member':
        return <MemberSection defaultShowResetPassword={pendingResetPassword} />;
      default:
        return <LandingPage setView={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <GameTimeProvider>
        <Layout currentView={currentView} setView={setCurrentView}>
          {renderView()}
        </Layout>
      </GameTimeProvider>
    </AuthProvider>
  );
}

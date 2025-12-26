import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { GameTimeProvider } from './context/GameTimeContext';
import { Layout } from './components/mori/Layout';
import { LandingPage } from './components/mori/LandingPage';
import { ParentingSection } from './components/mori/ParentingSection';
import { GameSection } from './components/mori/GameSection';
import { TechSection } from './components/mori/TechSection';
import { MemberSection } from './components/mori/MemberSection';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage setView={setCurrentView} />;
      case 'parenting':
        return <ParentingSection />;
      case 'games':
        return <GameSection />;
      case 'tech':
        return <TechSection />;
      case 'member':
        return <MemberSection />;
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

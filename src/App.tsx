import React from 'react';
import { LandingHero } from './components/LandingHero';
import { ChatInterface } from './components/ChatInterface';
import { Header } from './components/Header';
import { useUniversityChat } from './hooks/useUniversityChat';
import { universities } from './data/universities';

export function App() {
  const {
    selectedUniversity,
    messages,
    isLoading,
    error,
    handleSend,
    handleUniversitySelect
  } = useUniversityChat();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <Header />
      <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-800">
      <LandingHero />
      <ChatInterface
        selectedUniversity={selectedUniversity}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={handleSend}
        onUniversitySelect={handleUniversitySelect}
        universities={universities}
      />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { View, SessionNote, VoiceSettings } from './types';
import { ICONS } from './constants';
import ChatView from './components/ChatView';
import LiveVoiceView from './components/LiveVoiceView';
import SessionNotes from './components/SessionNotes';
import HomeView from './components/HomeView';
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([]);
  const [showCrisisInfo, setShowCrisisInfo] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    voiceName: 'Kore',
    gender: 'feminine',
    accent: 'US'
  });

  // Persistence of notes and settings
  useEffect(() => {
    const savedNotes = localStorage.getItem('counselai_notes');
    if (savedNotes) {
      try {
        setSessionNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }

    const savedSettings = localStorage.getItem('counselai_voice_settings');
    if (savedSettings) {
      try {
        setVoiceSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error("Failed to parse voice settings", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('counselai_notes', JSON.stringify(sessionNotes));
  }, [sessionNotes]);

  useEffect(() => {
    localStorage.setItem('counselai_voice_settings', JSON.stringify(voiceSettings));
  }, [voiceSettings]);

  const addNote = (note: SessionNote) => {
    setSessionNotes(prev => [note, ...prev]);
  };

  const deleteNote = (index: number) => {
    setSessionNotes(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllNotes = () => {
    if (confirm("Are you sure you want to delete all session history?")) {
      setSessionNotes([]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setCurrentView(View.HOME)}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">C</div>
          <h1 className="text-xl font-bold text-slate-800 font-serif">CounselAI</h1>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={() => setCurrentView(View.SETTINGS)}
            className={`p-2 rounded-full transition-colors ${currentView === View.SETTINGS ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-slate-100 text-slate-500'}`}
            title="Settings"
          >
            <ICONS.Settings />
          </button>
           <button 
            onClick={() => setShowCrisisInfo(!showCrisisInfo)}
            className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500"
            title="Crisis Support"
          >
            <ICONS.Info />
          </button>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 overflow-hidden relative">
        {showCrisisInfo && (
          <div className="absolute inset-x-0 top-0 bg-red-600 text-white p-6 z-50 animate-slide-down flex justify-between items-start shadow-xl">
            <div className="max-w-4xl mx-auto flex gap-6 items-start">
              <div className="mt-1">
                <ICONS.Info />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg mb-1">Need help right now?</p>
                  <p className="text-sm opacity-90 leading-relaxed">If you are in immediate danger, call your local emergency services. Text HOME to 741741 or call 988 (USA/Canada).</p>
                </div>
                <div>
                  <p className="font-bold text-lg mb-1">Struggling?</p>
                  <p className="text-sm opacity-90 leading-relaxed">
                    If you are in immediate danger, call your local emergency services. ICEERS offer free support by appointment {' '}
                    <a 
                      href="https://www.iceers.org/support-center-2/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline font-bold hover:text-red-100 transition-colors"
                    >
                      [visit support center]
                    </a>.
                  </p>
                </div>
              </div>
            </div>
            <button onClick={() => setShowCrisisInfo(false)} className="p-2 hover:bg-red-700 rounded-lg shrink-0 ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <div className="h-full w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          {currentView === View.HOME && <HomeView setView={setCurrentView} />}
          {currentView === View.CHAT && <ChatView onAddNote={addNote} />}
          {currentView === View.VOICE && <LiveVoiceView onAddNote={addNote} voiceSettings={voiceSettings} />}
          {currentView === View.NOTES && <SessionNotes notes={sessionNotes} onDelete={deleteNote} onClear={clearAllNotes} />}
          {currentView === View.SETTINGS && <SettingsView settings={voiceSettings} onUpdate={setVoiceSettings} />}
        </div>
      </main>

      {/* Navigation */}
      <nav className="bg-white border-t border-slate-200 py-3 px-6 flex justify-around items-center md:justify-center md:gap-16">
        <NavButton 
          active={currentView === View.HOME} 
          onClick={() => setCurrentView(View.HOME)} 
          icon={<ICONS.Home />} 
          label="Home" 
        />
        <NavButton 
          active={currentView === View.CHAT} 
          onClick={() => setCurrentView(View.CHAT)} 
          icon={<ICONS.Chat />} 
          label="Chat" 
        />
        <NavButton 
          active={currentView === View.VOICE} 
          onClick={() => setCurrentView(View.VOICE)} 
          icon={<ICONS.Mic />} 
          label="Voice" 
        />
        <NavButton 
          active={currentView === View.NOTES} 
          onClick={() => setCurrentView(View.NOTES)} 
          icon={<ICONS.Note />} 
          label="Journal" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all px-4 py-1 rounded-xl ${
      active 
        ? 'text-indigo-600 scale-110' 
        : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon}
    <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
  </button>
);

export default App;

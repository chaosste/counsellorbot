
import React, { useState, useEffect } from 'react';
import { View, SessionNote } from './types';
import { ICONS } from './constants';
import ChatView from './components/ChatView';
import LiveVoiceView from './components/LiveVoiceView';
import SessionNotes from './components/SessionNotes';
import HomeView from './components/HomeView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([]);
  const [showCrisisInfo, setShowCrisisInfo] = useState(false);

  // Persistence of notes
  useEffect(() => {
    const saved = localStorage.getItem('counselai_notes');
    if (saved) {
      try {
        setSessionNotes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse notes", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('counselai_notes', JSON.stringify(sessionNotes));
  }, [sessionNotes]);

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
          <div className="absolute inset-x-0 top-0 bg-red-600 text-white p-4 z-50 animate-slide-down flex justify-between items-center shadow-xl">
            <div className="max-w-4xl mx-auto flex gap-4 items-center">
              <ICONS.Info />
              <div>
                <p className="font-bold">Need help right now?</p>
                <p className="text-sm opacity-90">If you are in immediate danger, call your local emergency services. Text HOME to 741741 or call 988 (USA/Canada).</p>
              </div>
            </div>
            <button onClick={() => setShowCrisisInfo(false)} className="p-2 hover:bg-red-700 rounded-lg">×</button>
          </div>
        )}

        <div className="h-full w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          {currentView === View.HOME && <HomeView setView={setCurrentView} />}
          {currentView === View.CHAT && <ChatView onAddNote={addNote} />}
          {currentView === View.VOICE && <LiveVoiceView onAddNote={addNote} />}
          {currentView === View.NOTES && <SessionNotes notes={sessionNotes} onDelete={deleteNote} onClear={clearAllNotes} />}
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

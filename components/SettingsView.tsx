
import React, { useMemo } from 'react';
import { VoiceSettings } from '../types';
import { AVAILABLE_VOICES } from '../constants';

interface SettingsViewProps {
  settings: VoiceSettings;
  onUpdate: (settings: VoiceSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdate }) => {
  const filteredVoices = useMemo(() => {
    return AVAILABLE_VOICES.filter(v => v.gender === settings.gender && v.accent === settings.accent);
  }, [settings.gender, settings.accent]);

  const handleGenderChange = (gender: 'feminine' | 'masculine' | 'neutral') => {
    const firstMatch = AVAILABLE_VOICES.find(v => v.gender === gender && v.accent === settings.accent);
    onUpdate({ 
      ...settings, 
      gender, 
      voiceName: firstMatch?.voiceName || settings.voiceName 
    });
  };

  const handleAccentChange = (accent: 'US' | 'UK') => {
    const firstMatch = AVAILABLE_VOICES.find(v => v.gender === settings.gender && v.accent === accent);
    onUpdate({ 
      ...settings, 
      accent, 
      voiceName: firstMatch?.voiceName || settings.voiceName 
    });
  };

  return (
    <div className="h-full flex flex-col max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 font-serif">Voice Settings</h2>
        <p className="text-slate-500">Customise how CounselAI sounds during voice sessions.</p>
      </div>

      <div className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        {/* Gender Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Voice Gender</label>
          <div className="grid grid-cols-3 gap-2">
            {(['feminine', 'masculine', 'neutral'] as const).map((g) => (
              <button
                key={g}
                onClick={() => handleGenderChange(g)}
                className={`py-3 px-4 rounded-xl border-2 transition-all capitalize font-medium ${
                  settings.gender === g
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Selection */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Accent Region</label>
          <div className="grid grid-cols-2 gap-2">
            {(['US', 'UK'] as const).map((a) => (
              <button
                key={a}
                onClick={() => handleAccentChange(a)}
                className={`py-3 px-4 rounded-xl border-2 transition-all font-medium ${
                  settings.accent === a
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                }`}
              >
                {a === 'US' ? 'United States' : 'United Kingdom'}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Name Dropdown */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Specific Voice</label>
          <div className="relative">
            <select
              value={settings.voiceName}
              onChange={(e) => onUpdate({ ...settings, voiceName: e.target.value })}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-4 appearance-none focus:outline-none focus:border-indigo-600 transition-all text-slate-700 font-medium"
            >
              {filteredVoices.length > 0 ? (
                filteredVoices.map((v) => (
                  <option key={v.voiceName} value={v.voiceName}>
                    {v.label}
                  </option>
                ))
              ) : (
                <option disabled>No specific voice matches this combination</option>
              )}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
          {filteredVoices.length === 0 && (
            <p className="text-xs text-amber-600 italic mt-2">
              CounselAI will use the closest available US voice for UK selections until more regions are added.
            </p>
          )}
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
        <div className="flex gap-4">
          <div className="shrink-0 w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-indigo-900">Voice Preview</h4>
            <p className="text-sm text-indigo-700 leading-relaxed">
              Settings are saved automatically. Start a voice session from the navigation to hear CounselAI in action with your selected {settings.gender} voice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

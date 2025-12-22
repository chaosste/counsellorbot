
import React from 'react';
import { SessionNote } from '../types';

interface SessionNotesProps {
  notes: SessionNote[];
  onDelete: (index: number) => void;
  onClear: () => void;
}

const SessionNotes: React.FC<SessionNotesProps> = ({ notes, onDelete, onClear }) => {
  return (
    <div className="h-full flex flex-col space-y-6 overflow-hidden">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif">Support Journal</h2>
          <p className="text-slate-500">Your journey of reflection and growth.</p>
        </div>
        {notes.length > 0 && (
          <button 
            onClick={onClear}
            className="text-sm text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear All History
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 pb-8">
        {notes.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-12 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">No session notes yet.</h3>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
              Start a chat or voice session and ask CounselAI to "save a note" to see your history here.
            </p>
          </div>
        ) : (
          notes.map((note, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {/* Note Header */}
              <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 mb-1">
                    {new Date(note.dateTimeUTC).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 font-serif">{note.summary}</h3>
                </div>
                <button 
                  onClick={() => onDelete(idx)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                  title="Delete Note"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.255H8.084a2.25 2.25 0 01-2.244-2.255L5.67 6.328m10.88 0a48.108 48.108 0 00-12.82 0m12.82 0V4.5a2.25 2.25 0 00-2.25-2.25h-4.5a2.25 2.25 0 00-2.25 2.25V6.328" />
                  </svg>
                </button>
              </div>

              {/* Note Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Presenting Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {note.presentingThemes.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Emotions Observed</h4>
                    <div className="flex flex-wrap gap-2">
                      {note.emotionsObserved.map((e, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg">{e}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Quote</h4>
                    <div className="p-3 bg-slate-50 rounded-xl italic text-slate-600 text-sm border-l-4 border-indigo-200">
                      "{note.keyQuotes[0] || "Self-reflection in progress."}"
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Next Steps</h4>
                    <ul className="space-y-1">
                      {note.goalsNextSteps.map((step, i) => (
                        <li key={i} className="text-sm text-slate-700 flex gap-2 items-start">
                          <span className="text-indigo-500 mt-1">•</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex gap-2">
                  {note.skillsApplied.map((skill, i) => (
                    <span key={i} className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{skill}</span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-300">Based on UCP 9 Core Skills</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionNotes;

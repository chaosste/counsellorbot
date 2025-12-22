
import React from 'react';
import { View } from '../types';
import { ICONS } from '../constants';

interface HomeViewProps {
  setView: (view: View) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">Hello. I'm CounselAI.</h2>
        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
          A supportive companion grounded in the <span className="text-indigo-600 font-semibold underline decoration-indigo-200">UCP 9 Core Counselling Skills</span>. 
          Whether you prefer to type or talk, I'm here to listen without judgement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <button 
          onClick={() => setView(View.CHAT)}
          className="flex flex-col items-center p-8 bg-white border-2 border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all rounded-3xl group"
        >
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ICONS.Chat />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Text Therapy</h3>
          <p className="text-slate-500 text-sm">Deep, reflective messaging at your own pace.</p>
        </button>

        <button 
          onClick={() => setView(View.VOICE)}
          className="flex flex-col items-center p-8 bg-white border-2 border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all rounded-3xl group"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ICONS.Mic />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Voice Session</h3>
          <p className="text-slate-500 text-sm">Real-time human-like conversation for fluid support.</p>
        </button>
      </div>

      <div className="mt-12 bg-slate-100 rounded-2xl p-6 text-left max-w-2xl">
        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          Our Approach
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          CounselAI uses established techniques like <strong>Active Listening</strong>, <strong>Empathic Reflection</strong>, and <strong>Goal-Setting</strong>. 
          While I can provide support and perspective, I am not a medical professional. If you're in crisis, please use the red emergency button at the top.
        </p>
      </div>
    </div>
  );
};

export default HomeView;

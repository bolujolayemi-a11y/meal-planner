import React from 'react';
import { X, Heart, User, ChefHat, Code, Sparkles, ExternalLink } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar animate-in zoom-in-95 duration-300">
        
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg shadow-orange-100">C</div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pantry Guide</h2>
          <p className="text-[10px] text-orange-500 font-black uppercase tracking-[0.2em] mt-1">Intelligent Kitchen Assistant</p>
        </div>

        <div className="space-y-8">
          {/* Section 1: The Mission */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <Heart size={16} className="text-red-500 fill-red-500" />
              <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.3em]">
                The Mission
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 font-medium">
              Pantry Guide was born out of a simple observation: we often have enough food in our kitchens to make a great meal, but we lack the inspiration to connect the dots. Our mission is to reduce food waste and celebrate Nigerian culinary heritage.
            </p>
          </section>

          {/* Section 2: Developer Info */}
          <section className="bg-slate-50 p-6 rounded-4xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <Code size={16} className="text-slate-900" />
              <h3 className="font-black text-slate-900 text-[10px] uppercase tracking-[0.3em]">
                Meet the Developer
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 font-medium mb-5">
              Designed and coded by <span className="text-slate-900 font-bold">Jolayemi Boluwatife</span>, a Junior Frontend Developer focused on building high-performance, user-centric web applications.
            </p>
            
            <div className="flex gap-3">
              <a 
                href="https://github.com/bolujolayemi-a11y" 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <ExternalLink size={14} /> GitHub
              </a>
              <a 
                href="https://linkedin.com/in/boluwatife-jolayemi-195593218" 
                target="_blank" 
                rel="noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                <User size={14} /> Profile
              </a>
            </div>
          </section>

          {/* Footer Info */}
          <div className="text-center pt-2">
            <p className="text-[9px] font-black uppercase text-slate-900 tracking-[0.4em]">
              Version 1.0.4 • Built with 🧡 in Nigeria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
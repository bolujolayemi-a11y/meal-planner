import React, { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

const PantryAccordion = ({ category, pantry, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItems = category.items.filter(item => pantry.includes(item));

  return (
    <div className="mb-3 bg-white rounded-4xl border border-slate-100 overflow-hidden shadow-sm transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50/50 rounded-2xl flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div className="text-left">
            <h3 className="font-black text-slate-800 text-sm tracking-tight">{category.label}</h3>
            <p className={`text-[9px] font-black uppercase tracking-widest ${selectedItems.length > 0 ? 'text-orange-500' : 'text-slate-300'}`}>
              {selectedItems.length}/{category.items.length} Ingredients
            </p>
          </div>
        </div>
        <ChevronRight className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-90 text-orange-500' : ''}`} size={18} />
      </button>

      {isOpen && (
        <div className="px-5 pb-6 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-300">
          {category.items.map(item => {
            const isSelected = pantry.includes(item);
            return (
              <button
                key={item}
                onClick={() => onToggle(item)}
                className={`px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border flex items-center gap-2
                  ${isSelected 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-100' 
                    : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-orange-200 hover:text-orange-500'}`}
              >
                {isSelected && <Check size={12} strokeWidth={4} />}
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PantryAccordion;
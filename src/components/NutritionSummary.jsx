import React, { useState } from 'react';
import { calculateRecipeNutrition } from '../utils/nutritionCalculator';
import { Info, Users, ShoppingCart, Share2 } from 'lucide-react';

const NutritionSummary = ({ recipeName, ingredients }) => {
  const [servings, setServings] = useState(1);
  const nutrition = calculateRecipeNutrition(ingredients, servings);

  const shareToWhatsApp = () => {
    const text = `Market List for ${recipeName}:\n${ingredients.join('\n')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-4xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-orange-500" />
          <span className="text-sm font-bold text-slate-700">{servings} Servings</span>
        </div>
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button onClick={() => setServings(Math.max(1, servings - 1))} className="px-3 py-1 font-bold">-</button>
          <button onClick={() => setServings(servings + 1)} className="px-3 py-1 font-bold">+</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-6">
        {[
          { label: 'Carbs', val: nutrition.carbs, unit: 'g' },
          { label: 'Protein', val: nutrition.protein, unit: 'g' },
          { label: 'Fats', val: nutrition.fat, unit: 'g' },
          { label: 'Fiber', val: nutrition.fiber, unit: 'g' }
        ].map((item) => (
          <div key={item.label} className="bg-orange-50/50 rounded-2xl py-3 text-center">
            <p className="text-[10px] font-black uppercase text-orange-400 tracking-tighter">{item.label}</p>
            <p className="text-sm font-black text-slate-800">{item.val}{item.unit}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <div>
          <p className="text-[10px] font-black uppercase text-slate-400">Total Energy</p>
          <p className="text-2xl font-black text-slate-900">{nutrition.calories} <span className="text-xs">kcal</span></p>
        </div>
        <button 
          onClick={shareToWhatsApp}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold text-xs hover:bg-orange-500 transition-all"
        >
          <Share2 size={16} />
          Share Market List
        </button>
      </div>
    </div>
  );
};

export default NutritionSummary;
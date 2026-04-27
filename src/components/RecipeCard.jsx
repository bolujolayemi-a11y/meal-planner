import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, AlertCircle, MapPin, 
  Heart, Utensils, ChefHat 
} from 'lucide-react';

const RecipeCard = ({ 
  recipe, 
  isFavorite, 
  isTried, 
  toggleFavorite, 
  toggleTried 
}) => {
  const navigate = useNavigate();

  const used = recipe.usedCount || 0;
  const missed = recipe.missedCount || 0;
  const totalIngredients = used + missed;
  
  const matchPercentage = totalIngredients > 0 
    ? (used / totalIngredients) * 100 
    : 0;
    
  const isComplete = missed === 0 && totalIngredients > 0;
  const fallbackImage = "https://images.unsplash.com/photo-1495195129352-aec325a55b65?q=80&w=800";

  return (
    <div className="bg-white border border-gray-100 rounded-4xl p-5 shadow-sm hover:shadow-xl transition-all group shrink-0 animate-in fade-in zoom-in duration-300">
      
      {/* Image Section */}
      <div className="relative h-44 mb-4 overflow-hidden rounded-3xl bg-gray-100 flex items-center justify-center">
        <img 
          src={recipe.image || fallbackImage} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
          alt={recipe.name} 
          loading="lazy" 
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />

        {/* --- NEW: Floating Interaction Buttons --- */}
        <div className="absolute top-3 left-3 flex gap-2 z-10">
          {/* Favorite Toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(recipe.id);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg cursor-pointer active:scale-90 ${
              isFavorite ? 'bg-orange-500 text-white' : 'bg-white/80 text-slate-400 hover:text-orange-500'
            }`}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>

          {/* Tried Toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleTried(recipe.id);
            }}
            className={`p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg cursor-pointer active:scale-90 ${
              isTried ? 'bg-green-500 text-white' : 'bg-white/80 text-slate-400 hover:text-green-500'
            }`}
          >
            <ChefHat size={16} />
          </button>
        </div>
        
        {/* Readiness Badge (Moved to bottom of image for better layout) */}
        <div className={`absolute bottom-3 left-3 text-[9px] px-3 py-1.5 rounded-full font-black uppercase flex items-center gap-1.5 shadow-lg backdrop-blur-md ${
          isComplete ? 'bg-green-500 text-white' : 'bg-white/90 text-orange-600'
        }`}>
          {isComplete ? (
            <><CheckCircle2 size={10} /> Ready to Cook</>
          ) : (
            <><AlertCircle size={10} /> {missed} Missing</>
          )}
        </div>

        {/* Top Right Local Badge */}
        {recipe.isLocal && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-[9px] px-2.5 py-1.5 rounded-xl font-black shadow-lg flex items-center gap-1 border border-orange-400">
            <MapPin size={10} fill="currentColor" />
            NG
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-1">
        <h3 className="font-bold text-lg mb-3 leading-tight text-slate-800 line-clamp-2 min-h-14">
          {recipe.name}
        </h3>

        {/* Ingredient Match Meter */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Match Progress</p>
            <span className="text-[10px] font-bold text-orange-600 font-mono">
              {used} / {totalIngredients}
            </span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-orange-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,122,0,0.4)]" 
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>

        <button 
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98] group-hover:gap-3 ${
            isTried ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-slate-900 text-white hover:bg-orange-500 hover:shadow-orange-200'
          }`}
        >
          {isTried ? 'Cooked! See again' : 'View Cooking Steps'}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
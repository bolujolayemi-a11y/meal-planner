import React, { useState } from 'react';
import { 
  Search, LayoutGrid, Heart, LogOut, ShoppingCart, 
  Utensils, ChevronRight, Check, ArrowRight, Mic, ChefHat,
  Globe, X 
} from 'lucide-react';
import RecipeCard from './RecipeCard';
import MarketList from './MarketList';
import { pantryCategories } from '../utils/pantryCategories';
import { translations, speechLangMap } from '../utils/translations';
import { nigerianRecipes } from '../nigerianData'; 

const HomeView = ({ 
  lang, setLang, userName, pantry, setPantry, localCount, ingredientCounts,
  inputValue, setInputValue, addIngredient, isLoading, recipes, onLogout, 
  favorites, tried, activeTab, setActiveTab, toggleFavorite, toggleTried, 
  shoppingList, removeFromShoppingList, clearShoppingList,
  apiCache // NEW: Received from App.jsx to show saved API recipes offline
}) => {
  
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const t = translations[lang] || translations.en;

  const allLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }, { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }, { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' }, { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' }, { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }, { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ].filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()));

  const getAvatarContent = (name) => {
    if (!name || name.toLowerCase() === 'guest') return 'G';
    return name.split(' ').filter(Boolean).map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // --- UPDATED LOGIC: Persistent Collections (Independent of Pantry Selection) ---
  const getDisplayRecipes = () => {
    if (activeTab === 'all') return recipes;

    const targetIds = activeTab === 'favorites' ? favorites : tried;

    // 1. Scan the whole Nigerian database (Static local file)
    const localSaved = nigerianRecipes
      .filter(r => targetIds.includes(r.id))
      .map(r => ({ ...r, isLocal: true }));
    
    // 2. Scan the API Cache (Saved MealDB items)
    // This uses the cached objects so they appear even if the current search is empty
    const apiSaved = targetIds
      .filter(id => apiCache && apiCache[id])
      .map(id => apiCache[id]);

    // Combine them and ensure no duplicates by ID
    const combined = [...localSaved, ...apiSaved];
    return Array.from(new Map(combined.map(item => [item.id, item])).values());
  };

  const displayRecipes = getDisplayRecipes();

  const handleTogglePantry = (item) => {
    const lowerItem = item.toLowerCase();
    if (pantry.includes(lowerItem)) {
      setPantry(pantry.filter(i => i !== lowerItem));
    } else {
      setPantry([...pantry, lowerItem]);
      setActiveTab('all'); 
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden flex-col md:flex-row w-full font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className={`w-24 border-r hidden md:flex flex-col items-center py-8 bg-white shrink-0 z-20 ${lang === 'ar' ? 'border-l border-r-0' : 'border-r'}`}>
        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg mb-10">
          {getAvatarContent(userName)}
        </div>
        
        <div className="flex flex-col items-center gap-10">
          <NavButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={<LayoutGrid size={22} />} label="Discover" />
          <NavButton active={activeTab === 'pantry'} onClick={() => setActiveTab('pantry')} icon={<Utensils size={22} />} label={t.pantry} badge={pantry.length} />
          
          <button onClick={() => setShowLangPicker(true)} className="flex flex-col items-center gap-1 text-gray-300 hover:text-orange-400 transition-all">
            <Globe size={22} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">Lang</span>
          </button>

          <NavButton active={activeTab === 'tried'} onClick={() => setActiveTab('tried')} icon={<ChefHat size={22} />} label={t.cooked} badge={tried.length} />
          <NavButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} icon={<Heart size={22} />} label={t.saved} badge={favorites.length} />
          <NavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<ShoppingCart size={22} />} label={t.market} badge={shoppingList.length} />
        </div>

        <button onClick={onLogout} className="mt-auto flex flex-col items-center gap-1 text-gray-300 hover:text-red-500 transition-colors pt-10">
          <LogOut size={22} />
          <span className="text-[10px] font-black uppercase tracking-tighter">{t.exit}</span>
        </button>
      </aside>

      {/* --- MOBILE BOTTOM NAV --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 flex items-center justify-around py-4 px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('all')} className={`flex flex-col items-center gap-1 ${activeTab === 'all' ? 'text-orange-500' : 'text-gray-300'}`}>
          <LayoutGrid size={20} />
          <span className="text-[9px] font-bold uppercase">Discover</span>
        </button>
        <button onClick={() => setActiveTab('pantry')} className={`relative flex flex-col items-center gap-1 ${activeTab === 'pantry' ? 'text-orange-500' : 'text-gray-300'}`}>
          <Utensils size={20} />
          {pantry.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">{pantry.length}</span>}
          <span className="text-[9px] font-bold uppercase">{t.pantry}</span>
        </button>
        <button onClick={() => setActiveTab('favorites')} className={`relative flex flex-col items-center gap-1 ${activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-300'}`}>
          <Heart size={20} />
          {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">{favorites.length}</span>}
          <span className="text-[9px] font-bold uppercase">{t.saved}</span>
        </button>
        <button onClick={() => setActiveTab('market')} className={`relative flex flex-col items-center gap-1 ${activeTab === 'market' ? 'text-orange-500' : 'text-gray-300'}`}>
          <ShoppingCart size={20} />
          {shoppingList.length > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center border border-white">{shoppingList.length}</span>}
          <span className="text-[9px] font-bold uppercase">{t.market}</span>
        </button>
        <button onClick={() => setShowLangPicker(true)} className="flex flex-col items-center gap-1 text-gray-300">
           <Globe size={20} />
           <span className="text-[9px] font-bold uppercase">Lang</span>
        </button>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full relative pb-32 md:pb-10">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight capitalize">
                {activeTab === 'all' ? 'Recipe Finder' : (t[activeTab] || activeTab)}
              </h1>
              <p className="text-slate-400 font-medium italic text-xs mt-1">
                Welcome back, {userName}!
              </p>
            </div>
            
            <div className="md:hidden flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">
                {getAvatarContent(userName)}
              </div>
              <button onClick={onLogout} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                <LogOut size={18} />
              </button>
            </div>
          </div>

          {activeTab === 'all' && (
             <div className="flex gap-2 w-full lg:w-80">
              <div className="relative flex-1">
                <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400 w-4 h-4`} />
                <input className={`w-full ${lang === 'ar' ? 'pr-11 pl-4 text-right' : 'pl-11 pr-4'} py-3.5 bg-gray-100 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-orange-500/20`} placeholder={t.search} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addIngredient} />
              </div>
            </div>
          )}
        </header>

        {activeTab === 'market' ? (
          <MarketList list={shoppingList} onRemove={removeFromShoppingList} onClear={clearShoppingList} />
        ) : activeTab === 'pantry' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3 pb-20">
              {pantryCategories.map(cat => (
                <PantryAccordion key={cat.id} category={cat} pantry={pantry} onToggle={handleTogglePantry} />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {displayRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {displayRecipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} lang={lang} isFavorite={favorites.includes(recipe.id)} isTried={tried.includes(recipe.id)} toggleFavorite={toggleFavorite} toggleTried={toggleTried} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                  {activeTab === 'all' ? <Utensils size={32} className="text-slate-200" /> : activeTab === 'favorites' ? <Heart size={32} className="text-slate-200" /> : <ChefHat size={32} className="text-slate-200" />}
                </div>
                
                <h3 className="text-slate-800 font-black text-xl mb-2">
                  {activeTab === 'all' ? "No ingredients selected" : activeTab === 'favorites' ? "No favorites yet" : "No attempted recipes"}
                </h3>
                
                <button 
                  onClick={() => setActiveTab(activeTab === 'all' ? 'pantry' : 'all')} 
                  className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-orange-500 transition-all active:scale-95"
                >
                  {activeTab === 'all' ? "Go to Pantry" : "Go Discover Recipes"}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

        {showLangPicker && (
          <div className="fixed inset-0 z-100 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-4xl p-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black">Select Language</h2>
                <button onClick={() => setShowLangPicker(false)}><X size={20} /></button>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {allLanguages.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setShowLangPicker(false); }} className={`w-full p-4 flex items-center justify-between rounded-xl border transition-all ${lang === l.code ? 'border-orange-500 bg-orange-50' : 'border-slate-100 hover:border-orange-200'}`}>
                    <span className="font-bold">{l.flag} {l.name}</span>
                    {lang === l.code && <Check size={16} className="text-orange-500" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label, badge }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 relative transition-all ${active ? 'text-orange-500' : 'text-gray-300 hover:text-orange-400'}`}>
    {icon}
    {badge > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">{badge}</span>}
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const PantryAccordion = ({ category, pantry, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between hover:bg-slate-50/50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-orange-50/50 rounded-xl flex items-center justify-center text-xl">{category.icon}</div>
          <h3 className="font-black text-slate-800 text-sm">{category.label}</h3>
        </div>
        <ChevronRight className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} size={16} />
      </button>
      {isOpen && (
        <div className="px-4 pb-5 flex flex-wrap gap-2">
          {category.items.map(item => {
            const isSelected = pantry.includes(item.toLowerCase());
            return (
              <button key={item} onClick={() => onToggle(item)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${isSelected ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-orange-500'}`}>
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeView;
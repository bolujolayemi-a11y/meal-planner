import React, { useState } from 'react';
import { 
  Search, LayoutGrid, Heart, LogOut, ShoppingCart, 
  Utensils, ChevronRight, Check, ArrowRight, ChefHat,
  Globe, X, Trash2, Share2, Settings 
} from 'lucide-react';
import RecipeCard from './RecipeCard';
import MarketList from './MarketList';
import ShareModal from './ShareModal';
import AboutModal from './AboutModal'; 
import { pantryCategories } from '../utils/pantryCategories';
import { translations } from '../utils/translations';
import { nigerianRecipes } from '../nigerianData'; 

const HomeView = ({ 
  lang, setLang, userName, pantry, setPantry,
  inputValue, setInputValue, addIngredient, isLoading, recipes, onLogout, 
  favorites, tried, activeTab, setActiveTab, toggleFavorite, toggleTried, 
  shoppingList, removeFromShoppingList, clearShoppingList, apiCache 
}) => {
  
  // Modal States
  const [showSettings, setShowSettings] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  
  const [langSearch, setLangSearch] = useState('');
  const t = translations[lang] || translations.en;

  // --- CUSTOM INGREDIENTS LOGIC ---
  const officialItems = pantryCategories.flatMap(cat => cat.items.map(i => i.toLowerCase()));
  const customItems = pantry.filter(item => !officialItems.includes(item.toLowerCase()));

  const displayCategories = customItems.length > 0 
    ? [...pantryCategories, { id: 'custom', label: 'My Custom Ingredients', icon: '🔍', items: customItems }]
    : pantryCategories;

  const getAvatarContent = (name) => {
    if (!name || name.toLowerCase() === 'guest') return 'G';
    return name.split(' ').filter(Boolean).map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayRecipes = () => {
    if (activeTab === 'all') return recipes;
    const targetIds = activeTab === 'favorites' ? favorites : tried;
    const localSaved = nigerianRecipes.filter(r => targetIds.includes(r.id)).map(r => ({ ...r, isLocal: true }));
    const apiSaved = targetIds.filter(id => apiCache && apiCache[id]).map(id => apiCache[id]);
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
      if (activeTab !== 'pantry') setActiveTab('all'); 
    }
  };

  const allLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }, { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }, { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' }, { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' }, { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }, { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ].filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()));

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
          <NavButton active={activeTab === 'tried'} onClick={() => setActiveTab('tried')} icon={<ChefHat size={22} />} label={t.cooked} badge={tried.length} />
          <NavButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} icon={<Heart size={22} />} label={t.saved} badge={favorites.length} />
          <NavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<ShoppingCart size={22} />} label={t.market} badge={shoppingList.length} />
          <NavButton active={showSettings} onClick={() => setShowSettings(true)} icon={<Settings size={22} />} label="Settings" />
        </div>
        <button onClick={onLogout} className="mt-auto flex flex-col items-center gap-1 text-gray-300 hover:text-red-500 pt-10 transition-colors">
          <LogOut size={22} /><span className="text-[10px] font-black uppercase">{t.exit}</span>
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full relative pb-24 md:pb-10">
        
        {/* MOBILE HEADER */}
        <div className="flex md:hidden items-center justify-between mb-6 pt-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
            {getAvatarContent(userName)}
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-500 rounded-xl transition-colors active:scale-95">
             <span className="text-[10px] font-black uppercase tracking-widest">{t.exit}</span>
             <LogOut size={18} />
          </button>
        </div>

        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight capitalize">
              {activeTab === 'all' ? 'Discover' : (t[activeTab] || activeTab)}
            </h1>
            <p className="text-slate-400 font-medium italic text-xs mt-1 tracking-wide">
               {activeTab === 'all' ? `Find your next meal, ${userName}` : `Managing your ${activeTab}`}
            </p>
          </div>

          {activeTab === 'all' && (
             <div className="flex gap-2 w-full lg:w-80">
              <div className="relative flex-1">
                <Search className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-3.5 text-gray-400 w-4 h-4`} />
                <input className="w-full pl-11 pr-4 py-3.5 bg-gray-100 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-orange-500/20" placeholder={t.search} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addIngredient} />
              </div>
            </div>
          )}
        </header>

        <div className="pb-8">
          {activeTab === 'market' ? (
            <MarketList list={shoppingList} onRemove={removeFromShoppingList} onClear={clearShoppingList} />
          ) : activeTab === 'pantry' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
              {displayCategories.map(cat => (
                <PantryAccordion key={cat.id} category={cat} pantry={pantry} onToggle={handleTogglePantry} isCustom={cat.id === 'custom'} />
              ))}
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mb-4" />
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">Searching...</p>
                </div>
              ) : displayRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {displayRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} lang={lang} isFavorite={favorites.includes(recipe.id)} isTried={tried.includes(recipe.id)} toggleFavorite={toggleFavorite} toggleTried={toggleTried} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border-2 border-dashed border-slate-200">
                    {activeTab === 'all' ? <Search className="text-slate-200" size={32} /> : <ChefHat className="text-slate-200" size={32} />}
                  </div>
                  <h3 className="text-slate-800 font-black text-xl mb-2">{activeTab === 'all' ? 'No Recipes Found' : 'Nothing here yet'}</h3>
                  <button onClick={() => setActiveTab(activeTab === 'all' ? 'pantry' : 'all')} className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-lg active:scale-95">
                    {activeTab === 'all' ? 'Manage Pantry' : 'Discover Recipes'}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- MOBILE BOTTOM NAV --- */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex md:hidden items-center justify-around py-3 px-2 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
          <MobileNavButton active={activeTab === 'all'} onClick={() => setActiveTab('all')} icon={<LayoutGrid size={20} />} />
          <MobileNavButton active={activeTab === 'pantry'} onClick={() => setActiveTab('pantry')} icon={<Utensils size={20} />} badge={pantry.length} />
          <MobileNavButton active={activeTab === 'tried'} onClick={() => setActiveTab('tried')} icon={<ChefHat size={20} />} badge={tried.length} />
          <MobileNavButton active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} icon={<Heart size={20} />} badge={favorites.length} />
          <MobileNavButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<ShoppingCart size={20} />} badge={shoppingList.length} />
          <MobileNavButton active={showSettings} onClick={() => setShowSettings(true)} icon={<Settings size={20} />} />
        </nav>
      </main>

      {/* --- MASTER SETTINGS MODAL --- */}
      {showSettings && (
        <div className="fixed inset-0 z-100 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[40px] p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={() => { setShowLangPicker(true); setShowSettings(false); }}
                className="w-full p-5 flex items-center justify-between bg-slate-50 rounded-2xl group hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Globe size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-slate-800 tracking-tight">App Language</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{allLanguages.find(l => l.code === lang)?.name}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>

              <button 
                onClick={() => { setShowShareModal(true); setShowSettings(false); }}
                className="w-full p-5 flex items-center justify-between bg-slate-50 rounded-2xl group hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Share2 size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-slate-800 tracking-tight">Invite Friends</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Share QR or Link</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>

              <button 
                onClick={() => { setShowAbout(true); setShowSettings(false); }}
                className="w-full p-5 flex items-center justify-between bg-slate-50 rounded-2xl group hover:bg-orange-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <ChefHat size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-black text-sm text-slate-800 tracking-tight">About Pantry Guide</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Our Mission & Dev</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Modals */}
      {showLangPicker && (
        <div className="fixed inset-0 z-110 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-4xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => { setShowLangPicker(false); setShowSettings(true); }} className="text-slate-400 hover:text-slate-900 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
                 Back
              </button>
              <h2 className="text-xl font-black">Language</h2>
              <button onClick={() => setShowLangPicker(false)}><X size={20} /></button>
            </div>
            <div className="max-h-80 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {allLanguages.map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setShowLangPicker(false); }} className={`w-full p-4 flex items-center justify-between rounded-2xl border ${lang === l.code ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}>
                  <span className="font-bold">{l.flag} {l.name}</span>
                  {lang === l.code && <Check size={18} className="text-orange-600" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label, badge }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 relative transition-all ${active ? 'text-orange-500 scale-105' : 'text-gray-300 hover:text-orange-400'}`}>
    {icon}
    {badge > 0 && <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white font-black">{badge}</span>}
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);

const MobileNavButton = ({ active, onClick, icon, badge }) => (
  <button onClick={onClick} className={`p-3 relative transition-all rounded-2xl ${active ? 'text-orange-500 bg-orange-50' : 'text-slate-300 active:scale-90'}`}>
    {icon}
    {badge > 0 && (
      <span className="absolute top-2 right-2 bg-orange-600 text-white text-[7px] min-w-3.5 h-3.5 px-1 rounded-full flex items-center justify-center font-black border border-white">
        {badge}
      </span>
    )}
  </button>
);

const PantryAccordion = ({ category, pantry, onToggle, isCustom }) => {
  const [isOpen, setIsOpen] = useState(isCustom);
  return (
    <div className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${isCustom ? 'border-orange-200 bg-orange-50/10' : 'border-slate-100'}`}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-4 flex items-center justify-between group">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-colors ${isCustom ? 'bg-orange-500 text-white' : 'bg-orange-50/50 group-hover:bg-orange-100/50'}`}>
            {category.icon}
          </div>
          <h3 className="font-black text-slate-800 text-sm tracking-tight">{category.label}</h3>
        </div>
        <ChevronRight className={`text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} size={16} />
      </button>
      {isOpen && (
        <div className="px-4 pb-5 flex flex-wrap gap-2 animate-in slide-in-from-top-2 duration-300">
          {category.items.map(item => {
            const isSelected = pantry.includes(item.toLowerCase());
            return (
              <button 
                key={item} 
                onClick={() => onToggle(item)} 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all flex items-center gap-2 ${
                  isSelected 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                    : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-orange-300'
                }`}
              >
                {item}
                {isCustom && <Trash2 size={10} className={isSelected ? 'text-white/80' : 'text-slate-300'} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeView;
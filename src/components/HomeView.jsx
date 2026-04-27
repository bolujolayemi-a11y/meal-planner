import React, { useState } from 'react';
import { 
  Search, X, Loader2, LayoutGrid, Utensils, Heart, 
  LogOut, Plus, ChefHat, PanelRightClose, PanelRightOpen 
} from 'lucide-react';
import RecipeCard from './RecipeCard';

const HomeView = ({ 
  userName, // Received from App.jsx
  pantry, setPantry, inputValue, setInputValue, addIngredient, 
  isLoading, recipes, onLogout,
  favorites, tried, activeTab, setActiveTab, toggleFavorite, toggleTried 
}) => {
  const [isPantryVisible, setIsPantryVisible] = useState(true);

  // Helper to generate initials or show "G" for Guest
  const getAvatarContent = (name) => {
    if (!name || name.toLowerCase() === 'guest') return 'G';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const commonIngredients = [
    { name: 'Rice', icon: '🍚' },
    { name: 'Beans', icon: '🫘' },
    { name: 'Chicken', icon: '🍗' },
    { name: 'Yam', icon: '🍠' },
    { name: 'Spinach', icon: '🥬' },
    { name: 'Tomato', icon: '🍅' },
    { name: 'Egg', icon: '🥚' },
    { name: 'Fish', icon: '🐟' },
  ];

  const filteredRecipes = recipes.filter(recipe => {
    if (activeTab === 'favorites') return favorites.includes(recipe.id);
    if (activeTab === 'tried') return tried.includes(recipe.id);
    return true; 
  });

  const handleQuickAdd = (item) => {
    const lowerItem = item.toLowerCase();
    if (!pantry.includes(lowerItem)) {
      setPantry(prev => [...prev, lowerItem]);
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] overflow-hidden flex-col md:flex-row w-full font-sans">
      
      {/* Left Navigation (Desktop) */}
      <aside className="w-24 border-r hidden md:flex flex-col items-center py-8 gap-8 bg-white shrink-0 z-20">
        
        {/* Dynamic User Avatar */}
        <div 
          title={userName}
          className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg mb-4 animate-in zoom-in duration-500"
        >
          {getAvatarContent(userName)}
        </div>
        
        <button 
          onClick={() => setActiveTab('all')}
          className="flex flex-col items-center gap-1 group transition-all"
        >
          <LayoutGrid className={`transition-all ${activeTab === 'all' ? 'text-orange-500' : 'text-gray-300 group-hover:text-orange-400'}`} size={22} />
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTab === 'all' ? 'text-orange-500' : 'text-gray-300'}`}>Discover</span>
        </button>

        <button 
          onClick={() => setActiveTab('tried')}
          className="flex flex-col items-center gap-1 group transition-all"
        >
          <ChefHat className={`transition-all ${activeTab === 'tried' ? 'text-orange-500' : 'text-gray-300 group-hover:text-orange-400'}`} size={22} />
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTab === 'tried' ? 'text-orange-500' : 'text-gray-300'}`}>Cooked</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('favorites')}
          className="flex flex-col items-center gap-1 group transition-all"
        >
          <Heart className={`transition-all ${activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-300 group-hover:text-orange-400'}`} size={22} />
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-300'}`}>Saved</span>
        </button>

        <button onClick={onLogout} className="mt-auto flex flex-col items-center gap-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer mb-4">
          <LogOut size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Log Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full transition-all duration-500">
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center justify-between lg:justify-start gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-4">
               {/* Mobile-only avatar */}
               <div className="md:hidden w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
                {getAvatarContent(userName)}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {activeTab === 'all' && "Recipe Finder"}
                  {activeTab === 'favorites' && "Saved Recipes"}
                  {activeTab === 'tried' && "Cooking History"}
                </h1>
                <p className="text-gray-400 font-medium italic text-xs md:text-sm mt-1">
                  {activeTab === 'all' ? `Welcome back, ${userName || 'Guest'}!` : `Viewing your ${activeTab} collection.`}
                </p>
              </div>
            </div>

            <div className="hidden xl:flex items-center gap-3 ml-6 group">
              <button 
                onClick={() => setIsPantryVisible(!isPantryVisible)}
                className="p-2.5 bg-white border border-gray-100 shadow-sm rounded-xl text-gray-400 hover:text-orange-500 transition-all cursor-pointer"
              >
                {isPantryVisible ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
              </button>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isPantryVisible ? "Hide Pantry" : "Show Pantry"}
              </span>
            </div>
          </div>
          
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
            <input 
              className="w-full pl-11 pr-4 py-3.5 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 border-none font-medium text-sm" 
              placeholder="Search ingredient..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={addIngredient} 
            />
          </div>
        </header>

        {/* Mobile Horizontal Pantry */}
        <div className="xl:hidden mb-8">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Pantry</h2>
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
            {commonIngredients.map((item) => (
              <button
                key={item.name}
                onClick={() => handleQuickAdd(item.name)}
                className="shrink-0 flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm active:scale-95"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-bold text-slate-700">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 min-h-10">
          {pantry.length > 0 ? pantry.map(item => (
            <span key={item} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full font-bold text-[10px] uppercase shadow-lg">
              {item}
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-orange-500" onClick={() => setPantry(pantry.filter(i => i !== item))} />
            </span>
          )) : (
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest self-center">No active pantry filters</p>
          )}
        </div>

        {/* Grid Container */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 text-orange-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="font-bold text-xs uppercase">Updating Grid...</p>
          </div>
        ) : (
          <div className={`grid gap-6 pb-10 transition-all duration-500 ${
            isPantryVisible 
              ? 'grid-cols-1 sm:grid-cols-2' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  isFavorite={favorites.includes(recipe.id)}
                  isTried={tried.includes(recipe.id)}
                  toggleFavorite={toggleFavorite}
                  toggleTried={toggleTried}
                />
              ))
            ) : (
              <div className="col-span-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-[40px] bg-gray-50/20 text-gray-300">
                <ChefHat size={40} className="mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-[10px]">Nothing to show in {activeTab}</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Right Sidebar (Desktop Only) */}
      <aside className={`bg-white border-l hidden xl:flex flex-col gap-8 overflow-y-auto shrink-0 transition-all duration-500 ease-in-out ${
        isPantryVisible ? 'w-80 p-8' : 'w-0 p-0 border-none opacity-0 overflow-hidden'
      }`}>
        <div className="w-64">
          <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.25em] mb-8 border-b pb-4">
            Quick Pantry
          </h2>
          <div className="space-y-3">
            {commonIngredients.map((item) => (
              <button
                key={item.name}
                onClick={() => handleQuickAdd(item.name)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-orange-100"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
                  <span className="text-sm font-bold text-slate-700">{item.name}</span>
                </div>
                <Plus size={16} className="text-gray-300 group-hover:text-orange-500" />
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden border-t bg-white flex justify-around items-center py-3 px-6 shrink-0 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('all')} className="flex flex-col items-center gap-1">
          <LayoutGrid size={20} className={activeTab === 'all' ? 'text-orange-500' : 'text-gray-300'} />
          <span className={`text-[9px] font-black uppercase ${activeTab === 'all' ? 'text-orange-500' : 'text-gray-300'}`}>Discover</span>
        </button>
        <button onClick={() => setActiveTab('tried')} className="flex flex-col items-center gap-1">
          <ChefHat size={20} className={activeTab === 'tried' ? 'text-orange-500' : 'text-gray-300'} />
          <span className={`text-[9px] font-black uppercase ${activeTab === 'tried' ? 'text-orange-500' : 'text-gray-300'}`}>Cooked</span>
        </button>
        <button onClick={() => setActiveTab('favorites')} className="flex flex-col items-center gap-1">
          <Heart size={20} className={activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-300'} />
          <span className={`text-[9px] font-black uppercase ${activeTab === 'favorites' ? 'text-orange-500' : 'text-gray-300'}`}>Saved</span>
        </button>
      </div>

    </div>
  );
};

export default HomeView;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import RecipeDetails from './pages/RecipeDetails';
import HomeView from './components/HomeView';
import { nigerianRecipes } from './nigerianData';
import { ingredientAliases } from './utils/ingredientMap'; 

const App = () => {
  // --- AUTH & USER STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [lang, setLang] = useState(localStorage.getItem('user_lang') || 'en');

  // --- APP FUNCTIONAL STATE ---
  const [pantry, setPantry] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); 

  // --- PRE-CALCULATE RECIPES PER INGREDIENT ---
  const ingredientCounts = useMemo(() => {
    const counts = {};
    nigerianRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const name = (typeof ing === 'string' ? ing : ing.item).toLowerCase();
        counts[name] = (counts[name] || 0) + 1;
      });
    });
    return counts;
  }, []);

  // --- COLLECTIONS & USER-SPECIFIC PERSISTENCE ---
  const [shoppingList, setShoppingList] = useState(() => {
    const user = localStorage.getItem('userName') || 'guest';
    const saved = localStorage.getItem(`market_list_${user}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const user = localStorage.getItem('userName') || 'guest';
    const saved = localStorage.getItem(`favRecipes_${user}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [tried, setTried] = useState(() => {
    const user = localStorage.getItem('userName') || 'guest';
    const saved = localStorage.getItem(`triedRecipes_${user}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [apiCache, setApiCache] = useState(() => {
    const user = localStorage.getItem('userName') || 'guest';
    const saved = localStorage.getItem(`apiCache_${user}`);
    return saved ? JSON.parse(saved) : {};
  });

  // --- SYNC TO LOCALSTORAGE ---
  useEffect(() => {
    const user = userName || 'guest';
    localStorage.setItem(`favRecipes_${user}`, JSON.stringify(favorites));
    localStorage.setItem(`triedRecipes_${user}`, JSON.stringify(tried));
    localStorage.setItem(`market_list_${user}`, JSON.stringify(shoppingList));
    localStorage.setItem(`apiCache_${user}`, JSON.stringify(apiCache));
    localStorage.setItem('userName', userName);
    localStorage.setItem('user_lang', lang);
  }, [favorites, tried, userName, shoppingList, lang, apiCache]);

  // --- AUTH HANDLERS ---
  const handleAuth = (name, selectedLang) => {
    const identifier = name || 'Guest';
    const savedFavs = localStorage.getItem(`favRecipes_${identifier}`);
    const savedTried = localStorage.getItem(`triedRecipes_${identifier}`);
    const savedMarket = localStorage.getItem(`market_list_${identifier}`);
    const savedCache = localStorage.getItem(`apiCache_${identifier}`);

    setFavorites(savedFavs ? JSON.parse(savedFavs) : []);
    setTried(savedTried ? JSON.parse(savedTried) : []);
    setShoppingList(savedMarket ? JSON.parse(savedMarket) : []);
    setApiCache(savedCache ? JSON.parse(savedCache) : {});

    if (selectedLang) setLang(selectedLang);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', identifier);
    setUserName(identifier);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setUserName('');
    setIsLoggedIn(false);
    setPantry([]); 
    setFavorites([]);
    setTried([]);
    setShoppingList([]);
    setApiCache({});
  };

  // --- SEARCH ENGINE WITH FALLBACK LOGIC ---
  const searchRecipes = useCallback(async (ingredientsList) => {
    if (ingredientsList.length === 0) {
      setRecipes([]);
      return;
    }
    setIsLoading(true);
    try {
      const expandedSearch = ingredientsList.flatMap(ing => {
        const alias = ingredientAliases[ing.toLowerCase()];
        return alias ? [ing.toLowerCase(), alias] : [ing.toLowerCase()];
      });

      // 1. Local Nigerian Search
      const localMatches = nigerianRecipes.map(recipe => {
        const matched = recipe.ingredients.filter(ing => {
          const ingName = (typeof ing === 'string' ? ing : ing.item).toLowerCase();
          return expandedSearch.includes(ingName);
        });
        return { 
          ...recipe, 
          usedCount: matched.length, 
          missedCount: recipe.ingredients.length - matched.length, 
          isLocal: true 
        };
      }).filter(recipe => recipe.usedCount > 0);

      // 2. Global API Search (MealDB) with Fallback
      const lastIng = ingredientsList[ingredientsList.length - 1].toLowerCase();
      const apiQuery = ingredientAliases[lastIng] || lastIng;

      // Try filtering by primary ingredient first
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${apiQuery.replace(' ', '_')}`);
      let data = await res.json();

      // FALLBACK: If ingredient filter fails, search by Name (better for items like Pasta/Vermicelli)
      if (!data.meals) {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${lastIng.replace(' ', '_')}`);
        data = await res.json();
      }

      let formattedApi = [];
      if (data.meals) {
        formattedApi = data.meals.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          usedCount: 1, 
          missedCount: 0, 
          isLocal: false
        }));
      }
      setRecipes([...localMatches, ...formattedApi].sort((a, b) => b.usedCount - a.usedCount));
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => searchRecipes(pantry), 400);
    return () => clearTimeout(timer);
  }, [pantry, searchRecipes]);

  // --- SOCIAL & COLLECTION HANDLERS ---
  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(id);
      if (isAdding) {
        const fullRecipe = recipes.find(r => r.id === id);
        if (fullRecipe && !fullRecipe.isLocal) {
          setApiCache(cache => ({ ...cache, [id]: fullRecipe }));
        }
      }
      return isAdding ? [...prev, id] : prev.filter(item => item !== id);
    });
  };

  const toggleTried = (id) => {
    setTried(prev => {
      const isAdding = !prev.includes(id);
      if (isAdding) {
        const fullRecipe = recipes.find(r => r.id === id);
        if (fullRecipe && !fullRecipe.isLocal) {
          setApiCache(cache => ({ ...cache, [id]: fullRecipe }));
        }
      }
      return isAdding ? [...prev, id] : prev.filter(item => item !== id);
    });
  };

  const addToShoppingList = (item) => {
    setShoppingList(prev => prev.includes(item) ? prev : [...prev, item]);
  };

  const removeFromShoppingList = (item) => {
    setShoppingList(prev => prev.filter(i => i !== item));
  };

  const addIngredient = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const items = inputValue.split(',').map(i => i.trim().toLowerCase()).filter(i => i !== "" && !pantry.includes(i));
      if (items.length > 0) {
        setPantry(prev => [...prev, ...items]);
        setActiveTab('all');
      }
      setInputValue('');
    }
  };

  return (
    <Routes>
      <Route path="/signup" element={!isLoggedIn ? <Signup onAuth={handleAuth} /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      <Route path="/" element={
        isLoggedIn ? (
          <HomeView 
            lang={lang} setLang={setLang} userName={userName}
            pantry={pantry} setPantry={setPantry} 
            apiCache={apiCache} ingredientCounts={ingredientCounts}
            inputValue={inputValue} setInputValue={setInputValue} 
            addIngredient={addIngredient} isLoading={isLoading} 
            recipes={recipes} onLogout={handleLogout}
            favorites={favorites} tried={tried}
            activeTab={activeTab} setActiveTab={setActiveTab}
            toggleFavorite={toggleFavorite} toggleTried={toggleTried}
            shoppingList={shoppingList}
            removeFromShoppingList={removeFromShoppingList}
            clearShoppingList={() => setShoppingList([])}
          />
        ) : (
          <Navigate to="/signup" />
        )
      } />

      <Route path="/recipe/:id" element={
        isLoggedIn ? (
          <RecipeDetails lang={lang} addToShoppingList={addToShoppingList} shoppingList={shoppingList} />
        ) : (
          <Navigate to="/signup" />
        )
      } />
    </Routes>
  );
};

export default App;
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import RecipeDetails from './pages/RecipeDetails';
import HomeView from './components/HomeView';
import { nigerianRecipes } from './nigerianData';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || ''); // New: Track user name
  const [pantry, setPantry] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // State for Favorites, Tried, and Navigation Tabs
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favRecipes')) || []);
  const [tried, setTried] = useState(() => JSON.parse(localStorage.getItem('triedRecipes')) || []);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'favorites', 'tried'

  // Persistence: Check Auth and Sync User Collections
  useEffect(() => {
    const user = localStorage.getItem('isLoggedIn');
    if (user === 'true') setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('favRecipes', JSON.stringify(favorites));
    localStorage.setItem('triedRecipes', JSON.stringify(tried));
    localStorage.setItem('userName', userName); // Keep name synced
  }, [favorites, tried, userName]);

  const handleAuth = (name) => {
    const identifier = name || 'Guest';
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
  };

  // Functions to toggle Recipe Status
  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleTried = (id) => {
    setTried(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const searchRecipes = useCallback(async (ingredientsList) => {
    if (ingredientsList.length === 0) {
      setRecipes([]);
      return;
    }
    setIsLoading(true);
    try {
      const localMatches = nigerianRecipes.map(recipe => {
        const matched = recipe.ingredients.filter(ing => ingredientsList.includes(ing.toLowerCase()));
        return { 
          ...recipe, 
          usedCount: matched.length, 
          missedCount: recipe.ingredients.length - matched.length, 
          isLocal: true 
        };
      }).filter(recipe => recipe.usedCount > 0);

      const mainQuery = ingredientsList[0].replace(' ', '_');
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainQuery}`);
      const data = await response.json();

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
      setRecipes([...localMatches, ...formattedApi]);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => searchRecipes(pantry), 400);
    return () => clearTimeout(timer);
  }, [pantry, searchRecipes]);

  const addIngredient = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      const items = inputValue.split(',').map(i => i.trim().toLowerCase()).filter(i => i !== "" && !pantry.includes(i));
      setPantry(prev => [...prev, ...items]);
      setInputValue('');
    }
  };

  return (
    <Routes>
      <Route path="/signup" element={!isLoggedIn ? <Signup onAuth={handleAuth} /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        isLoggedIn ? (
          <HomeView 
            userName={userName} // Passing down the name for the Avatar
            pantry={pantry} 
            setPantry={setPantry} 
            inputValue={inputValue} 
            setInputValue={setInputValue} 
            addIngredient={addIngredient} 
            isLoading={isLoading} 
            recipes={recipes} 
            onLogout={handleLogout}
            favorites={favorites}
            tried={tried}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleFavorite={toggleFavorite}
            toggleTried={toggleTried}
          />
        ) : (
          <Navigate to="/signup" />
        )
      } />

      <Route path="/recipe/:id" element={isLoggedIn ? <RecipeDetails /> : <Navigate to="/signup" />} />
    </Routes>
  );
};

export default App;
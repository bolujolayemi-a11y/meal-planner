import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Loader2, MapPin, Info, 
  Check, ShoppingCart, Plus, Minus 
} from 'lucide-react';
import { nigerianRecipes } from '../nigerianData';
import { calculateRecipeNutrition } from '../utils/nutritionCalculator';
import { translations, translateAPI } from '../utils/translations';

const RecipeDetails = ({ lang, addToShoppingList, shoppingList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [baseDetails, setBaseDetails] = useState(null); 
  const [displayDetails, setDisplayDetails] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(1);

  const t = translations[lang] || translations.en;

  // --- 1. DATA FETCHING ---
  useEffect(() => {
    const getData = async () => {
      window.scrollTo(0, 0);
      const local = nigerianRecipes.find(r => r.id === id);
      
      if (local) {
        setBaseDetails({ 
          title: local.name, 
          image: local.image, 
          isLocal: true,
          extendedIngredients: local.ingredients.map(ing => ({ 
            original: `${ing.quantity} ${ing.unit} ${ing.item}`,
            quantity: ing.quantity
          })), 
          analyzedInstructions: [{ steps: local.steps }]
        });
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          const meal = data.meals[0];
          
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
              ingredients.push({ 
                original: `${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}` 
              });
            }
          }
          
          const steps = meal.strInstructions
            .split(/\r?\n|\.\s+/)
            .filter(s => s.length > 10)
            .map((s, idx) => ({ number: idx + 1, step: s }));

          setBaseDetails({ 
            title: meal.strMeal, 
            image: meal.strMealThumb, 
            extendedIngredients: ingredients, 
            analyzedInstructions: [{ steps }], 
            isLocal: false 
          });
        } catch (e) { 
          console.error(e); 
        } finally { 
          setLoading(false); 
        }
      }
    };
    getData();
  }, [id]);

  // --- 2. DYNAMIC TRANSLATION ---
  useEffect(() => {
    const translateContent = async () => {
      if (!baseDetails) return;
      if (lang === 'en') { setDisplayDetails(baseDetails); return; }

      setLoading(true);
      try {
        const translatedTitle = await translateAPI(baseDetails.title, lang);
        const translatedSteps = await Promise.all(
          baseDetails.analyzedInstructions[0].steps.map(async s => ({
            ...s,
            step: await translateAPI(s.step, lang)
          }))
        );
        const translatedIngredients = await Promise.all(
          baseDetails.extendedIngredients.map(async i => ({
            ...i,
            original: await translateAPI(i.original, lang)
          }))
        );

        setDisplayDetails({ 
          ...baseDetails, 
          title: translatedTitle, 
          extendedIngredients: translatedIngredients, 
          analyzedInstructions: [{ steps: translatedSteps }] 
        });
      } catch (err) {
        setDisplayDetails(baseDetails);
      } finally {
        setLoading(false);
      }
    };
    translateContent();
  }, [baseDetails, lang]);

  // Logic to multiply numbers in ingredients based on portions
  const formatIngredientText = (ing) => {
    return ing.original.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match) * servings;
      return num % 1 === 0 ? num : num.toFixed(1);
    });
  };

  if (loading || !displayDetails) return (
    <div className="h-screen flex flex-col items-center justify-center text-orange-500">
      <Loader2 className="animate-spin w-10 h-10 mb-4" />
      <p className="font-black uppercase tracking-widest text-[10px]">Updating Recipe...</p>
    </div>
  );

  const nutrition = calculateRecipeNutrition(baseDetails.extendedIngredients.map(i => i.original), servings);

  return (
    <div className="min-h-screen bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="relative h-80">
        <img src={displayDetails.image} className="w-full h-full object-cover" alt={displayDetails.title} />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white">
          <ChevronLeft size={24} />
        </button>
      </div>

      <main className="p-8 max-w-6xl mx-auto -mt-20 bg-white rounded-t-[50px] shadow-2xl relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            {displayDetails.isLocal && (
              <div className="inline-flex bg-orange-500 text-white px-3 py-1.5 rounded-xl font-black text-[9px] uppercase items-center gap-2 mb-4">
                <MapPin size={12} fill="currentColor" /> Authentic Nigerian
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{displayDetails.title}</h1>
          </div>

          {/* PORTIONS COUNTER */}
          <div className="flex items-center gap-6 bg-slate-900 p-2 rounded-3xl border-4 border-white shadow-xl">
            <div className="pl-5 pr-3">
              <p className="text-[9px] font-black uppercase text-slate-500">Portions</p>
              <p className="text-2xl font-black text-white">{servings.toString().padStart(2, '0')}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-12 h-12 bg-slate-800 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500"><Minus size={18} /></button>
              <button onClick={() => setServings(servings + 1)} className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center hover:bg-orange-600"><Plus size={18} /></button>
            </div>
          </div>
        </div>

        {/* NUTRITION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
          {Object.entries(nutrition).map(([key, val]) => (
            <div key={key} className="bg-orange-50/50 rounded-[30px] py-5 px-2 text-center border border-orange-100">
              <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest mb-1">{key}</p>
              <p className="text-lg font-black text-slate-800">{val}</p>
            </div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-xl font-black mb-6 text-slate-800 uppercase tracking-widest border-b-4 border-orange-500 inline-block">{t.ingredients}</h2>
            <ul className="space-y-3">
              {displayDetails.extendedIngredients.map((ing, i) => {
                const isAdded = shoppingList.includes(ing.original);
                return (
                  <li key={i} onClick={() => addToShoppingList(ing.original)} className={`p-4 rounded-2xl flex justify-between items-center cursor-pointer transition-all border ${isAdded ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-50 hover:border-orange-200'}`}>
                    <span className={`text-sm font-bold ${isAdded ? 'text-green-700/60 line-through' : 'text-slate-600'}`}>{formatIngredientText(ing)}</span>
                    {isAdded ? <Check size={16} className="text-green-500" strokeWidth={3} /> : <ShoppingCart size={16} className="text-slate-300" />}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <h2 className="text-xl font-black mb-6 text-slate-800 uppercase tracking-widest border-b-4 border-orange-500 inline-block">{t.steps}</h2>
            <div className="space-y-8">
              {displayDetails.analyzedInstructions[0].steps.map(s => (
                <div key={s.number} className="flex gap-6 group">
                  <span className="text-3xl font-black text-orange-100 group-hover:text-orange-500 transition-colors">{s.number.toString().padStart(2, '0')}</span>
                  <p className="text-slate-600 font-medium leading-relaxed pt-1 text-base">{s.step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
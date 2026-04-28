import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Loader2, AlertCircle, MapPin, 
  Plus, Minus, Check, Users, Info, ShoppingCart 
} from 'lucide-react';
import { nigerianRecipes } from '../nigerianData';
import { calculateRecipeNutrition } from '../utils/nutritionCalculator';

const RecipeDetails = ({ addToShoppingList, shoppingList }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servings, setServings] = useState(1);
  
  const globalFallback = "https://images.unsplash.com/photo-1495195129352-aec325a55b65?q=80&w=800";

  // Automatic Nutrition Calculation
  const ingredientStrings = details?.extendedIngredients?.map(ing => ing.original) || [];
  const nutrition = calculateRecipeNutrition(ingredientStrings, servings);

  useEffect(() => {
    const getData = async () => {
      window.scrollTo(0, 0);
      setLoading(true);

      const local = nigerianRecipes.find(r => r.id === id);
      
      if (local) {
        setDetails({ 
          title: local.name, 
          image: local.image, 
          extendedIngredients: local.ingredients.map(ing => ({ original: ing })), 
          analyzedInstructions: [{ steps: local.steps }], 
          isLocal: true 
        });
        setLoading(false);
      } else {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          
          if (data.meals && data.meals[0]) {
            const meal = data.meals[0];
            const ingredientsList = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = meal[`strIngredient${i}`];
              const measure = meal[`strMeasure${i}`];
              if (ingredient && ingredient.trim() !== "") {
                ingredientsList.push({ 
                  original: `${measure ? measure : ''} ${ingredient}`.trim() 
                });
              }
            }

            const rawSteps = meal.strInstructions
              .split(/\r?\n|\.\s+/) 
              .map(s => s.trim())
              .filter(s => s.length > 10 && !/^step\s*\d+$/i.test(s));

            const formattedSteps = rawSteps.map((stepText, index) => ({
              number: index + 1,
              step: stepText.endsWith('.') ? stepText : `${stepText}.`
            }));

            setDetails({
              title: meal.strMeal,
              image: meal.strMealThumb,
              extendedIngredients: ingredientsList,
              analyzedInstructions: [{ steps: formattedSteps }],
              isLocal: false
            });
          }
        } catch (err) { 
          console.error("TheMealDB Error:", err); 
        } finally { 
          setLoading(false); 
        }
      }
    };
    getData();
  }, [id]);

  // RegEx helper to multiply quantities in strings
  const adjustQuantity = (text) => {
    return text.replace(/(\d+(\.\d+)?)/g, (match) => {
      const num = parseFloat(match) * servings;
      return num % 1 === 0 ? num : num.toFixed(1);
    });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center text-orange-500">
      <Loader2 className="animate-spin w-12 h-12 mb-4" />
      <p className="font-black uppercase tracking-widest text-xs italic">Prepping Ingredients...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Hero Header */}
      <div className="relative h-100 w-full overflow-hidden">
        <img src={details?.image || globalFallback} className="w-full h-full object-cover" alt={details?.title} />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        
        <button onClick={() => navigate(-1)} className="absolute top-8 left-8 bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl z-20 text-white hover:bg-white hover:text-slate-900 transition-all">
          <ChevronLeft size={24} />
        </button>
      </div>

      {/* Main Content Card */}
      <main className="max-w-6xl mx-auto -mt-32 relative z-10 bg-white rounded-t-[50px] p-8 md:p-16 shadow-2xl border-x border-t border-slate-50">
        
        {/* Title & Serving Control Center */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div>
            {details?.isLocal && (
              <div className="inline-flex bg-orange-500 text-white px-3 py-1.5 rounded-xl font-black text-[9px] uppercase items-center gap-2 mb-4 shadow-lg">
                <MapPin size={12} fill="currentColor" /> Authentic Nigerian
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {details?.title}
            </h1>
            <div className="flex items-center gap-2 text-slate-400 mt-2">
              <Users size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Adjust Portion Size</span>
            </div>
          </div>

          {/* Dark Serving Control Center */}
          <div className="flex items-center gap-6 bg-slate-900 p-2 rounded-[28px] shadow-2xl shadow-slate-200 border-4 border-white">
            <div className="pl-5 pr-3">
              <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest leading-none mb-1">Servings</p>
              <p className="text-2xl font-black text-white leading-none">{servings.toString().padStart(2, '0')}</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setServings(Math.max(1, servings - 1))} className="w-12 h-12 flex items-center justify-center bg-slate-800 text-white rounded-2xl hover:bg-orange-500 transition-all active:scale-90">
                <Minus size={20} strokeWidth={3} />
              </button>
              <button onClick={() => setServings(servings + 1)} className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 active:scale-90">
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>

        {/* Nutrition Chips */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-16">
          {[
            { label: 'Calories', val: nutrition.calories, unit: ' kcal' },
            { label: 'Protein', val: nutrition.protein, unit: 'g' },
            { label: 'Carbs', val: nutrition.carbs, unit: 'g' },
            { label: 'Fats', val: nutrition.fat, unit: 'g' },
            { label: 'Fiber', val: nutrition.fiber, unit: 'g' }
          ].map((item) => (
            <div key={item.label} className="bg-orange-50/40 rounded-[30px] py-5 px-2 text-center border border-orange-100/50 hover:shadow-md hover:bg-orange-50 transition-all">
              <p className="text-[9px] font-black uppercase text-orange-400 tracking-widest mb-1">{item.label}</p>
              <p className="text-lg font-black text-slate-800">{item.val}{item.unit}</p>
            </div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Ingredients with Invisible-to-Hover Shopping Basket */}
          <div className="lg:col-span-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Ingredients</h2>
            <ul className="space-y-2">
              {(details?.extendedIngredients || []).map((ing, idx) => {
                const isAdded = shoppingList.includes(ing.original);
                return (
                  <li 
                    key={idx} 
                    onClick={() => addToShoppingList(ing.original)}
                    className={`flex items-center justify-between p-4 rounded-3xl cursor-pointer transition-all group
                      ${isAdded 
                        ? 'bg-green-50 border border-green-100' 
                        : 'bg-white border border-slate-50 hover:border-orange-200 hover:shadow-sm'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isAdded ? 'bg-green-500' : 'bg-orange-500'}`} />
                      <span className={`text-sm font-bold capitalize ${isAdded ? 'text-green-700/60 line-through' : 'text-slate-600'}`}>
                        {adjustQuantity(ing.original)}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      {isAdded ? (
                        <div className="bg-green-500 text-white p-1.5 rounded-xl shadow-sm animate-in zoom-in">
                          <Check size={14} strokeWidth={4} />
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 md:opacity-0 sm:opacity-100 bg-slate-100 p-1.5 rounded-xl text-slate-400 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all">
                          <ShoppingCart size={14} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Steps Timeline */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">Cooking Steps</h2>
            <div className="space-y-8">
              {details?.analyzedInstructions?.[0]?.steps?.map(step => (
                <div key={step.number} className="flex gap-8 group">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-orange-100 group-hover:text-orange-500 transition-colors leading-none">
                      {step.number.toString().padStart(2, '0')}
                    </span>
                    <div className="w-px flex-1 bg-slate-100 my-4" />
                  </div>
                  <div className="bg-slate-50/50 p-8 rounded-[40px] flex-1 group-hover:bg-white border border-transparent group-hover:border-orange-100 transition-all hover:shadow-xl hover:shadow-orange-500/5">
                    <p className="text-slate-600 text-base font-semibold leading-relaxed tracking-wide">
                      {step.step}
                    </p>
                  </div>
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
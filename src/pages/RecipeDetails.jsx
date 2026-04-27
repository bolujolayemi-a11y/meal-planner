import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, AlertCircle, MapPin } from 'lucide-react';
import { nigerianRecipes } from '../nigerianData';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const globalFallback = "https://images.unsplash.com/photo-1495195129352-aec325a55b65?q=80&w=800";

  useEffect(() => {
    const getData = async () => {
      window.scrollTo(0, 0);
      setLoading(true);

      // 1. Check for Local Nigerian Recipe
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
        // 2. Fetch from TheMealDB
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          const data = await res.json();
          
          if (data.meals && data.meals[0]) {
            const meal = data.meals[0];

            // Transform ingredients strIngredient1..20
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

            // --- IMPROVED SPLITTING & CLEANING LOGIC ---
            // Splits by newlines OR periods followed by a space
            const rawSteps = meal.strInstructions
              .split(/\r?\n|\.\s+/) 
              .map(s => s.trim())
              .filter(s => {
                // Filter out: empty strings, tiny fragments, and headers like "Step 1"
                const isTooShort = s.length < 10;
                const isStepHeader = /^step\s*\d+$/i.test(s); 
                return s !== "" && !isTooShort && !isStepHeader;
              });

            const formattedSteps = rawSteps.map((stepText, index) => ({
              number: index + 1,
              // Re-add a period if it was lost during splitting
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

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center text-orange-500">
      <Loader2 className="animate-spin w-12 h-12 mb-4" />
      <p className="font-bold uppercase tracking-widest text-xs italic">Checking Kitchen...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Hero Image Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src={details?.image || globalFallback} 
          className="w-full h-full object-cover" 
          alt={details?.title} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = globalFallback;
          }}
        />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-8 left-8 bg-white p-3 rounded-2xl shadow-xl hover:text-orange-500 transition-all cursor-pointer z-20"
        >
          <ChevronLeft size={24} />
        </button>
        
        {details?.isLocal && (
          <div className="absolute bottom-24 left-8 bg-orange-500 text-white px-4 py-2 rounded-2xl font-black text-xs uppercase flex items-center gap-2 border border-orange-400 shadow-xl">
            <MapPin size={14} fill="currentColor" /> Authentic Nigerian
          </div>
        )}
      </div>

      <main className="max-w-5xl mx-auto -mt-20 relative z-10 bg-white rounded-t-[40px] p-10 shadow-2xl">
        <h1 className="text-4xl font-black text-slate-900 mb-8">{details?.title}</h1>
        
        <div className="grid lg:grid-cols-3 gap-12 pt-10 border-t border-gray-100">
          {/* Ingredients Column */}
          <div>
            <h2 className="text-xl font-black mb-6 text-slate-800 border-l-4 border-orange-500 pl-4">Ingredients</h2>
            <ul className="space-y-4">
              {(details?.extendedIngredients || []).map((ing, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm font-medium capitalize">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 shrink-0" />
                  {ing.original}
                </li>
              ))}
            </ul>
          </div>

          {/* Cooking Steps Column */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-black mb-6 text-slate-800">Cooking Steps</h2>
            <div className="space-y-8">
              {details?.analyzedInstructions?.[0]?.steps?.length > 0 ? (
                details.analyzedInstructions[0].steps.map(step => (
                  <div key={step.number} className="flex gap-6 group">
                    <span className="text-3xl font-black text-orange-100 group-hover:text-orange-500 transition-colors">
                      {step.number.toString().padStart(2, '0')}
                    </span>
                    <div className="bg-gray-50/50 p-6 rounded-3xl flex-1 group-hover:bg-white border border-transparent group-hover:border-orange-100 transition-all shadow-sm">
                      <p className="text-gray-600 text-sm font-semibold leading-relaxed">
                        {step.step}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100 flex items-center gap-4">
                  <AlertCircle className="text-orange-500" />
                  <p className="text-gray-600 text-sm italic font-medium">Instructions summary unavailable for this item.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetails;
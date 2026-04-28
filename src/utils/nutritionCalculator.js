import { ingredientLibrary } from './nutritionData';

export const calculateRecipeNutrition = (ingredientsStrings, servings = 1) => {
  let totals = { carbs: 0, protein: 0, fat: 0, fiber: 0, calories: 0 };

  ingredientsStrings.forEach(str => {
    const lowerStr = str.toLowerCase();
    
    // Find the matching key in our library
    const foundKey = Object.keys(ingredientLibrary).find(key => lowerStr.includes(key));

    if (foundKey) {
      const stats = ingredientLibrary[foundKey];
      
      // Step 1: Extract weight/volume
      // We look for numbers followed by g, ml, or grams
      const weightMatch = lowerStr.match(/(\d+)\s*(g|ml|grams)/);
      const weight = weightMatch ? parseInt(weightMatch[1]) : 150;

      totals.carbs += stats.carbs * weight;
      totals.protein += stats.protein * weight;
      totals.fat += stats.fat * weight;
      totals.fiber += stats.fiber * weight;
      totals.calories += stats.calories * weight;
    }
  });

  // --- THE CORRECTION ---
  // We MULTIPLY by servings because the user is scaling the recipe UP.
  // If 1 serving is 500 kcal, 2 servings should be 1000 kcal.
  return {
    carbs: (totals.carbs * servings).toFixed(1),
    protein: (totals.protein * servings).toFixed(1),
    fat: (totals.fat * servings).toFixed(1),
    fiber: (totals.fiber * servings).toFixed(1),
    calories: Math.round(totals.calories * servings)
  };
};
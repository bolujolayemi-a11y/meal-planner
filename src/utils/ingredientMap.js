// src/utils/ingredientMap.js

export const ingredientAliases = {
  // --- THE CASSAVA UMBRELLA (Parent -> Children) ---
  // Tapping 'cassava' now looks for all these specific derivatives
  'cassava': ['eba', 'garri', 'starch', 'cassava starch', 'fufu', 'cassava flour'],
  
  // --- NIGERIAN TRADITIONAL NAMES & SWALLOWS ---
  'iru': 'locust beans',
  'locust beans': 'iru',
  'egusi': 'melon seed',
  'melon seed': 'egusi',
  'ata rodo': 'scotch bonnet',
  'scotch bonnet': 'ata rodo',
  'habanero': 'chili',
  'crayfish': 'shrimp',
  'shrimp': 'prawns',
  'prawns': 'shrimp',
  'rice': 'ofada rice',
  'fish': 'catfish',
  
  // --- DERIVATIVE LINKS ---
  'eba': 'garri',
  'garri': 'eba',
  'fufu': 'cassava',
  'cassava flakes': 'garri',
  'starch': 'cassava starch',
  'usi': 'starch',

  // --- THE YAM & TUBER FAMILY ---
  'pounded yam': 'yam',
  'asaro': 'yam',
  'amala': 'yam flour',
  'elubo': 'amala',
  'yam flour': 'elubo',
  'sweet potato': 'potato',

  // --- GRAINS & FLOURS ---
  'semo': 'semolina',
  'semolina swallow': 'semolina',
  'wheat swallow': 'wheat flour',
  'wheat meal': 'wheat flour',
  'tuwo shinkafa': 'rice',
  'cornmeal': 'polenta',
  'groundnut': 'peanuts',
  'soya bean': 'soybeans',

  // --- GLOBAL API BRIDGES (MealDB Translation) ---
  'ugwu': 'spinach',
  'bitter leaf': 'kale',
  'scent leaf': 'basil',
  'plantain': 'banana',
  'scallions': 'spring onions',

  // --- PASTA & NOODLES (MealDB specific names) ---
  'pasta': 'penne',
  'macaroni': 'macaroni',
  'noodles': 'egg_noodles',
  'vermicelli': 'vermicelli',
  'spaghetti': 'spaghetti',
  'fusilli': 'pasta',

  // --- PROTEINS & VEGGIES ---
  'chicken meat': 'chicken',
  'turkey': 'turkey',
  'pork': 'pork',
  'bacon': 'bacon',
  'sausage': 'sausage',
  'lamb': 'lamb',
  'peas': 'green_peas',
  'green beans': 'green_beans',
  'bell pepper': 'green_pepper',
  'chili': 'chili_powder',
  'cabbage': 'cabbage',

  // --- DAIRY & ESSENTIALS ---
  'cream': 'heavy_cream',
  'yogurt': 'greek_yogurt',
  'cheese': 'cheddar_cheese',
  'butter': 'margarine',
  'margarine': 'butter',
  'condensed milk': 'milk',
  'strawberry': 'strawberries',
  'honey': 'honey',
  'soy sauce': 'soy_sauce',
  'corn': 'sweet corn'
};

/**
 * Helper to get all versions of an ingredient name.
 * Updated to handle both single strings and arrays of aliases.
 */
export const getExpandedIngredients = (ingredientsList) => {
  return ingredientsList.flatMap(ing => {
    const lowerIng = ing.toLowerCase().trim();
    const alias = ingredientAliases[lowerIng];
    
    if (Array.isArray(alias)) {
      // If cassava maps to [eba, garri, starch], we search for all 4 words
      return [lowerIng, ...alias];
    }
    
    return alias ? [lowerIng, alias] : [lowerIng];
  });
};
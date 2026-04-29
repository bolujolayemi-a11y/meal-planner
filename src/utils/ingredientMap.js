// src/utils/ingredientMap.js

export const ingredientAliases = {
  // --- INDIVIDUAL SWALLOW LINKS ---
  'eba': 'garri',
  'garri': 'eba',
  'fufu': 'cassava',
  'starch': 'cassava starch',
  'usi': 'starch',
  'pounded yam': 'yam',
  'asaro': 'yam',
  'amala': 'yam flour',
  'elubo': 'amala',
  'yam flour': 'elubo',

  // --- NIGERIAN TRADITIONAL NAMES ---
  'iru': 'locust beans',
  'locust beans': 'iru',
  'egusi': 'melon seed',
  'melon seed': 'egusi',
  'ata rodo': 'scotch bonnet',
  'scotch bonnet': 'ata rodo',
  'crayfish': 'shrimp',
  'shrimp': 'prawns',
  'prawns': 'shrimp',
  'rice': 'ofada rice',
  'fish': 'catfish',

  // --- GRAINS & FLOURS ---
  'semolina swallow': 'semovita',
  // 'semolina swallow': 'semolina',
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
  'habanero': 'chili',

  // --- PASTA & NOODLES ---
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
  'sweet potato': 'potato',

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
 * Handles single string aliases.
 */
export const getExpandedIngredients = (ingredientsList) => {
  return ingredientsList.flatMap(ing => {
    const lowerIng = ing.toLowerCase().trim();
    const alias = ingredientAliases[lowerIng];
    
    // Returns the original word and its alias if found
    return alias ? [lowerIng, alias] : [lowerIng];
  });
};
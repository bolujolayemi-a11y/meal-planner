// src/utils/ingredientMap.js

export const ingredientAliases = {
  // Local -> Global
  'iru': 'locust beans',
  'locust beans': 'iru',
  'sweet potato': 'potato',
  'melon seed': 'egusi',
  'egusi': 'melon seed',
  'strawberry': 'strawberries',
  'condensed milk': 'milk',
  'crayfish': 'shrimp',
  'habanero': 'chili',
  'ata rodo': 'scotch bonnet',
  
  // Add new ones here as you find them!
  'cornmeal': 'polenta',
  'groundnut': 'peanuts',
  'soya bean': 'soybeans',
  'scallions': 'spring onions',

  'wheat swallow': 'wheat flour',
  'semolina swallow': 'semolina',
  'pounded yam': 'yam',
  'amala': 'yam flour',

  // --- PASTA & NOODLES FIXES (MealDB loves specific names) ---
  'pasta': 'penne',
  'macaroni': 'macaroni',
  'noodles': 'egg_noodles',
  'vermicelli': 'vermicelli',
  'spaghetti': 'spaghetti',
  'fusilli': 'pasta',

  // --- GLOBAL PROTEIN MAPPING ---
  'chicken meat': 'chicken',
  'turkey': 'turkey',
  'pork': 'pork',
  'bacon': 'bacon',
  'sausage': 'sausage',
  'lamb': 'lamb',
  
  // --- VEGGIE & FRUIT SYNS ---
  'peas': 'green_peas',
  'green beans': 'green_beans',
  'bell pepper': 'green_pepper',
  'chili': 'chili_powder',
  'cabbage': 'cabbage',
  'broccoli': 'broccoli',
  'cauliflower': 'cauliflower',
  'avocado': 'avocado',
  
  // --- DAIRY & ESSENTIALS ---
  'cream': 'heavy_cream',
  'yogurt': 'greek_yogurt',
  'cheese': 'cheddar_cheese',
  'oats': 'rolled_oats',
  'lentils': 'red_lentils',

  // --- NIGERIAN -> GLOBAL (Search Bridges) ---
  'iru': 'locust beans',
  'egusi': 'melon seed',
  'ugwu': 'spinach', // Bridge for MealDB
  'bitter leaf': 'kale', // Bridge for MealDB
  'plantain': 'banana', // Bridge for MealDB results
  'crayfish': 'dried_shrimp',
  'ata rodo': 'habanero',

  // --- ADDING NON-PANTRY INGREDIENTS FOR BETTER SEARCH ---
  'salmon': 'salmon',
  'tuna': 'tuna',
  'honey': 'honey',
  'soy sauce': 'soy_sauce',
  'tofu': 'tofu',
  'walnuts': 'walnuts',
  'almonds': 'almonds'
};

/**
 * Helper to get all versions of an ingredient name
 */
export const getExpandedIngredients = (ingredientsList) => {
  return ingredientsList.flatMap(ing => {
    const lowerIng = ing.toLowerCase();
    const alias = ingredientAliases[lowerIng];
    return alias ? [lowerIng, alias] : [lowerIng];
  });
};
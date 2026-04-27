import jollofImg from './assets/jollof-rice.jpeg';
import friedriceImg from './assets/fried-rice.jpeg';
import ohasoupImg from './assets/oha-soup.jpeg';
import chickenshawarmaImg from './assets/chicken-shawarma.jpeg';
import beefsuyaImg from './assets/beef-suya.jpeg';
import egusisoupImg from './assets/egusi-soup.jpeg';
import afangsoupImg from './assets/afang-soup.jpeg';
import asunjollof from './assets/asun-jollof.jpg';
import efoImg from './assets/efo-riro-soup.jpeg'; 
import nativeRice from './assets/native-rice.jpeg';
import moiMoi from './assets/moi-moi.jpeg';
import coconutRice from './assets/coconut-rice.jpeg';
import ofada from './assets/ofada-rice.jpeg';
import ayamase from './assets/ayamase-sauce.jpeg';
import asaro from './assets/yam-porridge.jpeg';
import potatoFries from './assets/sweet-potatoes-fries.jpeg';
import poundedYam from './assets/pounded-yam.jpeg';
import fishermanSoup from './assets/fisherman-soup.jpeg';
import ewaAgoyin from './assets/ewa-agoyin.jpeg';
import fishStew from './assets/fish-stew.jpeg';

export const nigerianRecipes = [
  {
    id: "ng-jollof",
    name: "Classic Nigerian Jollof Rice",
    image: jollofImg,
    ingredients: ["rice", "tomato", "scotch bonnet", "onion", "vegetable oil", "tomato paste", "chicken stock", "thyme", "curry powder", "bay leaf"],
    steps: [
      { number: 1, step: "Blend tomatoes, scotch bonnet (atarodo), and onions until smooth." },
      { number: 2, step: "Fry onions and tomato paste in oil until the sour taste is gone." },
      { number: 3, step: "Add the blended pepper mix and fry until the oil separates." },
      { number: 4, step: "Add stock, seasonings, and parboiled rice." },
      { number: 5, step: "Cover with foil and cook on low heat until the rice is tender and smoky." }
    ]
  },
  {
    id: "ng-friedrice",
    name: "Nigerian Fried Rice",
    image: friedriceImg,
    ingredients: ["rice", "carrot", "green beans", "liver", "shrimp", "curry powder", "turmeric", "sweet corn", "spring onion"],
    steps: [
      { number: 1, step: "Parboil rice with curry, turmeric, and stock until 80% cooked." },
      { number: 2, step: "Dice carrots, green beans, and liver into small cubes." },
      { number: 3, step: "Stir-fry the vegetables and shrimps in butter or oil with seasonings." },
      { number: 4, step: "Add the parboiled rice in batches to the stir-fry and toss thoroughly." },
      { number: 5, step: "Garnish with spring onions and serve." }
    ]
  },
  {
    id: "ng-efo",
    name: "Efo Riro (Spinach Stew)",
    image: efoImg, 
    ingredients: ["spinach", "palm oil", "shaki", "ponmo", "iru", "crayfish", "tatarshe", "dried fish"],
    steps: [
      { number: 1, step: "Blanch spinach in hot water, then squeeze out all moisture." },
      { number: 2, step: "Heat palm oil and sauté onions and iru (locust beans)." },
      { number: 3, step: "Add coarsely blended tatarshe/pepper and fry until dry." },
      { number: 4, step: "Add shaki, ponmo, and crayfish; simmer for 10 minutes." },
      { number: 5, step: "Fold in spinach and steam for 3 minutes." }
    ]
  },
  {
    id: "ng-egusi",
    name: "Egusi Soup (Lumpy Style)",
    image: egusisoupImg,
    ingredients: ["egusi", "palm oil", "bitter leaf", "ugwu", "beef", "stock fish", "crayfish", "pepper"],
    steps: [
      { number: 1, step: "Mix melon seeds (egusi) with a little water to form a thick paste." },
      { number: 2, step: "Heat palm oil, add the egusi paste in small lumps and fry gently." },
      { number: 3, step: "Add stock and pepper mix; simmer until the lumps are firm." },
      { number: 4, step: "Add meat, fish, and crayfish; cook for 15 minutes." },
      { number: 5, step: "Add bitter leaf or ugwu and simmer for 5 minutes." }
    ]
  },
  {
    id: "ng-afang",
    name: "Afang Soup",
    image: afangsoupImg,
    ingredients: ["afang leaf", "ugwu", "palm oil", "periwinkle", "beef", "crayfish", "pepper", "stock fish"],
    steps: [
      { number: 1, step: "Grind or pound the Afang leaves into a smooth paste." },
      { number: 2, step: "Boil beef and stock fish with seasonings until tender." },
      { number: 3, step: "Add plenty of crayfish, palm oil, and pepper mix." },
      { number: 4, step: "Add the ugwu leaves first, followed by the Afang leaves." },
      { number: 5, step: "Stir thoroughly and cook for only 2-3 minutes to keep leaves fresh." }
    ]
  },
  {
    id: "ng-oha",
    name: "Oha Soup",
    image: ohasoupImg,
    ingredients: ["oha leaf", "cocoyam", "palm oil", "ogiri", "crayfish", "beef", "stock fish", "pepper"],
    steps: [
      { number: 1, step: "Boil cocoyam until soft, then pound into a smooth paste (thickener)." },
      { number: 2, step: "Boil meat and fish until tender; add palm oil and pepper." },
      { number: 3, step: "Dissolve the cocoyam paste in the stock until it thickens." },
      { number: 4, step: "Add crayfish and ogiri for that authentic Igbo flavor." },
      { number: 5, step: "Tear Oha leaves by hand (don't cut) into the soup; simmer for 2 minutes." }
    ]
  },
  {
    id: "ng-shawarma",
    name: "Nigerian Chicken Shawarma",
    image: chickenshawarmaImg,
    ingredients: ["chicken breast", "shawarma bread", "cabbage", "carrot", "mayonnaise", "ketchup", "suya pepper", "sausage"],
    steps: [
      { number: 1, step: "Marinate chicken in suya pepper, garlic, and ginger; then grill and shred." },
      { number: 2, step: "Mix mayonnaise and ketchup to create the 'creamy sauce'." },
      { number: 3, step: "Spread sauce on the bread, add shredded cabbage, carrots, and chicken." },
      { number: 4, step: "Add a grilled sausage and roll the bread tightly." },
      { number: 5, step: "Toast the wrap on a dry pan until slightly brown." }
    ]
  },
  {
    id: "ng-suya",
    name: "Beef Suya",
    image: beefsuyaImg,
    ingredients: ["beef", "yaji", "groundnut oil", "onion", "cucumber"],
    steps: [
      { number: 1, step: "Slice beef into thin fillets." },
      { number: 2, step: "Coat beef thoroughly in Yaji (Suya pepper) and a little oil." },
      { number: 3, step: "Skewer the beef and grill over charcoal or in an oven at 200°C." },
      { number: 4, step: "Garnish with fresh onions and cucumbers." }
    ]
  },
  {
    id: "ng-asun-jollof",
    name: "Asun Jollof Rice",
    image: asunjollof,
    ingredients: ["rice", "goat meat", "pepper", "onion", "palm oil", "seasoning"],
    steps: [
      { number: 1, step: "Grill/smoke goat meat, then chop into bite-sized pieces and sauté with peppers (Asun)." },
      { number: 2, step: "Prepare a standard Jollof base with tomato and pepper." },
      { number: 3, step: "Add the smoky goat meat pieces to the Jollof base." },
      { number: 4, step: "Stir in parboiled rice and cook until tender." },
      { number: 5, step: "Final toss with extra spicy peppers for that Asun kick." }
    ]
  },
  {
    id: "ng-native-rice",
    name: "Village Native Rice (Concoction)",
    image: nativeRice,
    ingredients: ["rice", "palm oil", "iru", "dried fish", "ponmo", "crayfish", "scent leaf", "onion", "pepper"],
    steps: [
      { number: 1, step: "Heat palm oil and sauté onions with iru (locust beans) until fragrant." },
      { number: 2, step: "Add blended peppers, dried fish, ponmo, and crayfish; cook for 5 minutes." },
      { number: 3, step: "Add meat stock or water and bring to a boil." },
      { number: 4, step: "Stir in parboiled rice, cover, and cook until the rice is soft." },
      { number: 5, step: "Stir in shredded scent leaves for that authentic local aroma." }
    ]
  },
  {
    id: "ng-ofada",
    name: "Ofada Rice",
    image: ofada,
    ingredients: ["ofada rice", "salt", "water"],
    steps: [
      { number: 1, step: "Pick stones from the Ofada rice and wash thoroughly." },
      { number: 2, step: "Add rice to boiling water and parboil for 10 minutes." },
      { number: 3, step: "Wash again to remove the local smell and return to the pot." },
      { number: 4, step: "Cook with fresh water and salt until perfectly tender." }
    ]
  },
  {
    id: "ng-ayamase",
    name: "Ayamase Sauce",
    image: ayamase, 
    ingredients: ["green bell pepper", "scotch bonnet", "palm oil", "iru", "assorted meat", "egg", "onion", "crayfish"],
    steps: [
      { number: 1, step: "Bleach palm oil in a covered pot for 10-15 minutes until it is clear like vegetable oil." },
      { number: 2, step: "Sauté onions and iru, then add coarsely blended green peppers." },
      { number: 3, step: "Fry until the oil separates from the pepper mix." },
      { number: 4, step: "Add pre-cooked assorted meats, crayfish, and boiled eggs." },
      { number: 5, step: "Simmer for 10 minutes and serve with Ofada rice." }
    ]
  },
  {
    id: "ng-moimoi",
    name: "Steamed Bean Pudding (Moi-Moi)",
    image: moiMoi,
    ingredients: ["beans", "red bell pepper", "onion", "vegetable oil", "boiled egg", "fish", "crayfish", "bouillon cube"],
    steps: [
      { number: 1, step: "Peel the beans and blend with peppers and onions until perfectly smooth." },
      { number: 2, step: "Stir in vegetable oil, crayfish, and seasoning; mix thoroughly." },
      { number: 3, step: "Add a little warm water to get a pouring consistency." },
      { number: 4, step: "Scoop into containers or leaves; add a piece of egg or fish to each." },
      { number: 5, step: "Steam in a pot of boiling water for 45-60 minutes until firm." }
    ]
  },
  {
    id: "ng-coconut-rice",
    name: "Nigerian Coconut Rice",
    image: coconutRice,
    ingredients: ["rice", "coconut milk", "chicken stock", "shrimp", "carrot", "green peas", "thyme", "pepper", "onion"],
    steps: [
      { number: 1, step: "Parboil your rice and set it aside." },
      { number: 2, step: "In a pot, combine coconut milk, chicken stock, onions, and seasonings." },
      { number: 3, step: "Bring the mixture to a boil, then add the parboiled rice." },
      { number: 4, step: "Cook on medium heat until the liquid is absorbed and rice is fluffy." },
      { number: 5, step: "Stir in shrimps and veggies during the last 5 minutes of cooking." }
    ]
  },
  {
    id: "ng-asaro",
    name: "Asaro (Yam Porridge)",
    image: asaro,
    ingredients: ["yam", "palm oil", "tomato", "scotch bonnet", "onion", "crayfish", "dried fish", "scent leaf"],
    steps: [
      { number: 1, step: "Peel and cube the yam; boil in a pot with enough water to cover." },
      { number: 2, step: "Blend tomatoes, peppers, and onions; add to the boiling yam." },
      { number: 3, step: "Add palm oil, crayfish, dried fish, and seasonings." },
      { number: 4, step: "When soft, mash some chunks to thicken the sauce." },
      { number: 5, step: "Stir in scent leaves and simmer for 2 minutes." }
    ]
  },
  {
    id: "ng-pounded-yam",
    name: "Pounded Yam",
    image: poundedYam,
    ingredients: ["yam", "water"],
    steps: [
      { number: 1, step: "Peel and wash the yam; cut into small chunks." },
      { number: 2, step: "Boil until very soft and tender." },
      { number: 3, step: "Pound in a mortar or use a food processor until smooth and stretchy." },
      { number: 4, step: "Mold into balls and serve with your favorite soup." }
    ]
  },
  {
    id: "ng-ewa-agoyin",
    name: "Ewa Agoyin",
    image: ewaAgoyin,
    ingredients: ["beans", "palm oil", "dried bell pepper", "onion", "crayfish", "salt"],
    steps: [
      { number: 1, step: "Boil beans until they are extremely soft and mushy." },
      { number: 2, step: "Bleach palm oil until dark, then fry sliced onions until blackened." },
      { number: 3, step: "Add ground dried peppers and fry until gritty." },
      { number: 4, step: "Mash the beans and serve with the dark sauce." }
    ]
  },
  {
    id: "ng-fish-stew",
    name: "Nigerian Fish Stew",
    image: fishStew,
    ingredients: ["fish", "tomato", "scotch bonnet", "onion", "vegetable oil", "tomato paste"],
    steps: [
      { number: 1, step: "Clean and season the fish, then fry or grill until firm." },
      { number: 2, step: "Fry onions and tomato paste in vegetable oil." },
      { number: 3, step: "Add blended pepper mix and fry until the oil rises." },
      { number: 4, step: "Carefully add fish and simmer for 5 minutes." }
    ]
  },
  {
    id: "ng-fisherman-soup",
    name: "Native Fisherman Soup",
    image: fishermanSoup,
    ingredients: ["fish", "prawns", "crab", "periwinkle", "palm oil", "cocoyam", "oziza leaf", "crayfish"],
    steps: [
      { number: 1, step: "Boil fresh seafood with minimal water and seasonings." },
      { number: 2, step: "Add palm oil and pounded cocoyam to thicken the stock." },
      { number: 3, step: "Add crayfish and fresh peppers." },
      { number: 4, step: "Stir in Oziza leaves for a spicy aroma and simmer briefly." }
    ]
  },
  {
    id: "int-potato-fries",
    name: "Spicy Sweet Potato Fries",
    image: potatoFries,
    ingredients: ["potatoes", "vegetable oil", "salt", "dry pepper", "garlic powder"],
    steps: [
      { number: 1, step: "Cut sweet potatoes into thin strips." },
      { number: 2, step: "Toss with oil, salt, garlic powder, and pepper." },
      { number: 3, step: "Fry in hot oil or air fry at 200°C until crispy." }
    ]
  }
  
  
];
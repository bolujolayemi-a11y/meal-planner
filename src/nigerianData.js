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
import akaraImg from './assets/akara.jpeg';
import amalaImg from './assets/amala.jpeg';
import wheatImg from './assets/wheat-swallow.jpeg';
import semoImg from './assets/semolina.jpeg';
import loadedFriesImg from './assets/loaded-fries.jpeg';

export const nigerianRecipes = [
  {
    id: "ng-jollof",
    name: "Classic Nigerian Jollof Rice",
    image: jollofImg,
    ingredients: [
      { item: "rice", quantity: 0.75, unit: "cup" },
      { item: "tomato", quantity: 1, unit: "medium" },
      { item: "scotch bonnet", quantity: 1, unit: "piece" },
      { item: "onion", quantity: 0.25, unit: "medium" },
      { item: "vegetable oil", quantity: 2, unit: "tbsp" },
      { item: "tomato paste", quantity: 0.5, unit: "tbsp" },
      { item: "chicken stock", quantity: 0.5, unit: "cup" },
      { item: "thyme", quantity: 0.25, unit: "tsp" },
      { item: "curry powder", quantity: 0.25, unit: "tsp" },
      { item: "bay leaf", quantity: 1, unit: "piece" }
    ],
    steps: [
      { number: 1, step: "Wash the rice thoroughly in warm water to remove excess starch until the water runs clear; drain and set aside." },
      { number: 2, step: "Blend the fresh tomato, scotch bonnet, and half of the onion with a little water until perfectly smooth." },
      { number: 3, step: "Heat vegetable oil in a pot. Slice the remaining onion and fry with the bay leaf and tomato paste for 5 minutes on medium heat." },
      { number: 4, step: "Pour in the blended pepper mix. Cover and fry for 10-15 minutes until the water dries up and oil floats to the top." },
      { number: 5, step: "Add chicken stock, curry, thyme, and salt. Bring to a boil, then stir in the washed rice." },
      { number: 6, step: "Cover the pot tightly with foil paper before the lid to trap steam. Cook on very low heat for 20-25 minutes until the rice is tender." }
    ]
  },
  {
    id: "ng-egusi",
    name: "Egusi Soup",
    image: egusisoupImg,
    ingredients: [
      { item: "egusi", quantity: 0.5, unit: "cup" },
      { item: "palm oil", quantity: 1.5, unit: "tbsp" },
      { item: "beef", quantity: 150, unit: "g" },
      { item: "iru", quantity: 0.5, unit: "tbsp" },
      { item: "crayfish", quantity: 1, unit: "tbsp" },
      { item: "ugwu", quantity: 0.5, unit: "cup" },
      { item: "pepper mix", quantity: 0.5, unit: "cup" }
    ],
    steps: [
      { number: 1, step: "Boil the beef with salt and onions until tender. Keep the stock (liquid) for the soup." },
      { number: 2, step: "Place the ground egusi in a bowl. Add a few spoons of water and mix into a thick, moldable paste." },
      { number: 3, step: "Heat palm oil in a pot for 2 minutes. Add the iru and then the egusi paste in small lumps. Fry gently for 5 minutes, stirring carefully so the lumps don't break." },
      { number: 4, step: "Add the pepper mix and meat stock. Simmer for 15 minutes on medium heat until the egusi lumps feel firm like boiled eggs." },
      { number: 5, step: "Add the cooked beef and ground crayfish. Stir and cook for another 5 minutes." },
      { number: 6, step: "Add the shredded ugwu leaves. Stir once, cover the pot, and turn off the heat immediately. The residual heat will steam the leaves perfectly." }
    ]
  },
  {
    id: "ng-ayamase",
    name: "Ayamase Sauce",
    image: ayamase, 
    ingredients: [
      { item: "green bell pepper", quantity: 2, unit: "large" },
      { item: "scotch bonnet", quantity: 2, unit: "pieces" },
      { item: "palm oil", quantity: 0.25, unit: "cup" },
      { item: "iru", quantity: 1, unit: "tbsp" },
      { item: "assorted meat", quantity: 150, unit: "g" },
      { item: "boiled egg", quantity: 1, unit: "piece" }
    ],
    steps: [
      { number: 1, step: "Coarsely blend the green peppers and onions. Pour into a sieve to drain out all excess water." },
      { number: 2, step: "Bleach the palm oil: Heat palm oil in a covered pot on low heat for 10 minutes until it turns clear/golden. Turn off heat and let it cool before opening." },
      { number: 3, step: "Turn the heat back on. Fry the iru and sliced onions until fragrant, then add the drained pepper mix." },
      { number: 4, step: "Fry the peppers for 15-20 minutes until the oil separates and the sauce looks gritty/dark green." },
      { number: 5, step: "Add the pre-cooked meats, crayfish, and the boiled egg. Simmer for 10 minutes to allow the flavors to penetrate the meat." }
    ]
  },
  {
    id: "ng-moimoi",
    name: "Steamed Bean Pudding (Moi-Moi)",
    image: moiMoi,
    ingredients: [
      { item: "beans", quantity: 1, unit: "cup" },
      { item: "red bell pepper", quantity: 1, unit: "medium" },
      { item: "vegetable oil", quantity: 3, unit: "tbsp" },
      { item: "crayfish", quantity: 1, unit: "tbsp" },
      { item: "boiled egg", quantity: 1, unit: "piece" }
    ],
    steps: [
      { number: 1, step: "Soak beans for 5 minutes, then rub between palms to remove the skins. Rinse until the beans are clean and white." },
      { number: 2, step: "Blend the beans with the red pepper and onion using very little water until the paste is extremely smooth." },
      { number: 3, step: "Pour the paste into a bowl. Add oil, salt, and crayfish. Use a wooden spoon to whisk the mixture for 5 minutes to incorporate air for fluffiness." },
      { number: 4, step: "Pour the mixture into small greased containers or leaves. Add a slice of boiled egg to each." },
      { number: 5, step: "Place a steamer or a few stalks of leaf in a pot with a little water. Arrange the containers inside. Steam for 45 minutes, adding water to the pot if it dries up." }
    ]
  },
  {
    id: "ng-friedrice",
    name: "Nigerian Fried Rice",
    image: friedriceImg,
    ingredients: [
      { item: "rice", quantity: 0.75, unit: "cup" },
      { item: "carrot", quantity: 1, unit: "small" },
      { item: "green beans", quantity: 0.25, unit: "cup" },
      { item: "liver", quantity: 50, unit: "g" },
      { item: "curry powder", quantity: 1, unit: "tsp" },
      { item: "turmeric", quantity: 0.25, unit: "tsp" },
      { item: "sweet corn", quantity: 2, unit: "tbsp" },
      { item: "vegetable oil", quantity: 2, unit: "tbsp" }
    ],
    steps: [
      { number: 1, step: "Wash the rice and parboil it in a pot with curry powder, turmeric, and a little salt until it is 80% cooked (still has a slight bite). Drain and set aside." },
      { number: 2, step: "Dice the carrots, green beans, and liver into very small, uniform cubes. Boil the liver separately with salt until firm before dicing." },
      { number: 3, step: "Heat 1 tablespoon of oil in a wide pan. Stir-fry the diced liver and vegetables on high heat for 3 minutes. Add the sweet corn at the end." },
      { number: 4, step: "Add the remaining oil to the pan. Add the parboiled rice in small batches, tossing and stirring constantly so the rice fries and absorbs the vegetable flavors." },
      { number: 5, step: "Adjust seasoning with salt or bouillon and serve once the rice is fully tender and steaming." }
    ]
  },
  {
    id: "ng-afang",
    name: "Authentic Afang Soup",
    image: afangsoupImg,
    ingredients: [
      { item: "afang leaf", quantity: 0.5, unit: "cup" },
      { item: "ugwu", quantity: 1, unit: "cup" },
      { item: "palm oil", quantity: 3, unit: "tbsp" },
      { item: "beef", quantity: 100, unit: "g" },
      { item: "stock fish", quantity: 1, unit: "piece" },
      { item: "crayfish", quantity: 2, unit: "tbsp" },
      { item: "periwinkle", quantity: 2, unit: "tbsp" }
    ],
    steps: [
      { number: 1, step: "Ensure the Afang leaves are very finely ground or pounded. If using dried Afang, soak it briefly in warm water before grinding." },
      { number: 2, step: "Boil the beef and stock fish with salt and onions until the meat is soft. Ensure you have about half a cup of concentrated stock left in the pot." },
      { number: 3, step: "Add the periwinkles, crayfish, and palm oil to the boiling meat. Let it boil together for 5 minutes." },
      { number: 4, step: "Add the shredded Ugwu leaves first. Let it cook for 2 minutes." },
      { number: 5, step: "Add the ground Afang leaves. Stir thoroughly and cook for only 2 more minutes. Afang loses its nutrients and taste if overcooked." }
    ]
  },
  {
    id: "ng-oha",
    name: "Traditional Oha Soup",
    image: ohasoupImg,
    ingredients: [
      { item: "oha leaf", quantity: 0.5, unit: "bunch" },
      { item: "cocoyam", quantity: 2, unit: "small tubers" },
      { item: "palm oil", quantity: 2, unit: "tbsp" },
      { item: "ogiri", quantity: 0.25, unit: "tsp" },
      { item: "beef", quantity: 100, unit: "g" },
      { item: "stock fish", quantity: 1, unit: "piece" },
      { item: "crayfish", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      { number: 1, step: "Boil the cocoyam with the skins on until very soft. Peel them while hot and pound in a mortar or blend into a smooth, thick paste." },
      { number: 2, step: "Boil the beef and stock fish until tender. Add the palm oil, ground crayfish, and pepper mix." },
      { number: 3, step: "Add small lumps of the pounded cocoyam into the boiling soup. These will dissolve and act as a thickener." },
      { number: 4, step: "Once the cocoyam has fully dissolved and the soup is thickened, add the ogiri (fermented oil seeds) for the traditional aroma." },
      { number: 5, step: "Tear the Oha leaves into the soup using your fingers (using a knife can make the leaves turn dark/bitter). Simmer for 1-2 minutes and turn off heat." }
    ]
  },
  {
    id: "ng-asaro",
    name: "Asaro (Yam Porridge)",
    image: asaro,
    ingredients: [
      { item: "yam", quantity: 250, unit: "g" },
      { item: "palm oil", quantity: 2, unit: "tbsp" },
      { item: "scotch bonnet", quantity: 1, unit: "piece" },
      { item: "onion", quantity: 0.25, unit: "medium" },
      { item: "dried fish", quantity: 1, unit: "piece" },
      { item: "scent leaf", quantity: 5, unit: "leaves" }
    ],
    steps: [
      { number: 1, step: "Peel the yam and cut into medium-sized cubes. Wash thoroughly and place in a pot with water just reaching the top level of the yams." },
      { number: 2, step: "Add the blended pepper and onions, palm oil, salt, and the cleaned dried fish." },
      { number: 3, step: "Cover and boil on medium heat for 15-20 minutes until the yam is soft enough for a fork to pass through easily." },
      { number: 4, step: "Use a wooden spoon to mash a few pieces of yam against the side of the pot. This creates the thick, creamy sauce of the porridge." },
      { number: 5, step: "Stir in the shredded scent leaves, simmer for 1 minute, and serve hot." }
    ]
  },
  {
    id: "ng-pounded-yam",
    name: "Pounded Yam",
    image: poundedYam,
    ingredients: [
      { item: "yam", quantity: 300, unit: "g" },
      { item: "water", quantity: 1, unit: "cup" }
    ],
    steps: [
      { number: 1, step: "Peel the yam and cut into small, uniform cubes for even cooking." },
      { number: 2, step: "Boil the yam in a pot with enough water until it is very soft—even softer than regular boiled yam." },
      { number: 3, step: "While the yam is still very hot, place it in a mortar or a food processor." },
      { number: 4, step: "Pound or process until the lumps disappear and the yam becomes stretchy and smooth." },
      { number: 5, step: "If it is too stiff, add a spoonful of the hot yam water and continue pounding until you reach your desired consistency." }
    ]
  },
  {
    id: "ng-ewa-agoyin",
    name: "Ewa Agoyin",
    image: ewaAgoyin,
    ingredients: [
      { item: "beans", quantity: 0.75, unit: "cup" },
      { item: "palm oil", quantity: 0.25, unit: "cup" },
      { item: "dried bell pepper", quantity: 3, unit: "pieces" },
      { item: "onion", quantity: 0.5, unit: "large" },
      { item: "crayfish", quantity: 1, unit: "tbsp" }
    ],
    steps: [
      { number: 1, step: "Boil the beans (preferably honey beans) until they are extremely soft. You should be able to mash them easily with a spoon." },
      { number: 2, step: "For the sauce: Soak the dried peppers in hot water, then blend with onions and very little water." },
      { number: 3, step: "Bleach the palm oil in a covered pot until it is dark but not smoking. Fry sliced onions until they are almost black." },
      { number: 4, step: "Add the pepper mix and fry on low heat for 20 minutes, stirring constantly. The sauce should turn very dark and look gritty." },
      { number: 5, step: "Mash the beans thoroughly and serve with a generous scoop of the dark Agoyin sauce." }
    ]
  },
  {
    id: "ng-sweet-potato-fries",
    name: "Sweet Potato Fries",
    image: potatoFries,
    ingredients: [
      { item: "sweet potato", quantity: 2, unit: "medium" },
      { item: "vegetable oil", quantity: 1, unit: "cup" },
      { item: "salt", quantity: 0.5, unit: "tsp" },
      { item: "paprika", quantity: 0.25, unit: "tsp" }
    ],
    steps: [
      { number: 1, step: "Peel the sweet potatoes and cut them into uniform long strips (batons)." },
      { number: 2, step: "Soak the strips in cold water for 30 minutes to remove excess starch; pat them completely dry with a towel." },
      { number: 3, step: "Heat oil in a deep pan. Fry the potatoes in small batches until the edges are golden brown and crispy." },
      { number: 4, step: "Drain on paper towels and immediately sprinkle with salt and paprika while still hot." }
    ]
  },
  {
    id: "ng-loaded-fries",
    name: "Loaded Fries",
    image: loadedFriesImg,
    ingredients: [
      { item: "potato", quantity: 2, unit: "medium" },
      { item: "beef", quantity: 100, unit: "g" },
      { item: "cheese", quantity: 0.25, unit: "cup" },
      { item: "mayonnaise", quantity: 1, unit: "tbsp" },
      { item: "ketchup", quantity: 1, unit: "tbsp" },
      { item: "onion", quantity: 0.25, unit: "medium" }
    ],
    steps: [
      { number: 1, step: "Fry a batch of regular potato fries until crispy and set aside." },
      { number: 2, step: "Mince the beef and sauté with onions, salt, and pepper until fully browned." },
      { number: 3, step: "Place the fries on a heat-proof plate. Top with the cooked minced beef and shredded cheese." },
      { number: 4, step: "Microwave or grill for 1 minute until the cheese melts." },
      { number: 5, step: "Drizzle with mayonnaise and ketchup before serving." }
    ]
  },
  {
    id: "ng-akara",
    name: "Akara (Bean Cakes)",
    image: akaraImg,
    ingredients: [
      { item: "beans", quantity: 1, unit: "cup" },
      { item: "onion", quantity: 0.5, unit: "medium" },
      { item: "scotch bonnet", quantity: 2, unit: "pieces" },
      { item: "vegetable oil", quantity: 1.5, unit: "cups" }
    ],
    steps: [
      { number: 1, step: "Peel the beans by soaking and rubbing to remove skins. Wash until clean." },
      { number: 2, step: "Blend beans with scotch bonnet and onion using the absolute minimum amount of water possible. The paste must be thick." },
      { number: 3, step: "Pour paste into a bowl and whisk vigorously with a wooden spoon for 5-10 minutes to incorporate air." },
      { number: 4, step: "Heat oil in a deep pan. Scoop the batter with a large spoon and drop into the hot oil." },
      { number: 5, step: "Fry until golden brown on all sides, turning occasionally." }
    ]
  },
  {
    id: "ng-amala",
    name: "Amala (Yam Flour Swallow)",
    image: amalaImg,
    ingredients: [
      { item: "yam flour", quantity: 1, unit: "cup" },
      { item: "water", quantity: 2, unit: "cups" }
    ],
    steps: [
      { number: 1, step: "Bring water to a rolling boil in a small pot." },
      { number: 2, step: "Turn the heat down to low. Gradually pour the yam flour (elubo) into the water." },
      { number: 3, step: "Stir quickly and vigorously with a wooden spatula (omogun) to avoid lumps." },
      { number: 4, step: "Add a little hot water, cover, and let it steam for 2 minutes." },
      { number: 5, step: "Turn the heat off and continue to stir/knead until smooth and stretchy." }
    ]
  },
  {
    id: "ng-wheat",
    name: "Wheat Swallow",
    image: wheatImg,
    ingredients: [
      { item: "wheat flour", quantity: 1, unit: "cup" },
      { item: "water", quantity: 1.5, unit: "cups" }
    ],
    steps: [
      { number: 1, step: "Boil water in a pot." },
      { number: 2, step: "Reduce heat and slowly add the whole wheat flour while stirring constantly." },
      { number: 3, step: "Knead the mixture against the side of the pot until it forms a consistent dough." },
      { number: 4, step: "Steam for 3 minutes with a tiny bit of water added to the pot." },
      { number: 5, step: "Final kneading until smooth." }
    ]
  },
  {
    id: "ng-semo",
    name: "Semolina Swallow",
    image: semoImg,
    ingredients: [
      { item: "semolina", quantity: 1, unit: "cup" },
      { item: "water", quantity: 2, unit: "cups" }
    ],
    steps: [
      { number: 1, step: "Bring water to a boil." },
      { number: 2, step: "Mix a small amount of semolina with cold water to make a thin paste; pour this into the boiling water to create a base." },
      { number: 3, step: "Gradually add the dry semolina into the pot while stirring vigorously." },
      { number: 4, step: "Cover and allow to cook for 5 minutes on low heat." },
      { number: 5, step: "Stir one last time until firm and smooth." }
    ]
  }
];

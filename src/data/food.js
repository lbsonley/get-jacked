import foodGroups from './food-groups';

// TODO => brands
// TODO => saturated fat, salt, fiber, sugar

const food = {
  bacon: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 385,
      carbohydrates: 0.5,
      fat: 35,
      protein: 17,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'bacon',
    name: 'Bacon',
    unit: 'g',
  },
  banana: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 90,
      carbohydrates: 23,
      fat: 0.5,
      protein: 1.1,
    },
    foodGroup: foodGroups.fruits,
    id: 'banana',
    name: 'Banana',
    unit: 'g',
  },
  baerentatzenMidor: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 413,
      carbohydrates: 66,
      fat: 13,
      fiber: 2.6,
      protein: 6.7,
      saturatedFat: 5.2,
      sugar: 40,
    },
    foodGroup: foodGroups.sweets,
    id: 'baerentatzenMidor',
    name: 'Baerentatzen - Midor',
    unit: 'g',
  },
  barbellProteinBar: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 204,
      carbohydrates: 16,
      fat: 8.4,
      protein: 20,
    },
    foodGroup: foodGroups.supplements,
    id: 'barbellProteinBar',
    name: 'Barbell Protein Bar',
    unit: 'bar',
  },
  bellPepper: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 31,
      carbohydrates: 6,
      fat: 0.3,
      protein: 1,
      saturatedFat: 0,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'bellPepper',
    name: 'Pepper (Bell)',
    unit: 'g',
  },
  blackBeansCooked: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 131,
      carbohydrates: 24,
      fat: 0.4,
      fiber: 8.5,
      protein: 8.5,
      saturatedFat: 0.1,
      sugar: 0.4,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'blackBeansCooked',
    name: 'Black Beans (cooked)',
    unit: 'g',
  },
  blackBeansDry: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 331,
      carbohydrates: 61,
      fat: 1.4,
      protein: 21,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'blackBeansDry',
    name: 'Black Beans (dry) - Turk',
    unit: 'g',
  },
  blackberryFresh: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 43,
      carbohydrates: 10,
      fat: 0.5,
      protein: 1.4,
    },
    foodGroup: foodGroups.fruits,
    id: 'blackberryFresh',
    name: 'Blackberry (fresh)',
    unit: 'g',
  },
  blueberryFresh: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 57,
      carbohydrates: 14,
      fat: 0.3,
      protein: 0.7,
    },
    foodGroup: foodGroups.fruits,
    id: 'blueberryFresh',
    name: 'Blueberry (fresh)',
    unit: 'g',
  },
  broccoli: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 30,
      carbohydrates: 5,
      fat: 0,
      protein: 3,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'broccoli',
    name: 'Broccoli',
    unit: 'g',
  },
  brusselSprouts: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 43,
      carbohydrates: 9,
      fat: 0.3,
      protein: 3.4,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'brusselSprouts',
    name: 'Brussel Sprouts',
    unit: 'g',
  },
  buendnerFleischMigrosBio: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 187,
      carbohydrates: 1,
      fat: 3,
      protein: 39,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'buendnerFleischMigrosBio',
    name: 'Buendnerfleisch - Mirgos Bio',
    unit: 'g',
  },
  buendnerRohschinkenMigros: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 259,
      carbohydrates: 1,
      fat: 15,
      protein: 30,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'buendnerRohschinkenMigros',
    name: 'Buendner Rohschinken - Migros',
    unit: 'g',
  },
  canteloupe: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 35,
      carbohydrates: 8,
      fat: 0,
      protein: 0.8,
    },
    foodGroup: foodGroups.fruits,
    id: 'canteloupe',
    name: 'Canteloupe',
    unit: 'g',
  },
  carrot: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 41,
      carbohydrates: 10,
      fat: 0,
      protein: 1,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'carrot',
    name: 'Carrot',
    unit: 'g',
  },
  cashewUnsaltedSunQueen: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 583,
      carbohydrates: 21,
      fat: 45,
      protein: 20,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'cashewUnsaltedSunQueen',
    name: 'Cashew (unsalted) - Sun Queen',
    unit: 'g',
  },
  cervelat100GMClassic: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 262,
      carbohydrates: 1,
      fat: 14,
      protein: 6,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'cervelat',
    name: 'Cervelat (100g) - M-Classic',
    unit: 'g',
  },
  chickenBreastChoppedOptigal: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 114,
      carbohydrates: 0,
      fat: 1.5,
      protein: 25,
      sugar: 0,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'chickenBreastChoppedOptigal',
    name: 'Chicken Breast (chopped) - Optigal',
    unit: 'g',
  },
  chickpeasDry: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 378,
      carbohydrates: 63,
      fat: 6,
      protein: 10,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'chickpeasDry',
    name: 'Chickpeas (dry)',
    unit: 'g',
  },
  cottageCheeseNatureMClassic: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 85,
      carbohydrates: 2.7,
      fat: 3.8,
      protein: 10,
    },
    foodGroup: foodGroups.dairy,
    id: 'cottageCheeseNatureMClassic',
    name: 'Cottage Cheese (nature) - M-Classic',
    unit: 'g',
  },
  driedMango: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 351,
      carbohydrates: 80,
      fat: 1,
      protein: 2,
    },
    foodGroup: foodGroups.fruits,
    id: 'driedMango',
    name: 'Dried Mango',
    unit: 'g',
  },
  eggWhole53Gram: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 72,
      carbohydrates: 0.4,
      fat: 5,
      protein: 6.5,
    },
    foodGroup: foodGroups.dairy,
    id: 'eggWhole53Gram',
    name: 'Egg (whole, 53 gram+)',
    unit: 'egg',
  },
  feta: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 264,
      carbohydrates: 4.1,
      fat: 21,
      protein: 14,
    },
    foodGroup: foodGroups.dairy,
    id: 'feta',
    name: 'Feta',
    unit: 'g',
  },
  fusilli: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 359,
      carbohydrates: 72,
      fat: 1.5,
      protein: 13,
    },
    foodGroup: foodGroups.grains,
    id: 'fusilli',
    name: 'Fussili',
    unit: 'g',
  },
  grapefruit: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 42,
      carbohydrates: 1,
      fat: 0.1,
      protein: 0.8,
    },
    foodGroup: foodGroups.fruits,
    id: 'grapefruit',
    name: 'Grapefruit',
    unit: 'g',
  },
  hazlenuts: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 628,
      carbohydrates: 17,
      fat: 61,
      protein: 15,
      saturatedFat: 4.5,
      sugar: 4.3,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'hazlenuts',
    name: 'Hazlenuts',
    unit: 'g',
  },
  kidneyBeansDry: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 310,
      carbohydrates: 57,
      fat: 1,
      protein: 20,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'kidneyBeansDry',
    name: 'Kidney Beans (dry)',
    unit: 'g',
  },
  milkReducedFatLactoseFree: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 48,
      carbohydrates: 5,
      fat: 1.6,
      protein: 3.5,
    },
    foodGroup: foodGroups.dairy,
    id: 'milkReducedFatLactoseFree',
    name: 'Milk (Lactose Free, Reduced Fat)',
    unit: 'ml',
  },
  milkWhole: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 70,
      carbohydrates: 2.5,
      fat: 4,
      protein: 3,
    },
    foodGroup: foodGroups.dairy,
    id: 'milkWhole',
    name: 'Milk (whole)',
    unit: 'ml',
  },
  oatmealGlutenFreeCoopBio: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 380,
      carbohydrates: 60,
      fat: 7,
      protein: 15,
    },
    foodGroup: foodGroups.grains,
    id: 'oatmealGlutenFreeCoopBio',
    name: 'Oatmeal (gluten free) - Coop Bio',
    unit: 'g',
  },
  orange: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 47,
      carbohydrates: 24,
      fat: 0,
      protein: 1,
    },
    foodGroup: foodGroups.fruits,
    id: 'orange',
    name: 'Orange',
    unit: 'g',
  },
  peanutButterNaturalNu3: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 616,
      carbohydrates: 7,
      fat: 50,
      protein: 29.5,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'peanutButterNaturalNu3',
    name: 'Peanut Butter (natural) - nu3',
    unit: 'g',
  },
  potato: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 75,
      carbohydrates: 15,
      fat: 0,
      protein: 2,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'potato',
    name: 'Potato',
    unit: 'g',
  },
  quinoaTricoloreMigrosBio: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 360,
      carbohydrates: 57,
      fat: 6,
      fiber: 1.2,
      protein: 13,
      saturatedFat: 0.7,
      sugar: 4.2,
    },
    foodGroup: foodGroups.grains,
    id: 'quinoaTricoloreMigrosBio',
    name: 'Quinoa (tricolore) - Migros Bio',
    unit: 'g',
  },
  raspberryFresh: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 52,
      carbohydrates: 12,
      fat: 0.6,
      protein: 1,
    },
    foodGroup: foodGroups.fruits,
    id: 'raspberryFresh',
    name: 'Raspberries (fresh)',
    unit: 'g',
  },
  riceWhiteCooked: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 130,
      carbohydrates: 28.5,
      fat: 0.2,
      fiber: 0.3,
      protein: 2.4,
      saturatedFat: 0,
      sugar: 0,
    },
    foodGroup: foodGroups.grains,
    id: 'riceWhiteCooked',
    name: 'Rice (white, cooked)',
    unit: 'g',
  },
  riceWhiteDryMClassicCarolina: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 343,
      carbohydrates: 77,
      fat: 0.5,
      fiber: 1,
      protein: 7,
      saturatedFat: 0.5,
      sugar: 0,
    },
    foodGroup: foodGroups.grains,
    id: 'riceWhiteMClassicCarolina',
    name: 'Rice (white, dry) - M-Classic Carolina',
    unit: 'g',
  },
  rindssaftplaetzliCoop: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 108,
      carbohydrates: 0,
      fat: 20,
      protein: 22,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'rindssaftplaetzliCoop',
    name: 'Rindssaftplaetzli - Coop',
    unit: 'g',
  },
  seelaenderli: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 191,
      carbohydrates: 1,
      fat: 16,
      protein: 12,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'seelaenderli',
    name: 'Seelaenderli',
    unit: 'sausage',
  },
  sourCreamValflora: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 338,
      carbohydrates: 3.1,
      fat: 35,
      saturatedFat: 21,
      protein: 2.3,
    },
    foodGroup: foodGroups.dairy,
    id: 'sourCreamValflora',
    name: 'Sour Cream - Valflora',
    unit: 'g',
  },
  sponserProteinBar35: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 110,
      carbohydrates: 13,
      fat: 8,
      protein: 18,
    },
    foodGroup: foodGroups.supplements,
    id: 'sponserProteinBar35',
    name: 'Sponser Protein Bar 35',
    unit: 'bar',
  },
  sponserProteinBar50: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 225,
      carbohydrates: 14,
      fat: 4.5,
      protein: 35,
    },
    foodGroup: foodGroups.supplements,
    id: 'sponserProteinBar50',
    name: 'Sponser Protein Bar 50',
    unit: 'bar',
  },
  strawberryFresh: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 33,
      carbohydrates: 8,
      fat: 0.3,
      protein: 0.7,
    },
    foodGroup: foodGroups.fruits,
    id: 'strawberryFresh',
    name: 'Strawberry (fresh)',
    unit: 'g',
  },
  tomato: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 18,
      carbohydrates: 4,
      fat: 0.2,
      protein: 1,
    },
    foodGroup: foodGroups.fruits,
    id: 'tomato',
    name: 'Tomato',
    unit: 'g',
  },
  tortillaWholeWheatPanchoVilla: {
    baseMeasure: 1,
    baseNutrition: {
      calories: 119,
      carbohydrates: 48,
      fat: 2.4,
      protein: 3.7,
      sugar: 0.9,
    },
    foodGroup: foodGroups.grains,
    id: 'tortillaWholeWheatPanchoVilla',
    name: 'Tortilla (whole wheat) - Pancho Villa',
    unit: 'tortilla',
  },
  tunaInWater: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 108,
      carbohydrates: 0,
      protein: 25,
      fat: 0.5,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'tunaInWater',
    name: 'Tuna (in water)',
    unit: 'g',
  },
  walnutsUnsaltedSunQueen: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 686,
      carbohydrates: 7,
      protein: 15,
      fat: 65,
    },
    foodGroup: foodGroups.meatsAndNuts,
    id: 'walnutsUnsaltedSunQueen',
    name: 'Walnuts (unsalted) - Sun Queen',
    unit: 'g',
  },
  wheyGrassFedNu3: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 341,
      carbohydrates: 5.5,
      fat: 1.4,
      protein: 77.4,
    },
    foodGroup: foodGroups.supplements,
    id: 'wheyGrassFedNu3',
    name: 'Whey (grass fed) - nu3',
    unit: 'g',
  },
  zucchini: {
    baseMeasure: 100,
    baseNutrition: {
      calories: 17,
      carbohydrates: 3,
      fat: 0.3,
      protein: 1.2,
    },
    foodGroup: foodGroups.vegetablesAndLegumes,
    id: 'zucchini',
    name: 'Zucchini',
    unit: 'g',
  },
};

export default food;

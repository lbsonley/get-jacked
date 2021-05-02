import { useEffect, useReducer, useState } from "react";
import uniqid from "uniqid";
import db from "../../../dexie";
import foods from "../../../data/food";
import SelectDayForm from "../../presentational/select-day-form/select-day-form";
import "./daily-nutrition-container.css";
import DailyNutritionTable from "../../presentational/daily-nutrition-table/daily-nutrition-table";
import AddFoodForm from "../../presentational/add-food-form/add-food-form";

const initialState = { foodData: {} };

function calculateItemNutrition({ foodData, quantity }) {
  const {
    baseMeasure,
    baseNutrition,
    name,
    unit,
  } = foodData

  let computedNutritionalValue = Object.entries(baseNutrition)
    .reduce((acc, [key, nutrientValue]) => {
      console.log(typeof baseMeasure);
      acc[key] = (quantity / baseMeasure) * nutrientValue
      return acc;
    }, {});

  computedNutritionalValue = Object.entries(computedNutritionalValue)
    .reduce((acc, [key, value]) => {
      acc[key] = Math.round(value * 10) / 10
      return acc;
    }, {});

  computedNutritionalValue.name = `${quantity} ${unit} ${name}`
  computedNutritionalValue.unit = unit;
  return computedNutritionalValue;
}

function calculateTotalNutrition(foodData) {
  /* sum calories and macro nutrient values for all food entries */
  let totalNutrients = Object.values(foodData).reduce((acc, cur) => {
    const { nutrition } = cur;
    acc.calories += nutrition.calories || 0;
    acc.carbohydrates += nutrition.carbohydrates || 0;
    acc.fat += nutrition.fat || 0;
    acc.fiber += nutrition.fiber || 0;
    acc.protein += nutrition.protein || 0;
    acc.saturatedFat += nutrition.saturatedFat || 0;
    acc.sugar += nutrition.sugar || 0;

    return acc;
  }, {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    protein: 0,
    saturatedFat: 0,
    sugar: 0,
  });

  /* round sums */
  totalNutrients = Object.entries(totalNutrients).reduce((acc, [key, value]) => {
    acc[key] = Math.round(value);
    return acc;
  }, {});

  return totalNutrients;
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'addFood':
      const id = uniqid();

      return {
        foodData: {
          ...state.foodData,
          [id]: {
            id,
            nutrition: calculateItemNutrition(payload),
          },
        },
      };
    case 'addFoodData':
      return {
        foodData: {
          ...payload.foodData
        }
      }
    case 'clearFoodData':
      return {
        foodData: {}
      }
    case 'removeFood':
      const newFoodData = Object.keys(state.foodData)
        .filter((id) => id !== payload.id)
        .reduce((acc, id) => {
          acc[id] = state.foodData[id];
          return acc;
        }, {});
      return {
        foodData: {
          ...newFoodData,
        }
      };
    default:
      return state;
  }
}

function getTodayDateString() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

function DailyNutritionContainer() {
  /* food items in daily food list */
  const [foodDataState, dispatchFoodData] = useReducer(reducer, initialState)
  /* save food list form Selected Dateinput value */
  const [selectedDateTimestamp, setSelectedDateTimestamp] = useState(getTodayDateString);
  /* sum of nutritional values in food list */
  const [totalNutrients, setTotalNutrients] = useState({})

  /**
   * Runs once at component init
   * - get saved day from dexie
   * - this first query to dexie calls db.open() to open db connection and create tables if necessary
   */
  useEffect(() => {
    (async () => {
      const dayData = await db.days
        .where(':id')
        .equals(selectedDateTimestamp)
        .toArray();

      /* if data today's YYYY-MM-DD timestamp exists in dexie */
      if (dayData[0]) {
        const {
          foodData
        } = dayData[0];

        /* update food data with values from dexie */
        dispatchFoodData({ type: 'addFoodData', payload: { foodData } });
      }
    })()
  }, [])

  /* update total nutrient counts when food data changes */
  useEffect(() => {
    setTotalNutrients(calculateTotalNutrition(foodDataState.foodData));
  }, [foodDataState]);

  const handleUpdateDailyNutritionData = async (event) => {
    event.preventDefault();
    const dayData = await db.days
      .where(':id')
      .equals(selectedDateTimestamp)
      .toArray();

    if (dayData[0]) {
      /* if selectedDateTimestamp value exists in dexie */
      const {
        foodData
      } = dayData[0];


      /* update food data with values from dexie */
      dispatchFoodData({ type: 'addFoodData', payload: { foodData } });
    } else {
      /* if selectedDateTimestamp values does not exist in dexie */
      dispatchFoodData({ type: 'clearFoodData' })
    }
  }
  const performAddFood = ({ event, selectedFood, quantity }) => {
    event.preventDefault();
    const foodData = Object.values(foods).filter(food => (food.name === selectedFood));
    if (foodData.length) {
      dispatchFoodData({
        type: 'addFood',
        payload: {
          foodData: foodData[0],
          quantity: quantity,
        },
      });
    }
  };

  const handleRemoveFood = (event, id) => {
    event.preventDefault();
    dispatchFoodData({ type: 'removeFood', payload: { id } });
  }

  const handleSelectedDateInputChange = (event) => {
    setSelectedDateTimestamp(event.target.value);
  };

  const handleSaveDayData = async (event) => {
    const { foodData } = foodDataState;
    event.preventDefault();

    await db.days.put({ id: selectedDateTimestamp, totalNutrients, foodData }, selectedDateTimestamp);
  };

  return (
    <>
      <div className="daily-nutrition-header">
        <SelectDayForm
          selectedDateTimestamp={selectedDateTimestamp}
          updateDailyNutritionData={handleUpdateDailyNutritionData}
          updateSelectedDateTimestamp={handleSelectedDateInputChange}
        />
      </div>
      <div className="daily-nutrition-body">
        <div className="section">
          <AddFoodForm
            performAddFood={performAddFood}
          />
        </div>
        <div className="section">
          <DailyNutritionTable
            foodData={foodDataState.foodData}
            handleRemoveFood={handleRemoveFood}
            totalNutrients={totalNutrients}
          />
        </div>
        <div className="section">
          <button
            className="button"
            onClick={handleSaveDayData}
          >
            Save Day
          </button>
        </div>
      </div>
    </>
  );
}

export default DailyNutritionContainer;
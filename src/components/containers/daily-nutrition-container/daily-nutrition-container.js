import { useEffect, useReducer, useState } from "react";
import AutoSuggest from "react-autosuggest";
import uniqid from "uniqid";
import db from "../../../dexie";
import foods from "../../../data/food";
import SelectDayForm from "../../presentational/select-day-form/select-day-form";
import "./daily-nutrition-container.css";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return Object.values(foods).filter(food => regex.test(food.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

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
  /* add food form quantity input value */
  const [quantity, setQuantity] = useState(100);
  /* add food form AutoSuggest input value */
  const [selectedFood, setSelectedFood] = useState('');
  /* suggestions provided to the AutoSuggest input in the add food form */
  const [suggestions, setSuggestions] = useState([]);
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

  const handleAutoSuggestInputChange = (event, { newValue, method }) => {
    setSelectedFood(newValue);
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleAddFood = (event) => {
    event.preventDefault();
    console.log(selectedFood);
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

  const handleQuantityInputChange = (event) => {
    setQuantity(event.target.value);
  };

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
          <p>Enter the quantity and type of food that you ate to track your daily caloric and macro nutrient goals.</p>
          <form className="add-food-form">
            <div className="grid-row">
              <div className="grid-item grid-item-1-4">
                <label
                  className="label"
                  htmlFor="quantity"
                >
                  Quantity:
                </label>
                <input
                  className="input quantity-input"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                ></input>
              </div>

              <div className="grid-item grid-item-1-2">
                <label
                  className="label"
                  htmlFor="food-input"
                >
                  Food:
                </label>
                <AutoSuggest 
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={{
                    id: "food-input",
                    onChange: handleAutoSuggestInputChange,
                    value: selectedFood,
                  }}
                />
              </div>
              <div className="grid-item grid-item-1-4">
                <button
                  className="button"
                  onClick={handleAddFood}
                >
                  Add +
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="section">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row table-row--labels">
                <th
                  className="table-cell table-column__heading"
                  scope="col"
                >
                  Food
                </th>
                <th
                  className="table-cell table-column__heading"
                  scope="col"
                >
                  Cal
                </th>
                <th
                  className="table-cell table-column__heading"
                  scope="col"
                >
                  Carb
                </th>
                <th
                  className="table-cell table-column__heading"
                  scope="col"
                >
                  Pro
                </th>
                <th
                  className="table-cell table-column__heading"
                  scope="col"
                >
                  Fat
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.values(foodDataState.foodData).map(food => {
                const {
                  id,
                  nutrition: {
                    calories,
                    carbohydrates,
                    fat,
                    name,
                    protein,
                  }
                } = food;
                return (
                  <tr key={id}className="table-row">
                    <th
                      className="table-cell table-row__heading"
                      scope="row"
                    >
                      {name}
                    </th>
                    <td className="table-cell">
                      {calories}
                    </td>
                    <td className="table-cell">
                      {carbohydrates}
                    </td>
                    <td className="table-cell">
                      {protein}
                    </td>
                    <td className="table-cell">
                      {fat}
                    </td>
                    <td className="table-cell table-cell--delete">
                      <button
                        className="button"
                        onClick={(event) => { handleRemoveFood(event, id) }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="table-footer">
              <tr className="table-row totals-row">
                <th
                  className="table-cell table-row__heading"
                  scope="row"
                >
                  Totals:
                </th>
                <td className="table-cell table-cell__footer">
                  {`${totalNutrients.calories} kcal`}
                </td>
                <td className="table-cell table-cell__footer">
                  {`${totalNutrients.carbohydrates} g`}
                </td>
                <td className="table-cell table-cell__footer">
                  {`${totalNutrients.protein} g`}
                </td>
                <td className="table-cell table-cell__footer">
                  {`${totalNutrients.fat} g`}
                </td>
              </tr>
            </tfoot>
          </table>
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
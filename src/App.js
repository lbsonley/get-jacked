import { useEffect, useReducer, useState } from "react";
import AutoSuggest from "react-autosuggest";
import uniqid from "uniqid";
import foods from "./data/food";
import "./App.css";
import db from "./dexie";

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
  /* sum calories and macro nutrients */
  debugger;
  let totalNutrients = Object.values(foodData).reduce((acc, cur) => {
    const { nutrition } = cur;
    acc.calories += nutrition.calories;
    acc.carbohydrates += nutrition.carbohydrates;
    acc.fat += nutrition.fat;
    acc.protein += nutrition.protein;

    return acc;
  }, {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
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
          ...state.foodData,
          ...payload.foodData
        }
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

function getDateString() {
  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
}

function App() {
  const [foodDataState, dispatchFoodData] = useReducer(reducer, initialState)
  const [quantity, setQuantity] = useState(100);
  const [selectedFood, setSelectedFood] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [timestamp, setTimestamp] = useState(getDateString);
  const [totalNutrients, setTotalNutrients] = useState({})

  /* get saved day from dexie */
  useEffect(() => {
    (async () => {
      const dayData = await db.days
        .where(':id')
        .equals(getDateString())
        .toArray();

      if (dayData[0]) {
        const {
          foodData,
          totalNutrients,
        } = dayData[0];

        dispatchFoodData({ type: 'addFoodData', payload: { foodData } });
        setTotalNutrients(totalNutrients);
      }
    })()
  }, [])

  useEffect(() => {
    setTotalNutrients(calculateTotalNutrition(foodDataState.foodData));
  }, [foodDataState]);

  const onChange = (event, { newValue, method }) => {
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
    console.log(event, id);
    event.preventDefault();
    dispatchFoodData({ type: 'removeFood', payload: { id } });
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleTimestampChange = (event) => {
    setTimestamp(event.target.value);
  };

  const handleDaySave = async (event) => {
    const { foodData } = foodDataState;
    event.preventDefault();

    const id = await db.days.put({ id: timestamp, totalNutrients, foodData }, timestamp);
    console.log("Got id " + id);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Calorie and Macro Nutrient Tracker</h1>
      </div>
      <div className="App-body">
        <div className="grid-container">
          <p>Enter the quantity and type of food that you ate to track your daily caloric and macro nutrient goals.</p>
        </div>
        <form className="add-food-form">
          <div className="grid-container">
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
                  onChange={handleQuantityChange}
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
                    onChange: onChange,
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
            <div className="grid-row">
            </div>
          </div>
        </form>
        <div className="grid-container">

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
        <form className="save-day-form">
          <div className="grid-container">
            <div className="grid-row">
              <div className="grid-item grid-item-1-4">
                <label
                  className="label"
                  htmlFor="timestamp"
                >
                  Timestamp:
                </label>
                <input
                  className="input"
                  id="timestamp"
                  name="timestamp"
                  value={timestamp}
                  onChange={handleTimestampChange}
                ></input>
              </div>
              <div className="grid-item grid-item-1-4">
                <button
                  className="button"
                  onClick={handleDaySave}
                >
                  Save Day
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

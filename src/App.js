import { useEffect, useReducer, useState } from "react";
import AutoSuggest from "react-autosuggest";
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

const initialState = { foodsList: [] };

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
    }, {})

  computedNutritionalValue.name = `${quantity} ${unit} ${name}`
  computedNutritionalValue.unit = unit;
  return computedNutritionalValue;
}

function calculateTotalNutrition(foodsList) {
  let totalNutrients = foodsList.reduce((acc, cur) => {
    acc.calories += cur.calories;
    acc.carbohydrates += cur.carbohydrates;
    acc.fat += cur.fat;
    acc.protein += cur.protein;

    return acc;
  }, {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
  });

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
      return {
        foodsList: [
          ...state.foodsList,
          calculateItemNutrition(payload),
        ],
      };
    case 'addFoodsList':
      console.log(payload);
      return {
        foodsList: [
          ...payload.foodsList
        ],
      };
    case 'removeFood':
      return state;
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
  const [foodsListState, dispatchFoodsList] = useReducer(reducer, initialState)
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
          foodsList,
          totalNutrients,
        } = dayData[0];

        dispatchFoodsList({ type: 'addFoodsList', payload: { foodsList } });
        setTotalNutrients(totalNutrients);
      }
    })()
  }, [])

  useEffect(() => {
    setTotalNutrients(calculateTotalNutrition(foodsListState.foodsList));
  }, [foodsListState]);

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
      dispatchFoodsList({
        type: 'addFood',
        payload: {
          foodData: foodData[0],
          quantity: quantity,
        },
      });
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleTimestampChange = (event) => {
    setTimestamp(event.target.value);
  };

  const handleDaySave = async (event) => {
    const { foodsList } = foodsListState;
    event.preventDefault();

    const id = await db.days.put({ id: timestamp, totalNutrients, foodsList }, timestamp);
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
        <div className="grid-container food-list">
          <div className="grid-row labels-row">
            <div className="grid-item grid-item-1-5">
              Food
            </div>
            <div className="grid-item grid-item-1-5">
              Calories
            </div>
            <div className="grid-item grid-item-1-5">
              Carbohydrates
            </div>
            <div className="grid-item grid-item-1-5">
              Protein
            </div>
            <div className="grid-item grid-item-1-5">
              Fat
            </div>
          </div>
          {foodsListState.foodsList.map(food => {
            const { 
              calories,
              carbohydrates,
              fat,
              name,
              protein,
            } = food;
            return (
              <div className="grid-row border-bottom">
                <div className="grid-item grid-item-1-5">
                  {name}
                </div>
                <div className="grid-item grid-item-1-5">
                  {calories}
                </div>
                <div className="grid-item grid-item-1-5">
                  {carbohydrates}
                </div>
                <div className="grid-item grid-item-1-5">
                  {protein}
                </div>
                <div className="grid-item grid-item-1-5">
                  {fat}
                </div>
              </div>
            )
          })}
          <div className="grid-row totals-row">
            <div className="grid-item grid-item-1-5">
              Totals:
            </div>
            <div className="grid-item grid-item-1-5">
              {`${totalNutrients.calories} kcal`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${totalNutrients.carbohydrates} g`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${totalNutrients.protein} g`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${totalNutrients.fat} g`}
            </div>
          </div>
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

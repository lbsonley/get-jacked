import { useReducer, useState } from "react";
import AutoSuggest from "react-autosuggest";
import foods from "./data/food";
import "./App.css";
import food from "./data/food";

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

function computeEntryNutrition({ foodData, quantity }) {
  const {
    baseMeasure,
    baseNutrition,
    name,
    unit,
  } = foodData

  const computedNutritionalValue = Object.entries(baseNutrition)
    .reduce((acc, [key, nutrientValue]) => {
      console.log(typeof baseMeasure);
      acc[key] = (quantity / baseMeasure) * nutrientValue
      return acc;
    }, {});

  console.log(computedNutritionalValue);
  computedNutritionalValue.name = `${quantity} ${unit} ${name}`
  computedNutritionalValue.unit = unit;
  return computedNutritionalValue;
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'addFood':
      return {
        foodsList: [
          ...state.foodsList,
          computeEntryNutrition(payload),
        ]
      };
    case 'removeFood':
      return state;
    default:
      return state;
  }
}

function App() {
  const [quantity, setQuantity] = useState(100);
  const [selectedFood, setSelectedFood] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [foodsListState, dispatchFoodsList] = useReducer(reducer, initialState)

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
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }

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
                  className="input-label"
                  htmlFor="quantity"
                >
                  Quantity:
                </label>
                <input
                  className="quantity-input"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                ></input>
              </div>

              <div className="grid-item grid-item-1-2">
                <label
                  className="input-label"
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
                  className="add-food-button"
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
                  {`${Math.round(calories)} kcal`}
                </div>
                <div className="grid-item grid-item-1-5">
                  {`${Math.round(carbohydrates)} g`}
                </div>
                <div className="grid-item grid-item-1-5">
                  {`${Math.round(protein)} g`}
                </div>
                <div className="grid-item grid-item-1-5">
                  {`${Math.round(fat)} g`}
                </div>
              </div>
            )
          })}
          <div className="grid-row totals-row">
            <div className="grid-item grid-item-1-5">
              Totals:
            </div>
            <div className="grid-item grid-item-1-5">
              {`${Math.round(foodsListState.foodsList.reduce((acc, cur) => {
                acc += cur.calories;
                return acc;
              }, 0))} kcal`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${Math.round(foodsListState.foodsList.reduce((acc, cur) => {
                acc += cur.carbohydrates;
                return acc;
              }, 0))} g`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${Math.round(foodsListState.foodsList.reduce((acc, cur) => {
                acc += cur.protein;
                return acc;
              }, 0))} g`}
            </div>
            <div className="grid-item grid-item-1-5">
              {`${Math.round(foodsListState.foodsList.reduce((acc, cur) => {
                acc += cur.fat;
                return acc;
              }, 0))} g`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

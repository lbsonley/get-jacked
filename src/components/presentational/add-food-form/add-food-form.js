import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import foods from "../../../data/food";
import "./add-food-form.css";

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

const AddFoodForm = ({ performAddFood }) => {
  /* add food form quantity input value */
  const [quantity, setQuantity] = useState(100);
  /* suggestions provided to the AutoSuggest input in the add food form */
  const [suggestions, setSuggestions] = useState([]);
  /* add food form AutoSuggest input value */
  const [selectedFood, setSelectedFood] = useState('');

  const handleAutoSuggestInputChange = (event, { newValue, method }) => {
    setSelectedFood(newValue);
  };
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleQuantityInputChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddFood = (event) => {
    performAddFood({
      event,
      selectedFood,
      quantity,
    });
  }

  return (
    <form className="add-food-form">
      <fieldset className="add-food-form__fieldset">
        <legend className="add-food-form__legend">
          Enter the quantity and type of food that you ate to track your daily caloric and macro nutrient goals.
        </legend>
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
      </fieldset>
    </form>
  );
}

export default AddFoodForm;

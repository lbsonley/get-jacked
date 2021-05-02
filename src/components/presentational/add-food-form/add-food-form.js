import React, { useState } from "react";
import AutoSuggestFood from "../auto-suggest-food/auto-suggest-food";
import "./add-food-form.css";

const AddFoodForm = ({ performAddFood }) => {
  /* add food form AutoSuggest input value */
  const [selectedFood, setSelectedFood] = useState('');
  /* add food form quantity input value */
  const [quantity, setQuantity] = useState(100);

  const handleAutoSuggestInputChange = (event, { newValue, method }) => {
    setSelectedFood(newValue);
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
            <AutoSuggestFood
              selectedFood={selectedFood}
              updateSelectedFood={handleAutoSuggestInputChange}
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

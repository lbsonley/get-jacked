import React, { useState } from "react";
import AutoSuggest from "react-autosuggest";
import foods from "../../../data/food";
import "./auto-suggest-food.css";

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

const AutoSuggestFood = ({
  selectedFood,
  updateSelectedFood,
}) => {
  /* suggestions provided to the AutoSuggest input in the add food form */
  const [suggestions, setSuggestions] = useState([]);
  
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  return (
    <>
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
          onChange: updateSelectedFood,
          value: selectedFood,
        }}
      />
    </>
  )

};

export default AutoSuggestFood;

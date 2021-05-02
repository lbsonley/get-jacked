import React from "react";
import "./select-day-form.css";

const SelectDayForm = () => {
  return (
    <form className="select-day-form">
      <label
        htmlFor="select-day-input"
        className="label select-day-form__label"
      >
        Selected Day:
      </label>
      <input
        id="select-day-input"
        className="input select-day-form__input"
      />
    </form>
  )
}

export default SelectDayForm;

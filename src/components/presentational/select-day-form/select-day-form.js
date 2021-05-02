import React from "react";
import "./select-day-form.css";

const SelectDayForm = ({
  selectedDateTimestamp,
  updateDailyNutritionData,
  updateSelectedDateTimestamp,
}) => {

  return (
    <form
      className="select-day-form"
      onSubmit={updateDailyNutritionData}
    >
      <label
        htmlFor="select-day-input"
        className="label select-day-form__label"
      >
        Selected Day:
      </label>
      <input
        id="select-day-input"
        className="input select-day-form__input"
        value={selectedDateTimestamp}
        onChange={updateSelectedDateTimestamp}
      />
      <button
        className="button"
        type="submit"
      >
        Update
      </button>
    </form>
  )
}

export default SelectDayForm;

import React from "react";
import "./daily-nutrition-table.css";

const DailyNutritionTable = ({
  foodData,
  handleRemoveFood,
  totalNutrients,
}) => (
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
      {Object.values(foodData).map(food => {
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
          <tr
            key={id}
            className="table-row"
          >
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
);

export default DailyNutritionTable;
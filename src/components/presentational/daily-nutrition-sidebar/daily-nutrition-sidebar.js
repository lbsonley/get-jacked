import React from "react";

const DailyNutritionSidebar = () => (
  <nav className="layout-sidebar__navigation">
    <ul className="layout-sidebar__navigation-list">
      <li className="layout-sidebar__navigation-list-item">
        <p className="layout-sidebar__nagivation-list-link">
          Home
        </p>
      </li>
      <li className="layout-sidebar__navigation-list-item layout-sidebar__navigation-list-item--active">
        <p className="layout-sidebar__nagivation-list-link">
          Daily Nutrition
        </p>
      </li>
      <li className="layout-sidebar__navigation-list-item">
        <p className="layout-sidebar__nagivation-list-link">
          Nuritional Trends
        </p>
      </li>
      <li className="layout-sidebar__navigation-list-item">
        <p className="layout-sidebar__nagivation-list-link">
          Add Food
        </p>
      </li>
      <li className="layout-sidebar__navigation-list-item">
        <p className="layout-sidebar__nagivation-list-link">
          Add Recipe
        </p>
      </li>
    </ul>
  </nav>
);

export default DailyNutritionSidebar;

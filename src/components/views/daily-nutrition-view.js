import React from "react";
import SidebarLayout from "../layouts/sidebar-layout";
import DailyNutritionContainer from "../containers/daily-nutrition-container/daily-nutrition-container";

const sidebarNavLinks = [
  {
    name: 'Home',
  },
  {
    active: true,
    name: 'Daily Nutrition',
  },
  {
    name: 'Nutritional Trends',
  },
  {
    name: 'Workout Plan',
  },
];

const DailyNutritionView = () => {
  return (
    <SidebarLayout
      MainContent={DailyNutritionContainer}
      sidebarNavLinks={sidebarNavLinks}
    />
  );
};

export default DailyNutritionView;

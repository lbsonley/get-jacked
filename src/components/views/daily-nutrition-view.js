import React from "react";
import SidebarLayout from "../layouts/sidebar-layout";
import DailyNutritionContainer from "../containers/daily-nutrition-container/daily-nutrition-container";
import DailyNutritionSidebar from "../presentational/daily-nutrition-sidebar/daily-nutrition-sidebar";

const DailyNutritionView = () => {
  return (
    <SidebarLayout
      SidebarContent={DailyNutritionSidebar}
      MainContent={DailyNutritionContainer}
    />
  );
};

export default DailyNutritionView;

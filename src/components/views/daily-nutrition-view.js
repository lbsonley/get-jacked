import React from "react";
import SidebarLayout from "../layouts/sidebar-layout";
import DailyNutritionContainer from "../containers/daily-nutrition-container/daily-nutrition-container";

const DailyNutritionView = () => {
  return (
    <SidebarLayout>
      <DailyNutritionContainer/>
    </SidebarLayout>
  );
};

export default DailyNutritionView;

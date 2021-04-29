import React from "react";
import SidebarLayout from "../components/layouts/sidebar-layout";
import DailyNutritionContainer from "../components/containers/daily-nutrition-container/daily-nutrition-container";

const DailyNutritionView = () => {
  return (
    <SidebarLayout>
      <DailyNutritionContainer/>
    </SidebarLayout>
  );
};

export default DailyNutritionView;

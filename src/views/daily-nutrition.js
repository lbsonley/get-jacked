import React from "react";
import SidebarLayout from "../components/layouts/sidebar-layout";

const DailyNutrition = ({ children }) => {
  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
};

export default DailyNutrition;

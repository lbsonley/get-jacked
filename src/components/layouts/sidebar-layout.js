import React from 'react';
import './sidebar-layout.css';

const SidebarLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <div className="layout-sidebar__header">
          <h1 className="layout-sidebar__header-title">getJacked</h1>
        </div>
        <nav className="layout-sidebar__navigation">
          <ul className="layout-sidebar__navigation-list">
            <li className="layout-sidebar__navigation-list-item layout-sidebar__navigation-list-item--active">
              Daily Nutrition
            </li>
            <li className="layout-sidebar__navigation-list-item">
              Nuritional Trends
            </li>
            <li className="layout-sidebar__navigation-list-item">
              Nuritional Targets
            </li>
            <li className="layout-sidebar__navigation-list-item">
              Add Food
            </li>
            <li className="layout-sidebar__navigation-list-item">
              Add Recipe
            </li>
          </ul>
        </nav>
      </div>
      <div className="layout-main-content">
        {children}
      </div>
    </div>
  )
}

export default SidebarLayout;

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
      </div>
      <div className="layout-main-content">
        {children}
      </div>
    </div>
  )
}

export default SidebarLayout;

import React from 'react';
import './sidebar-layout.css';

const SidebarLayout = ({
  SidebarContent,
  MainContent
}) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <div className="layout-sidebar__header">
          <h1 className="layout-sidebar__header-title">getJacked</h1>
        </div>
        <SidebarContent />
      </div>
      <div className="layout-main-content">
        <MainContent/>
      </div>
    </div>
  )
}

export default SidebarLayout;

import React from 'react';
import classNames from 'classnames';
import './sidebar-layout.css';

const SidebarLayout = ({
  sidebarNavLinks,
  MainContent
}) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-sidebar">
        <div className="layout-sidebar__header">
          <h1 className="layout-sidebar__header-title">getJacked</h1>
        </div>
        <nav className="layout-sidebar__navigation">
          <ul className="layout-sidebar__navigation-list">
            {sidebarNavLinks.map((link) => (
              <li
                key={link.name}
                className={classNames(
                  "layout-sidebar__navigation-list-item",
                  {
                    "layout-sidebar__navigation-list-item--active": link.active,
                  })}
              >
                <p className="layout-sidebar__navigation-list-link">
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="layout-main-content">
        <MainContent/>
      </div>
    </div>
  )
}

export default SidebarLayout;

import React from 'react';
import './index.less';

const NavBox = () => (
  <div className="nav-box">
    <div className="category-tab">
      All
      <div className="active-line"></div>
    </div>
    <div className="category-tab">
      Physical
      <div className="active-line"></div>
    </div>
    <div className="category-tab">
      Virtual
      <div className="active-line"></div>
    </div>
    <div className="filter-box">
        <div className="search-box">
          <input type="text"/>
          <div className="search-icon">
            <i className="icon iconfont icon-search"></i>
          </div>
        </div>
        <div className="filter-status">
          <i className="icon iconfont icon-th-card"></i>
          <i className="icon iconfont icon-th-list"></i>
        </div>
    </div>
  </div>
);

export default NavBox;

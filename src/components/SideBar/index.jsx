import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

const SideBar = ({ historys }) => (
  <div className="side-bar">
    <div className="menu-list">
        <div className="menu-item">
          <i className="icon iconfont icon-dashboard"></i>
          <span>DASHBOARD</span>
        </div>
        <div className="menu-item">
          <i className="icon iconfont icon-sitemap"></i>AGENT
        </div>
        <div className="menu-item">
          <i className="icon iconfont icon-boat"></i>MY CRUISE
        </div>
        <div className="menu-item">
          <i className="icon iconfont icon-life-bouy"></i>HELP
        </div>
    </div>
    <div className="history">
        <div className="history-title">History</div>
        <ul className="history-list" style={{ 'gridTemplateRows': `repeat(${historys.length}, 30px)` }}>
          {
            historys.map(history => (
              <li key={history} className="history-list-item">
                <span className="middot">&middot;</span>
                <div className="history-log">{history}</div>
            </li>))
          }
        </ul>
    </div>
  </div>);

SideBar.propTypes = {
  historys: PropTypes.array,
};

SideBar.defaultProps = {
  historys: [],
};

export default SideBar;
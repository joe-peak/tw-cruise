import React from 'react';
import './index.less';

const Banner = () => (
  <div className="banners">
    <div className="building banners-item">
      <i className="icon iconfont icon-cog"></i>
      <div className="status-box">
        <div className="status">
          <div className="status-name">Building</div>
          <div className="status-count">3</div>
        </div>
      </div>
    </div>
    <div className="idle banners-item">
      <i className="icon iconfont icon-coffee"></i>
      <div className="status-box">
        <div className="status">
          <div className="status-name">Idle</div>
          <div className="status-count">5</div>
        </div>
      </div>
    </div>
    <div className="detail-info banners-item">
      <div className="detail-info-item-name">ALL</div>
      <div className="detail-info-item-name">PHYSICAL</div>
      <div className="detail-info-item-name">VIRTUAL</div>
      <div className="detail-info-item-data">8</div>
      <div className="detail-info-item-data">4</div>
      <div className="detail-info-item-data">4</div>
    </div>
  </div>
);

export default Banner;

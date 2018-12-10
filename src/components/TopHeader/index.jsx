import React from 'react'
import ReactSVG from 'react-svg'
import './index.less';
import avatar from '../../../assets/os-icons/avatar.png';

const TopHeader  = () => {
  return (
    <div className="top-header">
      <div className="subject">
        <ReactSVG
          svgClassName="svg-class-name"
          className="wrapper-class-name"
          src='../../../assets/logo/logo.svg'
        />
        <div className="avatar-box">
          <div className="avatar">
            <img src={avatar} alt="avatar"/>
          </div>
          <div>
            <div className="arrow-up">
              <div className="core-arrow-up"></div>
            </div>
            <div className="arrow-down">
              <div className="core-down-up"></div>
            </div>
          </div>
          <div className="select-box">
            <div className="select-list">
              <div className="profile select-item">
                <i className="icon iconfont icon-id-card"></i>
                <div className="item-text">Profile</div>
              </div>
              <div className="signout select-item">
                <i className="icon iconfont icon-sign-in"></i>
                <div className="item-text">Sign Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;

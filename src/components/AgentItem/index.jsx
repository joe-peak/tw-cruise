import React from 'react'
import PropTypes from 'prop-types';
import { noop } from '../../utils';
import './index.less';
import windows from '../../../assets/os-icons/windows.png';
import debian from '../../../assets/os-icons/debian.png';
import suse from '../../../assets/os-icons/suse.png';
import ubuntu from '../../../assets/os-icons/ubuntu.png';
import centos from '../../../assets/os-icons/centos.png';

const osLogMap = {
  windows,
  debian,
  suse,
  ubuntu,
  centos
};

const AgentItem = ({ agentData, onDelete, onAdd }) => {
  const { name, status, ip, os, id, location, resources = [] } = agentData;
  const deleteAgent = agent => {
    const currentAgents = resources.filter(item => item !== agent);
    const reqParams = {
      ...agentData,
      resources: currentAgents,
    };
    onDelete(id, reqParams);
  }

  const addAgent = e => {
    onAdd(e, agentData);
  };

  const renderResources = resources.map(agent => (
                  <div key={agent} className="agent-label">
                    {agent} <i onClick={() => deleteAgent(agent)} className="icon iconfont icon-trash"></i>
                  </div>
                ));

  return (
    <div className="agents-item">
      <div className="os-logo">
        <img src={osLogMap[os]} alt={os}/>
      </div>
      <div className="agent-record">
        <div className="basic-info">
          <div className="name">
            <i className="icon iconfont icon-desktop"></i> {name}
          </div>
          <span className={`status ${status}`}>
            {status}
          </span>
          <div className="ip-address">
            <i className="icon iconfont icon-info"></i> {ip}
          </div>
          <div className="folder-path">
            <i className="icon iconfont icon-folder"></i> {location}
          </div>
        </div>
        <div className="operation">
          <div className="add-agent">
            <div className="add-btn" onClick={addAgent} >
              <i className="icon iconfont icon-plus"></i>
            </div>
            <div className="added-agents" style={{ 'gridTemplateColumns': `repeat(${resources.length}, auto)` }}>
              {renderResources}
            </div>
          </div>
          <div className="deny-agent">
            <i className="icon iconfont icon-deny"></i> Deny
          </div>
        </div>
      </div>
    </div>
  );
}

AgentItem.propTypes = {
  agentData: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
};

AgentItem.defaultProps = {
  onDelete: noop,
  onAdd: noop,
}

export default AgentItem;

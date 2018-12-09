import React from 'react';
import PropTypes from 'prop-types';
import AgentItem from '../AgentItem/index.jsx';
import './index.less';

const AgentList = ({ agents, ...reset }) => {
  return (
    <div className="agents-list" style={{ 'gridTemplateRows': `repeat(${agents.length}, auto)` }}>
      {
        agents.map(agent => <AgentItem key={agent.id} agentData={agent} {...reset} />)
      }
    </div>
  );
}

AgentList.propTypes = {
  agents: PropTypes.array,
};

AgentList.defaultProps = {
  agents: [],
};


export default AgentList;

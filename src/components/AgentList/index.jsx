import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AgentItem from '../AgentItem/index.jsx';
import './index.less';

const AgentList = ({ agents }) => (
  <React.Fragment>
    <div className="agents-list" style={{ 'gridTemplateRows': `repeat(${agents.length}, auto)` }}>
      {
        agents.map(agent => (
          <AgentItem key={agent.id} agentData={agent} />)
        )
      }
    </div>
  </React.Fragment>
);

AgentList.propTypes = {
  agents: PropTypes.array,
};

AgentList.defaultProps = {
  agents: [],
};

export default AgentList;

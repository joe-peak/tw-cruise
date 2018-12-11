import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { stopPropagation } from '../../utils/index';
import { noop } from '../../utils';
import PopModal from '../../components/PopModal/index.jsx';
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

const baseUrl = '/api';

class AgentItem extends PureComponent {
  state = {
    currentAgent: {},
    // updated agent
    newAgent: null,
    // modal top
    top: 0, 
    // modal left
    left: 0,
    visible: false,
  };

  /**
   *
   * @params e event object
   * @params currentAgent current agent item to add
   */
  handleOpenAddModal = (e, currentAgent) => {
    stopPropagation(e);
    const { top, left, width, height } = e.target.getBoundingClientRect();
    this.setState({
      visible: true,
      currentAgent,
      top: top + height + 22,
      left: left + width/2 -28
    });
  }

  /**
   * @params e event object
   * @params val new agent inputed
   */
  handleSaveAgent = (e, val) => {
    stopPropagation(e);
    const {
      currentAgent,
      currentAgent: {
        id,
        resources,
      },
    } = this.state;
    const reqParams = { ...currentAgent };
    // delete repeat agents
    const newResources =  new Set(resources.concat(val.split(';')));
    val && (reqParams.resources = Array.from(newResources));
    val && this.handleModify(id, reqParams)
              .then(() => this.closeModal());
  }

  /**
   * modify agent
   * @params id id of agent
   * @params params data of agent
   */
  handleModify = (id, params) =>
        axios.put(`${baseUrl}/agents/${id}`, params)
        .then(() => {
          this.refresh(id);
        });

  /**
   * refresh single agent data when add or delete
   * @params id id id of agent
   */
  refresh = id => {
    axios.get(`${baseUrl}/agents/${id}`)
    .then(({ data = {} }) => {
      this.setState({
        newAgent: data,
      })
    });
  }

  closeModal = () => {
    this.setState({
      visible: false,
      top: 0, 
      left: 0,
    });
  }

  /**
   * delete agent
   * @params agent  agent name
   */
  deleteAgent = agent => {
    const { newAgent } = this.state;
    const agentData = newAgent || this.props.agentData;
    const { id, resources = [] }  = agentData;
    const currentAgents = resources.filter(item => item !== agent);
    const reqParams = {
      ...agentData,
      resources: currentAgents,
    };
    this.handleModify(id, reqParams);
  }

  /**
   * add new agent
   * @params e event object
   */
  addAgent = e => {
    const { newAgent } = this.state;
    const agentData = newAgent || this.props.agentData;
    this.handleOpenAddModal(e, agentData);
  };

  // render resources list
  renderResources = () => {
    const { newAgent } = this.state;
    const { resources = [] }  =  newAgent || this.props.agentData;
    return resources.map(agent => (
      <div key={agent} className="agent-label">
        {agent} <i onClick={() => this.deleteAgent(agent)} className="icon iconfont icon-trash"></i>
      </div>
    ));
  }

  render() {
    const { newAgent } = this.state;
    const {
      name, 
      status,
      ip,
      os,
      location,
      resources = []
    } = newAgent || this.props.agentData;
    const { visible, top, left } = this.state;
    const position = {
      top,
      left,
    };

    return (
      <React.Fragment>
        <PopModal
          visible={visible}
          onSave={this.handleSaveAgent}
          onCancel={this.closeModal}
          position={position}
        />
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
                <div className="add-btn" onClick={this.addAgent} >
                  <i className="icon iconfont icon-plus"></i>
                </div>
                <div className="added-agents" style={{ 'gridTemplateColumns': `repeat(${resources.length}, auto)` }}>
                  {this.renderResources()}
                </div>
              </div>
              <div className="deny-agent">
                <i className="icon iconfont icon-deny"></i> Deny
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
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

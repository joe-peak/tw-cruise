import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { stopPropagation } from './utils/index.js';
import PopModal from './components/PopModal/index.jsx';
import TopHeader from './components/TopHeader/index.jsx';
import SideBar from './components/SideBar/index.jsx';
import Banner from './components/Banner/index.jsx';
import NavBox from './components/NavBox/index.jsx';
import AgentList from './components/AgentList/index.jsx';
import './index.less';
import '../assets/font-icons/fonts.less';

const baseUrl = '/api';

class Index extends PureComponent {
    state = {
      top: 0, 
      left: 0,
      visible: false,
      agents: [],
      currentAgent: {},
    };

    componentDidMount(){
      document.onclick=this.closeModal;
      this.handleQuery();
    }

    handleQuery = () => {
      axios.get(`/api/agents`).then(({ data = [] }) => {
        this.setState({
          agents: data,
        })
      });
    }

    handleSaveAgent = (e, val) =>{
      stopPropagation(e);
      const {
        currentAgent,
        currentAgent: {
          id,
          resources,
        },
      } = this.state;
      const reqParams = { ...currentAgent };
      const newResources =  new Set(resources.concat(val.split(';')));
      val && (reqParams.resources = Array.from(newResources));
      val && this.handleModify(id, reqParams)
                .then(() => this.closeModal());
      // this.closeModal();
    }

    handleModify = (id, params) =>
      axios.put(`${baseUrl}/agents/${id}`, params)
        .then(() => {
          this.handleQuery();
        });

    closeModal = () => {
      this.setState({
        visible: false,
        top: 0, 
        left: 0,
      });
    }
  
    handleAdd = (e, currentAgent) => {
      stopPropagation(e);
      const { top, left, width, height } = e.target.getBoundingClientRect();
      this.setState({
        visible: true,
        currentAgent,
        top: top + height + 22,
        left: left + width/2 -28
      });
    }

    render() {
      const { top, left, visible, agents } = this.state;
      const position = {
        top,
        left
      };
      const historys = agents.map(({ name }) => name);
      return (
        <div className="wrapper">
          <PopModal
              visible={visible}
              onSave={this.handleSaveAgent}
              onCancel={this.closeModal}
              position={position}
            />
          <TopHeader />
          <div className="container">
            <SideBar historys={historys} />
            <div className="main-content">
              <Banner />
              <NavBox />
              <AgentList
                agents={agents}
                onAdd={this.handleAdd}
                onDelete={this.handleModify}
              />
            </div>
          </div>
        </div>);
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));
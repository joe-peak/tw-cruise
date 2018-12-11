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
      agents: [],
    };

    componentDidMount(){
      this.handleQuery();
    }

    handleQuery = () => {
      axios.get(`/api/agents`).then(({ data = [] }) => {
        this.setState({
          agents: data,
        })
      });
    }

    render() {
      const { agents } = this.state;
      
      const historys = agents.map(({ name }) => name);
      return (
        <div className="wrapper">
          <TopHeader />
          <div className="container">
            <SideBar historys={historys} />
            <div className="main-content">
              <Banner />
              <NavBox />
              <AgentList agents={agents} />
            </div>
          </div>
        </div>);
  }
}

ReactDOM.render(<Index />, document.getElementById('index'));
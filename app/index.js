import React,{ Component }                            from 'react';
import ReactDOM                                       from 'react-dom';
import { Provider,connect }                           from 'react-redux';
import { BrowserRouter, Route, Link, HashRouter }     from 'react-router-dom';

import Datetime from './calendar';

import './style.scss';

export default class Index extends React.Component{

  constructor (props) {
    super(props);
    let date                = new Date();
    this.state = {
    }
  }

  test( dddd ){
    console.log(dddd)
  }

  render(){
    return(
      <div id="wrapper">
        <ul style={{ "display":"flex" }}>
          <li style={{ "display":"inline-flex", "marginRight":"10px" }}><Datetime tiemSwitch="true" name="startDate" value={this.test.bind(this)}/></li>
          <li style={{ "display":"inline-flex" }}><Datetime tiemSwitch="false" name="endDate" value={this.test.bind(this)}/></li>
        </ul>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Index/>,app);

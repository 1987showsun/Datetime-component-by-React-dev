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
      formInput : {
        startDate2 : "",
        endDate2   : "",
      }
    }
  }

  test( dddd ){
    //console.log(dddd)
  }

  test2( value ){
    let formInput = this.state.formInput;
    formInput[ value['name'] ] = value['date'];
    this.setState({
      formInput : formInput
    })
  }

  render(){
    return(
      <div id="wrapper">
        <ul style={{ "display":"flex","marginBottom":"60px" }}>
          <li style={{ "display":"inline-flex", "marginRight":"10px" }}><Datetime tiemSwitch="true" name="startDate" callBackReturn={this.test.bind(this)}/></li>
          <li style={{ "display":"inline-flex" }}><Datetime tiemSwitch="false" name="endDate" callBackReturn={this.test.bind(this)} max="2018-06-20" min="2018-06-12"/></li>
        </ul>
        <ul style={{ "display":"flex" }}>
          <li style={{ "display":"inline-flex", "marginRight":"10px" }}><Datetime tiemSwitch="true" name="startDate2" callBackReturn={this.test2.bind(this)} max={this.state.formInput['endDate2']}/></li>
          <li style={{ "display":"inline-flex" }}><Datetime tiemSwitch="false" name="endDate2" callBackReturn={this.test2.bind(this)} min={this.state.formInput['startDate2']}/></li>
        </ul>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Index/>,app);

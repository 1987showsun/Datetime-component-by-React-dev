import React,{ Component }                            from 'react';

export default class Datetime extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
          tiemSwitch           : props.tiemSwitch || false,
          calendarWrapConState : "close",
          nowYear              : dateAction().nowYear,
          nowMonth             : dateAction().nowMonth,
          nowDate              : dateAction().nowDate,
          combinationDate      : `${dateAction().nowYear}-${dateAction().nowMonth}-${dateAction().nowDate}`,
          calendarHead         : ["日","一","二","三","四","五","六"],
          nowPageMonthDate     : [],
          selectedDate         : {},
          inputSet             : {
            name                 : props.name,
            time                 : {
              hrs                  : dateAction().nowHrs,
              min                  : dateAction().nowMin,
              sec                  : dateAction().nowSec
            },
            dateArray            : {
              year                 : dateAction().nowYear,
              month                : dateAction().nowMonth,
              day                  : dateAction().nowDate
            },
            date                 : `${dateAction().nowYear}-${dateAction().nowMonth}-${dateAction().nowDate}`,
            value                : props.startDate || `${dateAction().nowYear}-${dateAction().nowMonth}-${dateAction().nowDate} ${dateAction().nowHrs}:${dateAction().nowMin}:${dateAction().nowSec}`
          }
        }
    }

    componentDidMount() {
      let inputSet            = Object.assign({},this.state.inputSet);
      let nowYear             = this.state.nowYear;
      let nowMonth            = this.state.nowMonth;
      let nowDate             = this.state.nowDate;
      let _this               = this;
      this.getMonthAllDate(nowYear,nowMonth,nowDate);
      this.props.value(inputSet);

      $('html').on({
        click : function(e){
          e.preventDefault();
          _this.setState({
            calendarWrapConState : "close",
          });
        }
      })
    }

    

    getMonthAllDate(nowYear,nowMonth,nowDate){
        let lastMonthTotalDay   = new Date(nowYear, nowMonth-1 , 0).getDate();
        let mowMonthtotalDay    = new Date(nowYear, nowMonth   , 0).getDate();
        let afterMonthtotalDay  = new Date(nowYear, nowMonth+1 , 0).getDate();
        let startDate           = new Date(nowYear, nowMonth   , 30-mowMonthtotalDay );
        let startDay            = startDate.getUTCDay();
        let endDay              = new Date(nowYear, nowMonth+1 , 30-afterMonthtotalDay).getUTCDay();
        let renderTotalDayArray = [];
    
        for( let i=1 ; i <= startDay ; i++ ){
          let lastMonthDay = lastMonthTotalDay-(startDay-i);
          if( nowMonth==1 ){
            renderTotalDayArray.push({year: nowYear, month: 12, date: lastMonthDay, selected: ""});
          }else{
            renderTotalDayArray.push({year: nowYear, month: nowMonth-1, date: lastMonthDay, selected: ""});
          }
        }
    
        for( let i=1 ; i <= mowMonthtotalDay ; i++ ){
          renderTotalDayArray.push({year: nowYear, month: nowMonth, date: i, selected: "" });
        }
        
        if( endDay!=0 ){
          if( nowMonth==12 ){
            nowYear++   ;
            nowMonth = 1;
          }else{
            nowMonth++;
          }
          for( let i=1 ; i <= (7-endDay) ; i++ ){
            renderTotalDayArray.push({year: nowYear, month: nowMonth, date: i, selected: "" });
          }
        }
    
        renderTotalDayArray.map((item,i)=>{
          if( item['year']==nowYear && item['month']==nowMonth && item['date']==nowDate ){
            item['selected'] = "nowDate";
          }
        })
    
        this.setState({
          nowPageMonthDate  : renderTotalDayArray,
        });
    }
    
      changeMonth(btnType,dateType){
        let nowYear         = this.state.nowYear;
        let nowMonth        = this.state.nowMonth;
        let nowDate         = this.state.nowDate;
    
        switch( btnType ){
          case "prev" :
            if( dateType=="month" ){
              if( nowMonth>1 ){
                nowMonth--;
              }else{
                nowMonth = 12;
              }
            }else{
              nowYear--;
            }
            break;
    
          case "next" :
            if( dateType=="month" ){
              if( nowMonth>=12 ){
                nowMonth = 1;
              }else{
                nowMonth ++;
              }
            }else{
              nowYear++;
            }
            break;
        }
    
        this.setState({
          nowYear  : nowYear,
          nowMonth : nowMonth
        });

        this.getMonthAllDate(nowYear,nowMonth,nowDate);
      }
    
      selectedDate(item){
        let inputSet         = Object.assign({},this.state.inputSet);
        let nowPageMonthDate = Object.assign([],this.state.nowPageMonthDate);
        let selectedYear     = String(item['year']).length<2  ?  `0${item['year']}`  : `${item['year']}`;
        let selectedMonth    = String(item['month']).length<2 ?  `0${item['month']}` : `${item['month']}`;
        let selectedDate     = String(item['date']).length<2  ?  `0${item['date']}`  : `${item['date']}`;
        let selectedHrs      = String(inputSet['time']['hrs']).length<2?  `0${inputSet['time']['hrs']}`  : `${inputSet['time']['hrs']}`;
        let selectedMin      = String(inputSet['time']['min']).length<2?  `0${inputSet['time']['min']}`  : `${inputSet['time']['min']}`;
        let selectedSec      = String(inputSet['time']['sec']).length<2?  `0${inputSet['time']['sec']}`  : `${inputSet['time']['sec']}`;


        inputSet['date']     = `${selectedYear}-${selectedMonth}-${selectedDate}`;
        inputSet['value']    = `${selectedYear}-${selectedMonth}-${selectedDate} ${selectedHrs}:${selectedMin}:${selectedSec}`;
        inputSet['dateArray']['year']     = `${selectedYear}`;
        inputSet['dateArray']['month']    = `${selectedMonth}`;
        inputSet['dateArray']['day']      = `${selectedDate}`;        

        nowPageMonthDate.map((nowPageMonthDateItem,i)=>{
          if( nowPageMonthDateItem['year']==item['year'] && nowPageMonthDateItem['month']==item['month'] && nowPageMonthDateItem['date']==item['date'] ){
            nowPageMonthDateItem['selected'] = "nowDate";
          }else{
            nowPageMonthDateItem['selected'] = "";
          }
        })
        this.props.value(inputSet);
        this.setState({
          combinationDate  : `${selectedYear}-${selectedMonth}-${selectedDate}`,
          inputSet         : inputSet,
          nowPageMonthDate : nowPageMonthDate
        })
      }
    
    handleClick(){
      this.focusInput.focus();
    }
  
    handleChange(e){
      let inputSet      = Object.assign({},this.state.inputSet);
      let name          = e.target.name;
      let value         = e.target.value;
      inputSet["value"] = value;
      this.props.value(inputSet);
    }
    
    handleChangeTime(e){
      let combinationDate  = this.state.combinationDate;
      let inputSet         = Object.assign({},this.state.inputSet);
      let name             = e.target.name;
      let value            = e.target.value;
      
      value = calculate(name,"",value);
      
      inputSet['time'][name] = value;
      inputSet['value']  =`${combinationDate} ${inputSet['time']['hrs']}:${inputSet['time']['min']}:${inputSet['time']['sec']}`;
      
      this.props.value(inputSet);
      this.setState({
        inputSet  : inputSet
      })
    }
    
    changeTime(dateType,btnType){
      let combinationDate = this.state.combinationDate;
      let inputSet        = Object.assign({},this.state.inputSet);
      let val             = this.state.inputSet['time'][dateType];
      let resultVal       = calculate(dateType,btnType,val);
      inputSet['time'][dateType] = resultVal;
      inputSet['value']  =`${combinationDate} ${inputSet['time']['hrs']}:${inputSet['time']['min']}:${inputSet['time']['sec']}`;
      this.props.value(inputSet);
      this.setState({
        inputSet : inputSet
      });
    }

    calendarWrapConState(status){
      this.setState({
        calendarWrapConState : status
      })
    }

    render(){
        return(
            <div className="calendar-wrap" ref={(input) => {this.focusInput = input}} onClick={this.calendarWrapConState.bind(this,"open")}>
      
                <div className="input-box">
                  <input type="text" name={this.state.inputSet['name']} value={this.state.inputSet['value']} onClick={this.handleClick.bind(this)} onChange={this.handleChange.bind(this)} />
                  <span className="input-box-icon far fa-calendar-alt"></span>
                </div>
      
                <div className={`calendar-wrap-con ${this.state.calendarWrapConState}`} onClick={this.calendarWrapConState.bind(this,"open")}>
                    <div className="calendar-tool">
                        <button className="fas fa-angle-double-left" onClick={this.changeMonth.bind(this,"prev","year")}></button>
                        <button className="fas fa-chevron-left" onClick={this.changeMonth.bind(this,"prev","month")}></button>
                        <div className="showNowMonth">{`${this.state.nowYear} / ${this.state.nowMonth}`}</div>
                        <button className="fas fa-chevron-right" onClick={this.changeMonth.bind(this,"next","month")}></button>
                        <button className="fas fa-angle-double-right" onClick={this.changeMonth.bind(this,"next","year")}></button>
                    </div>
        
                    <ul className="calendar calendar-head">
                    {
                        this.state.calendarHead.map((item,i)=>{
                        return(<li key={i}>{item}</li>);
                        })
                    }
                    </ul>
        
                    <ul className="calendar calendar-body">
                    {
                        this.state.nowPageMonthDate.map((item,i)=>{
                        return(
                            <li key={i} className={`${item['selected']}`} onClick={this.selectedDate.bind(this,item)}>
                            {item.date}
                            </li>
                        );
                        })
                    }
                    </ul>
                    {
                      this.state.tiemSwitch &&
                        <ul className="time">
                          <li>
                              <div className="input-box">
                              <input type="text" name="hrs" value={this.state.inputSet['time']['hrs']} onChange={this.handleChangeTime.bind(this)} />
                              <div className="timeAction">
                                  <button className="up fas fa-chevron-up" onClick={ this.changeTime.bind(this,"hrs","up") }></button>
                                  <button className="dowm fas fa-chevron-down" onClick={ this.changeTime.bind(this,"hrs","down") }></button>
                              </div>
                              </div>
                          </li>
                          <li className="timeNull">:</li>
                          <li>
                              <div className="input-box">
                              <input type="text" name="min" value={this.state.inputSet['time']['min']} onChange={this.handleChangeTime.bind(this)} />
                              <div className="timeAction">
                                  <button className="up fas fa-chevron-up" onClick={this.changeTime.bind(this,"min","up")}></button>
                                  <button className="dowm fas fa-chevron-down" onClick={this.changeTime.bind(this,"min","down")}></button>
                              </div>
                              </div>
                          </li>
                          <li className="timeNull">:</li>
                          <li>
                              <div className="input-box">
                              <input type="text" name="sec" value={this.state.inputSet['time']['sec']} onChange={this.handleChangeTime.bind(this)} />
                              <div className="timeAction">
                                  <button className="up fas fa-chevron-up" onClick={this.changeTime.bind(this,"sec","up")}></button>
                                  <button className="dowm fas fa-chevron-down" onClick={this.changeTime.bind(this,"sec","down")}></button>
                              </div>
                              </div>
                          </li>
                      </ul>
                    }
                </div>
            </div>
        );
    }
}

const dateAction = () => {
    
    let date             = new Date();
    let nowYear          = String(date.getFullYear()).length<2? `0${date.getFullYear()}` : `${date.getFullYear()}` ;
    let nowMonth         = String(date.getMonth()+1).length<2?  `0${date.getMonth()+1}`  : `${date.getMonth()+1}`  ;
    let nowDate          = String(date.getDate()).length<2?     `0${date.getDate()}`     : `${date.getDate()}`     ;
    let nowHrs           = String(date.getHours()).length<2?    `0${date.getHours()}`    : `${date.getHours()}`    ;
    let nowMin           = String(date.getMinutes()).length<2?  `0${date.getMinutes()}`  : `${date.getMinutes()}`  ;
    let nowSec           = String(date.getSeconds()).length<2?  `0${date.getSeconds()}`  : `${date.getSeconds()}`  ;

    return {
        nowYear  : nowYear,
        nowMonth : nowMonth,
        nowDate  : nowDate,
        nowHrs   : nowHrs,
        nowMin   : nowMin,
        nowSec   : nowSec
    }
}

const calculate = (dateType,btnType,val)=>{
  let max = "00";
  let min = "00";
  switch (dateType) {
    case "hrs":
      max = 23;
      break;
  
    default:
      max = 59;
      break;
  }
  
  if( btnType=="up" ){
    val--;
  }else{
    val++;
    if( btnType=="" ){
      val--;
    }
  }

  if( val<Number(min) ){
    val = Number(max);
  }else if( val>Number(max) ){
    val = Number(min);
  }

  val = String(val).length<2? `0${val}` : `${val}`;

  return val;
}
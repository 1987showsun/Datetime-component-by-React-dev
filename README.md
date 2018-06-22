# React Datetime Component
時間日期 React元件

## API
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| name         | string  | input name  |
| tiemSwitch   | boolean | select time switch |


## return 
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
|value         |     Object    |         this.functionName.bind(this) |


```js
  constructor(props){
     super(props);
     this.state = {
        form : {
           startDate : ""
        }
     }
  }
  
  .
  .
  .
  
  test( val ){
    let form = this.state.form;
    form[val.name] = val['value'];
    this.setState({
      form : form
    })
  }
  
  .
  .
  .
  
  render(){
    return <Datetime tiemSwitch="true" name="startDate" value={this.test.bind(this)}/>
  }
```

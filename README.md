# React Datetime Component
時間日期 React元件

## API
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| name         | string  | input name  |
| tiemSwitch   | boolean | select time switch |


## callback 
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
|value         |     Object    |         this.functionName.bind(this) |

```sh
  import Datetime from './calendar';
```

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

## Demo Image

### timeSwitch="false"
![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8A%E5%8D%881.45.04.png | width=280)

### timeSwitch="true"
![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8A%E5%8D%881.44.46.png | width=280)

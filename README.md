# React Datetime Component
時間日期 React元件

## API
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
| name         | string  | input name  |
| tiemSwitch   | boolean | select time switch |
| max          | String  | ex:"2018-12-30" |
| min          | String  | ex:"2018-01-01" |


## Callback 
| Name         | Type    | Description |
| ------------ | ------- | ----------- |
|value         |     Object    |         this.functionName.bind(this) |

## Include 
```sh
  import Datetime from './calendar';
```

## Start
```sh
  npm run online;
  http://localhost:8003 or http://0.0.0.0:8003
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

## timeSwitch API Demo Image

| timeSwitch="false"         | timeSwitch="true"          |
| -------------------------- | -------------------------- |
|![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8A%E5%8D%881.45.04.png)         |     ![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8A%E5%8D%881.44.46.png) |

| max="2018-06-24"         | min="2018-06-12"         |
| ------------------------ | ------------------------ |
| ![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8B%E5%8D%885.53.02.png) | ![alt text](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/datetime+git+img/%E8%9E%A2%E5%B9%95%E5%BF%AB%E7%85%A7+2018-06-23+%E4%B8%8B%E5%8D%885.56.31.png) |

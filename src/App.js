import React from "react";
import Printw from './new';

class App extends React.Component
{ 
  constructor(){
    super();
    this.state={
      value:0
    }

  }
  increment=()=>
  {
    this.setState({value: this.state.value + 1});
  }
  render(){    
    return(    
    <div>
      <h1>{this.state.value}</h1>
      <button onClick={this.increment}>increment</button>
      <Printw tyt="ygj"/>
  



    </div>
    

    )

  }
  

    
  
}
 export default App;
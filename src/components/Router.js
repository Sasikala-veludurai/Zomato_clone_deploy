import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import Home from './Home';
import Filter from './filter';
import Details from "./details";
import Header from "./header"


  const Router=()=>{

    return(
      <BrowserRouter>
        <Header/>
       <Route exact path="/" component={Home} />  
            <Route path="/filter" component={Filter}/>
          <Route path="/details" component={Details}/>
         
      </BrowserRouter>
    );
 }
 export default Router;
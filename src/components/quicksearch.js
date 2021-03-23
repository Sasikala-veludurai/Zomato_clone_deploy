import React from 'react';
import "../styles/Home.css";
import "./quicksearchitems";
import Quicksearchitems from './quicksearchitems';

class Quicksearch extends React.Component {
    render() {
        const { mealtypes } = this.props;
        return (
        <div>
                <div className="qs-heading">Quick Searches</div>
                <div className="discover-restaurants-by-type-of-meal">Discover Restaurant by type of meal</div>

                <div className="qs-div">
                    <div className="row" style={{ marginBottom: '12px' }}>
                        {
                            mealtypes.map((item) => {
                             return <Quicksearchitems item={item}/>
                                          })
                        } 
                    </div>               
                        
                </div>   
            
        </div>     
  
        )
    
    }
}
export default Quicksearch;
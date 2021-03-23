import React from "react";
import "../styles/Home.css";
import { withRouter } from 'react-router-dom';

class Quicksearchitems extends React.Component{
    handleclick=(mealtype_id)=>{
        const location_id=sessionStorage.getItem('location_id')
        if(location_id){
            this.props.history.push(`/filter/?mealtype_id=${mealtype_id} & location_id=${location_id}`);
        }
        else{
            this.props.history.push(`/filter/?mealtype_id=${mealtype_id}`);
        }
        
    } 
    render(){
        const {item}=this.props;
        return(
            
                <div className="col-lg-4 col-sm-12 col-md-6 " >
                    <div className="rowclass "  onClick={ ()=>{this.handleclick(item.meal_type)}}>
                         <div className="row" style={{ height: '160px', width: '360px' }}>
                                <div className="col-6">
                                        <div className="col6">
                                            <img src={item.images} style={{ width: '180px', height: '160px' }} />
                                         </div>

                                 </div>
                                 <div className="col-6">
                                    <div className="breakfast"> {item.name}</div>
                                        <div className="breakfast-content">{item.content}</div>
                                    </div>
                                </div>
                        </div>
                 </div>

            
        )
    }
}

export default withRouter(Quicksearchitems);







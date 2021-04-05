import React from 'react';
import "../styles/Home.css";


class 
Wallpaper extends React.Component {
    handlechange=(event)=>{
        const location_id=event.target.value;
        sessionStorage.setItem('location_id',location_id);
        
        
    }
    render() {
        const {locations}=this.props;
        return (
<div>    
    <div>
     
        <p className="e">e!</p>
        <p className="find"> Find the best restaurants, cafés, and bars</p>
        <div className="dropdown">
            <span className="glyphicon glyphicon-map-marker " className="symbol" ></span>
            <select className="dropdown-pls" onChange ={this.handlechange}>
                <option > Please type a location</option>
                {
                    locations.map((item)=> {
                        return  <option value={item.location_id} >{ `${item.name}, ${item.city_name}`}</option>
                    })
                }

            </select>
        </div>
        <div className="search-box">
            <span className="glyphicon glyphicon-search" style={{top:'20px',marginRight:'439px',opacity:'0.8'}}></span>
            <input className="placeholder" type="text" placeholder="search for Restaurant" />
        </div>
        <div class="wallpaper">
        <img src="./images/zomatoreal.jpg" style={{height:'500px',width:'100%'}} />
        </div>
        
        </div>
    </div>
        )}
}
export default Wallpaper;
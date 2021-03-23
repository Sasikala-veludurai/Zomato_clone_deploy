import React from 'react';
import querystring from "query-string";
import "../styles/filter.css"
import axios from 'axios';
import './details';
import './Home';
import Headers from './header';



class filter extends React.Component {
   constructor(){
        super();

        this.state={
             restaurants:[],
mealtype_id:undefined,
location_id:undefined,
cuisine:[],
lcost:undefined,
hcost:undefined,
sort:undefined,
page:undefined,
id:undefined,
locations:[],
pagecounts:[],
cuisineids:[]


        }
    }
    handclick=(restaurant_id)=>{
        this.props.history.push(`/details/?restaurant_id=${restaurant_id}`);
    }
    handlesort=(sort)=>{
        const {mealtype_id,location_id,lcost,hcost,page,cuisine}=this.state;
        axios(
            {
                method:"POST",
                url:'https://fierce-caverns-35381.herokuapp.com/filter',
                headers:{ 'content-Type':'application/json'},
                data:{
                    sort:sort,
                    mealtype_id:mealtype_id,
                    location_id:location_id,
                    cuisine:cuisine,
                    lcost:lcost,
                    hcost:hcost,
                    page:page
                }
             } )
             .then(res=>{
                this.setState({restaurants:res.data.restaurants,sort:sort,pagecounts:res.data.pagecount})
   
            })
            .catch()
   
    }
    handlecostchange=(lcost,hcost)=>{
        const {mealtype_id,location_id,sort,page,cuisine}=this.state;
        axios(
            {
                method:"POST",
                url:'https://fierce-caverns-35381.herokuapp.com/filter',
                headers:{ 'content-Type':'application/json'},
                data:{
                    sort:sort,
                    mealtype_id:mealtype_id,
                    location_id:location_id,
                    lcost:lcost,
                    hcost:hcost,
                    page:page,
                    cuisine:cuisine
                }
             } )
             .then(res=>{
                this.setState({restaurants:res.data.restaurants,lcost:lcost,hcost:hcost,pagecounts:res.data.pagecount})
   
            })
            .catch()
   
    }
  
    handlecuisinechange=(cuisineids)=>{
        
        const {mealtype_id,location_id,sort,page,lcost,hcost,cuisine}=this.state;
      if(cuisine.indexOf(cuisineids)== -1){
            cuisine.push(cuisineids);
      }
      else{
        var index=cuisine.indexOf(cuisineids);
        cuisine.slice(index,1);
    } 
            axios(
                {
                    method:"POST",
                    url:'https://fierce-caverns-35381.herokuapp.com/filter',
                    headers:{ 'content-Type':'application/json'},
                    data:{
                        sort:sort,
                        mealtype_id:mealtype_id,
                        location_id:location_id,
                        lcost:lcost,
                        hcost:hcost,
                        page:page,
                        cuisine:cuisine
                    }
                 } )
                 .then(res=>{
                    this.setState({restaurants:res.data.restaurants,cuisine:cuisine,pagecounts:res.data.pagecount})
       
                })
                .catch()
    
    
        
       
    }
    handlelocationchange=(event)=>{
       const location_id=event.target.value;
       const {mealtype_id,sort,page,lcost,hcost,cuisine}=this.state;
       axios(
        {
            method:"POST",
            url:'https://fierce-caverns-35381.herokuapp.com/filter',
            headers:{ 'content-Type':'application/json'},
            data:{
                sort:sort,
                mealtype_id:mealtype_id,
                location_id:location_id,
                lcost:lcost,
                hcost:hcost,
                page:page,
                cuisine:cuisine
            }
         } )
         .then(res=>{
            this.setState({restaurants:res.data.restaurants,location_id:location_id,pagecount:res.data.pagecount})

        })
        .catch()
    }
        handlepagechange=(page)=>{
            const {mealtype_id,location_id,sort,lcost,hcost,cuisine}=this.state;
            axios(
                {
                    method:"POST",
                    url:'https://fierce-caverns-35381.herokuapp.com/filter',
                    headers:{ 'content-Type':'application/json'},
                    data:{
                        sort:sort,
                        mealtype_id:mealtype_id,
                        location_id:location_id,
                        lcost:lcost,
                        hcost:hcost,
                        page:page,
                        cuisine:cuisine
                    }
                 } )
                 .then(res=>{
                    this.setState({restaurants:res.data.restaurants,pagecount:res.data.pagecount,page:page})
                 }).catch();
        }
       
       
        
       
    componentDidMount(){
        const qs=querystring.parse(this.props.location.search);  //parse converte string to objects
        const {mealtype_id,location_id}=qs;         /* or->const mealtype_id=qs.mealtype; const location=qs.location; */
 /* **/    axios(
        {
            method:"POST",
            url:'https://fierce-caverns-35381.herokuapp.com/filter',
            headers:{ 'content-Type':'application/json'},
            data:{
                mealtype_id:mealtype_id ? mealtype_id.trim() : undefined,
                location_id: location_id  ? location_id.trim() :undefined
            }
         } )
         .then(res=>{
             this.setState({restaurants:res.data.restaurants, pagecount:res.data.pagecount,mealtype_id:mealtype_id,location_id:location_id})

         })
         .catch()
         axios({
            url:'https://fierce-caverns-35381.herokuapp.com/locations',
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res =>{
            this.setState({locations:res.data.locations })
        })
        .catch(err=>{console.log(err)});



     
    }
    render() {

        const {restaurants,locations,pagecounts}=this.state;
        return ( <div> <Headers/>
       <div className="Breakfast-places">{`Breakfast Places in ${restaurants.city}`}</div>
                <div style={{ display: 'inline-block' }}>
                    <div className="vertical-box">
                        <div className="filter">Filters</div>
                        <div className="select-location">Select Location</div>
                        <div className="dropdowndiv" >
                            <select className="dropdown-p" onChange={this.handlelocationchange} >
                                <option>Select Location</option>
                                {locations.map((item)=>{
                                    return   <option value={item.location_id} >{`${item.name}, ${item.city_name}`}</option>
                                })}

                            </select>
                        </div>
                        <div className="cuisine">Cusinie</div>
                        <div className="checkbox-list">
                            <div className="checkbox"><input type="checkbox" onClick={()=>{this.handlecuisinechange(1)}}/>North India</div>
                            <div className="checkbox"> <input type="checkbox" onClick={()=>{this.handlecuisinechange(2)}}/> South India</div>
                            <div className="checkbox"><input type="checkbox" onClick={()=>{this.handlecuisinechange(3)}}/>Chinese</div>
                            <div className="checkbox"><input type="checkbox" onClick={()=>{this.handlecuisinechange(4)}} />Fast Foods</div>
                            <div className="checkbox"><input type="checkbox" onClick={()=>{this.handlecuisinechange(5)}}/>Street Foods</div>
                        </div>
                        <div className="cost-for-two"><p>cost for two</p></div>
                        <div className="radio-list">
                <div className="radio"><input type="radio" name="cost" onChange={()=>{this.handlecostchange(1,500)}}/>less than &#8377;  500</div>
                                <div className="radio"><input type="radio" name="cost"onChange={()=>{this.handlecostchange(500,1000)}}/>  &#8377;500 to &#8377;1000</div>
                                    <div className="radio"><input type="radio" name="cost"onChange={()=>{this.handlecostchange(1000,1500)}}/>  &#8377;l000 to  &#8377;1500</div>
                                        <div className="radio"><input type="radio" name="cost"onChange={()=>{this.handlecostchange(1500,2000)}}/> &#8377; 1500 to &#8377;2000</div>
                                            <div className="radio"><input type="radio" name="cost"onChange={()=>{this.handlecostchange(2000,50000)}}/>&#8377;2000+</div>
                                                <div className="radio"><input type="radio"name="cost"/>All</div>
                                                </div>

                                                <div className="cost-for-two">Sort</div>
                                                <div className="radio-list">
                                                    <div className="radio"><input type="radio" name="sort" onChange={()=>{this.handlesort(1)}}/>Price low to high</div>
                                                        <div className="radio"><input type="radio" name="sort"onChange={()=>{this.handlesort(-1)}}/>price high to low</div>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'inline-block', width: '720px', verticalAlign: 'top' }}  >
                                                        { restaurants.length!==0 ? restaurants.map((item)=>{
                                                            return   <div className="horizontal-box1" onClick={()=>{this.handclick(item._id)}}>
                                                            <div className="inside-rec1">
                                                                <div style={{ height: '150px', width: '120px', display: 'inline-block', verticalAlign: 'top',marginRight:'54px'}}>
                                                                    <img src={`../${item.image}`} style={{ width: '120px', height: '120px', borderRadius: '23px' }} />

                                                                </div>
                                                                <div style={{ display: 'inline-block', height: '150px', width: '318px' }}>
                                                                    <div className="The-big-chill-cakery">{item.name} </div>
                                                                    <div className="fort">{item.locality}</div>
                                                                    <div className="shop1">{item.city}</div>
                                                                </div>
                                                            </div>

                                                            <div style={{ border: 'solid 1px #dedfe5', height: '0px' }}></div>
                                                            <div className="inside-rect2">
                                                                <div className="CUISINE1">
                                                                    <div className="costfortwo">CUISINE:</div>
                                                                    <div className="costfortwo">COST FOR TWO:</div>
                                                                </div>
                                                                <div style={{ display: 'inline-block', verticalAlign: 'top', height: '89px', width: '100px' }}>
                                                                    <div className="bakery">   {item && item.cuisine ? item.cuisine.map(i=>{return `${i.name},`}):null} </div>
                                                                    <div className="bakery"> &#8377; {item.min_price}</div>
                                                                </div>

                                                            </div>
                                                        </div> 
                                                        }) :<div className="norecords">No Records found...</div>}

                                                       {restaurants.length!=0 ? <div className="pagination">
                                                            <a href='#'>&laquo;</a>
                                                           {pagecounts.map((item)=>{ return <a onClick={()=>{this.handlepagechange(item)}}>{item}</a>})}
                                                           <a href='#'>&raquo;</a>
                                                      </div>:null} 
                                                      
                                                        
                                                    </div>


                                                </div>




                                            </div>
        )
      }
}
export default filter;
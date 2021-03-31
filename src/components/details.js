import React from 'react';
import "../styles/details.css";
import querystring from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';



const customStyles = {
    content : {
      top                   : '30%',
      left                  : '50%',
      right                 : 'auto',
      backgroundcolor       :'brown',
      bottom                : 'auto',
      marginRight           : '-50%',
      marginTop             :  '19px',
      transform             : 'translate(-50%, -50%)'
      
    }
  };
  const carouselstyle={

  }

class Details extends React.Component{
    constructor(){
        super();
        this.state={
            restaurant:{},
            GallerymodalIsOpen: false,
            OrdermodalIsOpen: false,
            formModalIsOpen:false,
            restaurant_id: undefined,
            MenuItem:[],
            subTotal: undefined,
            userName: undefined,
            contactNumber: undefined,
            address: undefined,
            email: undefined
        }
    }
     componentDidMount(){
         const qs= querystring.parse(this.props.location.search);
         const restaurant_id=qs.restaurant_id;
         axios({
            url:`https://fierce-caverns-35381.herokuapp.com/restaurantbyid/${restaurant_id}`,
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res =>{
            this.setState({restaurant:res.data.Restaurants,restaurant_id:restaurant_id})
        })
        .catch(err=>{console.log(err)});
        
     }
     handleclick =(state)=>{ 
         const {restaurant_id}=this.state;                    //  or->handleclick =(state ,value)=>{    this.setState({[state]:value})//
        this.setState({[state]: true})
        if(state == "OrdermodalIsOpen"){
            axios({
                url:`https://fierce-caverns-35381.herokuapp.com/getmenuitembyrestaurantid/${restaurant_id}`,
                method:"GET",
                headers:{ "Content-Type":'application/json'}

            }).then(res=>{
                this.setState({MenuItem:res.data.items})
            }).catch(err=>{console.log(err)}
            )
        }
        else if (state == 'formModalIsOpen') {
            this.setState({ OrdermodalIsOpen: false });
        }
    }
    
     
     handleonclose=(state)=>{
        this.setState({[state]: false})    //[] for dynamic values
     }
     addItems = (index,operationType) => {
        let total = 0;
        console.log(index);
        const items = [...this.state.MenuItem];
        const item = items[index];
        
        if (operationType == 'add') {
            item.qty = item.qty + 1;
        }
        else {
            item.qty = item.qty - 1;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ MenuItem: items, subTotal: total });
    }
    
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    }
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }
    isObj = (val) => {
        return typeof val === 'object'
    }
    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    } 
     buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`https://fierce-caverns-35381.herokuapp.com/payment`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    makePayment = (e) => {
        const { subTotal, email } = this.state;
        this.getData({ amount: subTotal, email: email }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information);
        })
        e.preventDefault();
    }



    render(){
        const {restaurant,GallerymodalIsOpen,OrdermodalIsOpen,MenuItem,formModalIsOpen,address,contactNumber,email,userName,subTotal}= this.state;
        return <div>
           
             <div className="container-fluid">
                <button className='buttonb' onClick={()=>this.handleclick('GallerymodalIsOpen')} >Click to see image gallery</button>
                <img src={`../${restaurant.image}`} style={{height:'395px',width:'100%',marginBottom:'20px'}} ></img>
             </div>
               <div className="heading">{restaurant.name}</div>
               <button className="btn-order" onClick={()=>this.handleclick('OrdermodalIsOpen')}>Place Online order</button>
               <div className="tabs">
                   <div className='tab'>
                       <input type='radio' id='tab-1' name='tab-group-1' checked></input>
                       <label for='tab-1'>Overview</label>
                       <div className="content" >
                           <div className='about'>About this place</div>
                           <div className='head'>Cuisine</div>
                           <div className='value'>{restaurant && restaurant.cuisine ? restaurant.cuisine.map((item)=>`${item.name}, `): null}</div>
                           <div className='head'>Average</div>
                           <div className='value'>&#8377; {restaurant.min_price} for two people(approximately)</div>
                       </div>
                   </div>



                   <div className='tab'>
                       <input type='radio' id='tab-2' name='tab-group-1'></input>
                       <label for='tab-2'>Address</label>
                       <div className="content" >
                           <div className='head'>Phone Number</div>
                           <div className='value'>{restaurant.contact_number}</div>
                           <div className='head'>{restaurant.name}</div>
                           <div className='value'>{`${restaurant.locality}, ${restaurant.city}`}</div>
                        </div>
                   </div>
               </div>
        <Modal
          isOpen={GallerymodalIsOpen}     //when to open, its a state variable 
         style={customStyles}
          
        >  
        <div>
            <div className="glyphicon glyphicon-remove-sign" style={{float:'right'}} onClick={()=>this.handleonclose('GallerymodalIsOpen')}></div>
        <Carousel 
        showThumbs={false}
        showIndicators={false}
        style={carouselstyle}
        >
               {restaurant && restaurant.thumb  ? restaurant.thumb.map((item)=>{
                   return <div><img src={`../${item}`} /></div>
               
               }) : null} 
            </Carousel>

        </div>
 </Modal>
<Modal
          isOpen={OrdermodalIsOpen}     //when to open, its a state variable 
         style={customStyles}
          
        >  
        <div>
        <div className="glyphicon glyphicon-remove lose" style={{float:'right'}} onClick={()=>this.handleonclose('OrdermodalIsOpen')}></div>
        <h3 className="restaurant-name">{restaurant.name}</h3>

        {MenuItem.map((item,index)=>{
            return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
            <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                    <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                        <span className="card-body">
                            <img src={`../${item.foodtype}`} style={{height:'15px',width:'15px'}}></img>
                            <p className="menu-items">{item.name}</p>
                            <p className="price">&#8377;{item.price}</p>
                            <p className="description">{item.description}</p>
                        </span>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <img className="card-img-center title-img" src={`../${item.image}`} style={{ height: '75px', width: '75px', borderRadius: '20px' }} />
                        {item.qty == 0 ? <div><button className="add-button" onClick={() => this.addItems(index,'add')}>Add</button></div> :
                            <div className="add-number"><button onClick={() => this.addItems(index,'subtract')}>-</button><span style={{ backgroundColor: 'white' }}>{item.qty}</span><button onClick={() => this.addItems(index,'add')}>+</button></div>}
                    </div>
                </div>
            </div>  
           
        </div>
})}
<div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>
<p className="subtotalh3" >SubTotal : &#8377;{subTotal}</p>
        <button className="btn-paynow" onClick={() => {this.handleclick('formModalIsOpen', true)}}> Pay Now</button>
</div>
        </div>
 </Modal>
 <Modal
        isOpen={formModalIsOpen}
        style={customStyles}
                >
                    <div style={{height:'400px',width:"550px"}}>
                        <div className="glyphicon glyphicon-remove lose" style={{ float: 'right' }} onClick={() => this.handleonclose('formModalIsOpen')}></div>
                        <form onSubmit={this.makePayment}>
                           
                           <div className="name">Name:</div>
                           <div className="inputbox"><input type="text" value={userName} placeholder="enter your name"  onChange={(event) => this.handleInputChange(event, 'userName')} /></div>
                           <div className="name">Contact Number:</div>
                           <div className="inputbox1"><input type="text" value={contactNumber} onChange={(event) => this.handleInputChange(event, 'contactNumber')} /></div>
                           <div className="name">Address:</div>
                           <div className="inputbox2"><input type="text" value={address} onChange={(event) => this.handleInputChange(event, 'address')} /></div>
                           <div className="name">Email</div>
                           <div className="inputbox3"><input type="text" value={email} onChange={(event) => this.handleInputChange(event, 'email')} /></div>
                            <input type="submit" style={{float:'right',marginTop:'20px'}} className="btn btn-danger" value="Proceed" />
                        </form>
                    </div>
                </Modal>

    </div>
        
    }
}


export default Details;

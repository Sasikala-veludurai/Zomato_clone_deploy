import React from 'react';
import '../styles/header.css';
import {withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
   



class Header extends React.Component{
    constructor(){
        super();
        this.state={
            loginmodalisopen:false,
            isuserlogedin: false,
            username:undefined
        }
    }
    navigate=()=>{
        this.props.history.push("/");
    }
    handleclick=()=>{
        this.setState({loginmodalisopen: true})
    }
    responseGoogle=(response)=>{
       // if(response && response.profileObj.username ){
            this.setState({loginmodalisopen: false,isuserlogedin: true, username:response.profileObj.name})
 
        
       /* else{
        this.setState({loginmodalisopen: false})

        } */
         
    }
    responseFacebook=(response)=>{
        if(response && response.name){
            this.setState({loginmodalisopen: false,isuserlogedin: true, username:response.name})
        }
        else{
            this.setState({loginmodalisopen: false})
        }
        
       
    }
    handlelogout=()=>{
        this.setState({isuserlogedin:false, username:undefined})
    }
    handleonclose=()=>{
        this.setState({loginmodalisopen:false})
    }
    handlecreateaccnt=()=>{
        
    }

   render(){
       const { loginmodalisopen, isuserlogedin, username }=this.state;
       return(
        <div style={{position:"absolute"}}>
            <div style={{width: '1322px',height:'50px'}}>
            <p className="elogo" onClick={this.navigate}>e!</p>
        {isuserlogedin ? 
          <div className="headerbutton">
          <div className="reclogin">
            
          <div className="login" >{username}</div> 
          </div>

          <div className="recsignup">
           <div className="signup" onClick={this.handlelogout}>Logout</div>
          </div> 
           
      </div> :  
            <div className="headerbutton">
                <div className="reclogin">
                  
                <div className="login" onClick={this.handleclick}>Login</div> 
                </div>

                <div className="recsignup">
                 <div className="signup" onClick={this.handlecreateaccnt}>Create an account</div>
                </div> 
                 
            </div> 
                  }
            <div className="headerdiv"></div>
           </div>
       
           <Modal
          isOpen={loginmodalisopen}
          style={customStyles}
          
        >
      <div style={{justifyContent:'center'}}>
      <div className="glyphicon glyphicon-remove lose" style={{ float: 'right' }} onClick={this.handleonclose}></div>
      <div className="google_signup">Sign up</div>
      <div className="gmail_wrapper">
      <GoogleLogin
        clientId="575859113930-rqq17c8p19uk2746pgomio1oa6kvgmr2.apps.googleusercontent.com"
        buttonText="Continue with Gmail"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
  /> <br/> </div>
  <div className="facebook_wrapper">
   <FacebookLogin
    appId="552112539068717"
    textButton="Continue with Facebook"
    //size="metro"
    fields="name,email,picture"
    callback={this.responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />
</div>
      </div>
          
        </Modal>

        </div>

       )
   }

}
export default withRouter(Header);
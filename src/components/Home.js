import React from 'react';
import "../styles/Home.css";
import Quicksearch from './quicksearch';
import Wallpaper from './wallpaper';
import axios from 'axios';

class Home extends React.Component {

    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }
    }
    componentDidMount(){
            sessionStorage.clear();                // or -> sessionStorage.setItem('locationid',undefined);
        axios({
            url:'https://fierce-caverns-35381.herokuapp.com/locations',
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res =>{
            this.setState({locations:res.data.locations })
        })
        .catch(err=>{console.log(err)});

        axios({
            url:'https://fierce-caverns-35381.herokuapp.com/mealtypes',
            method:'GET',
            headers:{"Content-Type":"application/json"}
        })
        .then(res =>{
            this.setState({mealtypes:res.data.Mealtypes })
        })
        .catch(err=>{console.log(err)})

    }


    render() {
        const {locations,mealtypes}=this.state;
        return (
        <div>
            <Wallpaper locations={locations}/>
            <Quicksearch mealtypes={mealtypes}/>
        </div>
            
        )
    }
}
export default Home;
import React, {Component} from "react";
import "../style.css";
import axios from "axios";
import { base_url } from "../config/environment";
const given_key = "45bbf262882643719c5104029222104"

const dateBuilder = (d) =>{
    const days =["Sunday", "Monday", "Tuesday", "Wednesday", 
                "Thursday", "Friday", "Saturday"]

    const months = ["January", "Feburary", "March", "April", "May",
                    "June", "July", "August", "September", "October", 
                    "November", "December"]

    const day = days[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
}

class Ui extends Component{
    constructor(props){
        super(props)

        this.state = {
            city:'',
            country:'',
            temp: ''
        }
    }


    KeyTracker = (e) =>{
        if(e.key === 'Enter'){
            this.setState({
                city: e.target.value
            }, function(){
                axios({
                    method: 'get',
                    url: base_url+"/current.json",
                    params:{
                        key: given_key,
                        q: this.state.city
                    }
                }).then(res => {
                    console.log(res.data.current)
                    this.changeState(res.data.location, res.data.current)

                }).catch(err => console.log(err))
            })
         
        
        }
    }

    changeState = (location, weather) =>{
        this.setState({
            city: location.name,
            country: location.country,
            temp: weather.temp_c
        })
    }

     render(){
         const {city, country, temp} = this.state
        return(
            <div className="container">
                <div className= {temp > 24 ? "container_warm" : "container_cold"}></div>

                <div className = "searchbox">
                    <input type="text" placeholder="Search..." className="search-el" onKeyDown={this.KeyTracker}/>
                </div>


                <div className="info">
                    <div className="location">
                        {/* {city}, {country} */}
                        {country !== '' ? `${city}, ${country}` : ""}
                    </div>

                    <div className="date">{dateBuilder(new Date())}</div>
                </div>

                <div className="weather-info">
                    <div className="weather">
                        {/* {temp} °C  */}
                        {temp !== '' ? `${temp} °C` : ""}
                    </div>
                </div>
            </div>
        )
    }
}

export default Ui
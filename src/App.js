import React, { Component } from 'react';
import Title from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';
import './App.css';

const API_KEY = "90c56fe3d33de9ce8b30eb9f6bb0dd27";

class App extends Component {
    state={
      city:undefined,
      country:undefined,
      error:undefined,
      temperature:undefined,
      description:undefined,
      humidity:undefined
    }
   getWeather = async (e) => {
       e.preventDefault();
       const city = e.target.elements.city.value;
       const country = e.target.elements.country.value;
       if(city && country){
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    this.setState({
      city:data.name,
      country:data.sys.country,
      temperature:data.main.temp,
      description:data.weather[0].description,
      humidity:data.main.humidity,
      error:undefined,
    })
    }
    else {
      this.setState({
        city:undefined,
        country:undefined,
        temperature:undefined,
        description:undefined,
        humidity:undefined,
        error:"Please enter the respective Values"
      })
    }
   }

  render() {
    return (
      <div className="wrapper">
      <div className="container">
          <div className="title-container">
            <Title />
            </div>
            <div className="form-container">
            <Form getWeather={this.getWeather}/>
              <Weather 
              city={this.state.city}
              country={this.state.country}
              temperature={this.state.temperature}
              description={this.state.description}
              humidity={this.state.humidity }
              error={this.state.error}
              />
              </div>
      </div>
      </div>
    );
  }
}

export default App;
 

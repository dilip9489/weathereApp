import React, { useState } from "react";
 import './WeatherApp.css'

const API_KEY = "e3e67c9a523d452fa4b135852242311";
const API_URL = "https://api.weatherapi.com/v1/current.json";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const fetchWeatherData = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }
    setLoading(true);
     

    try {
        setLoading(true);
      const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}`);
      
      const data = await response.json();
      if (data.error) {
         
        alert("Failed to fetch weather data");  
        setWeatherData(null);  
        setCity('')
      } else {
        setWeatherData(data);  
      }
    } catch (err) {
        console.log("Error Fetching Weather Data:",err);
        
        setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <div className="weather-cards ">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
     
      {weatherData && (
        <div className="search-container">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

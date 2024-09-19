import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="details">
          <h2 className="city">
            {weather.name}, {weather.sys.country}
          </h2>
          <p >{Math.round(weather.main.temp)}°C</p>
          <p >{weather.weather[0].description}</p>
          <p >
            Humidity: {weather.main.humidity}%  <br /> Wind: {weather.wind.speed} m/s
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

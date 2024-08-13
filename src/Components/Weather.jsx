import "./Weather.css";
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";
import { useEffect, useRef, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const searchInput = useRef();
  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name !");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "05d": rain_icon,
        "05n": rain_icon,
        "06d": rain_icon,
        "06n": rain_icon,
        "07d": snow_icon,
        "07n": snow_icon,
      };

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreture: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  };

  console.log(weatherData);
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" ref={searchInput} placeholder="Search" />
        <img
          src={search_icon}
          onClick={() => search(searchInput.current.value)}
        />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} className="weather-icon" alt="" />

          <p className="tempreture">{weatherData.tempreture}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>

            <div className="col">
              <img src={wind_icon} alt="" />
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Please enter valid city name..</h1>
        </>
      )}
    </div>
  );
};

export default Weather;

import { useState } from "react";
import defaultimg from "./assets/weather.png";
import clearsky from "./assets/Clear sky.jpg";
import fewclouds from "./assets/weather-few-clouds.png";
import scatteredclouds from "./assets/scatered clouds.jpg";
import brokenclouds from "./assets/broken clouds.png";
import showerrain from "./assets/shower rain.png";
import thunderstorm from "./assets/thunderstorm icon.jpg";
import rain from "./assets/rain-vector-icon.jpg";
import snow from "./assets/snow.png";
import Weathericons from "./weathericons";
function Weather() {
  const weathericons = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": fewclouds,
    "02n": fewclouds,
    "03n": scatteredclouds,
    "03d": scatteredclouds,
    "04d": brokenclouds,
    "04n": brokenclouds,
    "09d": showerrain,
    "09n": showerrain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
  };
  const [citynotfound, setcitynotfound] = useState(false);
  const [loading, setloading] = useState(false);
  const [val, setval] = useState();
  const [temp, settemp] = useState(0);
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [long, setlong] = useState(0);
  const [latitude, setlatitude] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [windspeed, setwindspeed] = useState(0);
  const [weathericon, setweathericon] = useState(defaultimg);
  const change = (e) => {
    setval(e.target.value);
  };
  const search = async () => {
    setloading(true);
    const apikey = "b37894f600cad95e3260444a38d91d11";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${apikey}&units=Metric`;
    try {
      const data = await fetch(url);
      const result = await data.json();
      if (result.cod === "404") {
        setcitynotfound(true);
        setloading(false);
      }
      setval("");
      settemp(Math.round(result.main.temp));
      setcity(result.name);
      setcountry(result.sys.country);
      setlong(result.coord.lon);
      setlatitude(result.coord.lat);
      sethumidity(result.main.humidity);
      setwindspeed(result.wind.speed);
      setloading(false);
      setcitynotfound(!true);
      setweathericon(weathericons[result.weather[0].icon]);
    } catch (error) {
      console.log("error", error);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="bg-red-400 flex justify-center py-4 h-screen">
        <div className="text-center h-full py-4 lg:py-2 bg-red-300 rounded-xl scale-90 flex flex-col  justify-center items-center">
          <h1 className="text-xl font-bold">Weather App</h1>
          <div className="relative">
            <input
              type="text"
              value={val}
              onChange={change}
              className="outline-none transition-all duration-300 focus:border-slate-600 focus:scale-105 rounded-2xl p-1 px-2 my-2 border-2 border-black bg-transparent"
            ></input>
            <svg
              onClick={() => {
                search();
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer absolute top-3.5 right-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            {citynotfound && <p className="text-red-800">City not found</p>}
          </div>

          <Weathericons
            weathericon={weathericon}
            temp={temp}
            loading={loading}
            city={city}
            country={country}
            latitude={latitude}
            long={long}
            humidity={humidity}
            windspeed={windspeed}
          />
          <p className="my-2 font-medium text-center">Designed by Saran</p>
        </div>
      </div>
    </>
  );
}
export default Weather;

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getWeather } from "../utils/api";
import {
  CloudRain,
  Sun,
  Wind,
  ThermometerSimple,
  Drop,
  ArrowLeft,
} from "@phosphor-icons/react";
import { getIcon } from "./../utils/getIcon";
import { hoursFormatter } from "../utils/hoursFormatter";
import DayOfForecast from "./../components/DayOfForecast";

export default function Weather() {
  const city = useLocation().state;
  const [weatherDays, setWeatherDays] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleWeather();
  }, [city]);

  const handleWeather = async () => {
    // api'den veri çeken fonksiyon
    const data = await getWeather(city.latitude, city.longitude);
    setCurrentWeather(data?.city);
    getDaysofWether(data?.list);
    setLoading(true);
  };

  const getDaysofWether = (weatherList) => {
    // api'den gelen veriyi günlük hava durumu verisine çeviren fonksiyon
    let lastDay = null;
    const daysWeather = [];

    weatherList?.forEach((item) => {
      const date = new Date(item.dt_txt).getDate();
      if (date !== lastDay) {
        // bir önceki günden farklı bir gün ise ekle
        daysWeather.push(item);
        lastDay = date;
      }
    });
    setWeatherDays(daysWeather);
  };

  if (loading)
    return (
      <div className="space-y-2">
        <div className="rounded-lg sm:w-80 max-[400px]:w-[90vw] h-72 bg-gray-700 p-2 relative">
          <img
            src={`${hoursFormatter(new Date())}`}
            alt="background-image"
            className="overflow-hidden rounded-lg h-full w-full"
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-[18px] font-bold text-white">
                {currentWeather.name} , {currentWeather.country}
              </h3>
              <p className="text-[13px] text-white">
                {new Date().toLocaleString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
                , {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="">
                <h1 className="heading-xl font-bold text-white">
                  {Math.round(weatherDays[0].main.temp)}°c
                </h1>
                <div className="">
                  <p className="text-md text-white">
                    {Math.round(weatherDays[0].main.temp_max)}°c /{" "}
                    {Math.round(weatherDays[0].main.temp_min)}°c
                  </p>
                  <p className="text-sm text-white">
                    {weatherDays[0].weather[0].description}
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={`${getIcon(weatherDays[0].weather[0].icon)}.png`}
                  alt=""
                  className="w-40"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 w-80 max-[400px]:w-[90vw] h-72 px-5  rounded-lg">
          <div className="flex justify-between items-center py-4 border-b border-gray-600">
            <h1 className="text-gray-200 flex gap-2 items-center text-sm">
              <ThermometerSimple size={25} color="#3B3B54" />
              Thermal sensation
            </h1>
            <p className="text-white text-sm">
              {Math.round(weatherDays[0].main.feels_like)}°c
            </p>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-600">
            <h1 className="text-gray-200 flex gap-2 items-center text-sm">
              <CloudRain size={25} color="#3B3B54" />
              Probability of rain
            </h1>
            <p className="text-white text-sm">
              {weatherDays[0].rain
                ? Math.round(weatherDays[0].rain["3h"] * 100)
                : 0}
              %
            </p>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-600">
            <h1 className="text-gray-200 flex gap-2 items-center text-sm">
              <Wind size={25} color="#3B3B54" />
              Wind speed
            </h1>
            <p className="text-white text-sm">
              {Math.round(weatherDays[0].wind.speed)} km/h
            </p>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-gray-600">
            <h1 className="text-gray-200 flex gap-2 items-center text-sm">
              <Drop size={25} color="#3B3B54" />
              Air humidity
            </h1>
            <p className="text-white text-sm">
              {Math.round(weatherDays[0].main.humidity)}
            </p>
          </div>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-gray-200 flex gap-2 items-center text-sm">
              <Sun size={25} color="#3B3B54" />
              UV Index
            </h1>
            <p className="text-white text-sm">22</p>
          </div>
        </div>
        <DayOfForecast weatherDays={weatherDays} />
        <Link
          to="/"
          className="absolute top-5 left-5 border border-gray-300 rounded-xl p-1
        cursor-pointer"
        >
          <ArrowLeft size={32} color="white" />
        </Link>
      </div>
    );
}

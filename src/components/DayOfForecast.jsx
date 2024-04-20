import React from "react";
import { getIcon } from "../utils/getIcon";

export default function DayOfForecast({ weatherDays }) {
  return (
    <div className="bg-gray-700 w-80 max-[400px]:w-[90vw] p-3 rounded-lg flex justify-center">
      {weatherDays?.splice(1, 6).map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <h1 className="text-md text-white">
            {new Date(day.dt_txt).toLocaleString("en-US", {
              weekday: "short",
            })}
          </h1>
          <img
            src={`${getIcon(day.weather[0].icon)}.png`}
            alt="sun"
            className="w-14"
          />
          <p className="text-sm text-white">
            {Math.round(day.main.temp_max)}°c
          </p>
          <p className="text-sm text-gray-300">
            {Math.round(day.main.feels_like)}°c
          </p>
        </div>
      ))}
    </div>
  );
}

import axios from "axios";
import { API_KEY, RapidAPI_Key } from "../../env";
import toast from "react-hot-toast";

const getWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat: lat,
          lon: lon,
          appid: API_KEY,
          units: "metric",
        },
      }
    );
    return response.data;
  } catch (err) {
    toast.error("Weather data could not be fetched")
    console.error(err);
  }
};

const getCity = async (city) => {
  try {
    const response = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
      {
        params: {
          minPopulation: 1000000,
          namePrefix: city,
        },
        headers: {
          "X-RapidAPI-Key": RapidAPI_Key,
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
        
      }
    );
    return response.data.data;
  } catch (error) {
    toast.error("limit exceeded, please try again later")
    console.error(error);
  }
};

const getUserLocation = async () => {
  try {
    const responseIp = await axios.get("https://api.ipify.org/?format=json");
    const response = await axios.post(
      "https://ip-location5.p.rapidapi.com/get_geo_info",
      new URLSearchParams({
        ip: responseIp.data.ip,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": RapidAPI_Key,
          "X-RapidAPI-Host": "ip-location5.p.rapidapi.com",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Location data could not be fetched")
    console.error("IP alınamadı:", error);
  }
};

export { getWeather, getCity, getUserLocation };

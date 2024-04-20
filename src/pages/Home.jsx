import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { getCity, getUserLocation } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { MapPin } from "@phosphor-icons/react";

export default function Home() {
  const [text, setText] = useState(false);
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (text.length >= 3) {
      handleSearch();
    }
  }, [text]);

  const handleSearch = async () => {
    const data = await getCity(text);
    setCities(data);
  };

  useEffect(() => {
    // animasyonu göstermek için kullanıldı
    if (selectedCity) {
      setTimeout(() => {
        navigate(`/weather`, { state: selectedCity });
      }, 1000);
    }

    getUserLocation();
  }, [selectedCity]);

  const getLocation = async () => {
    const data = await getUserLocation();
    navigate(`/weather`, { state: data });
  };

  return (
    <div className="flex flex-col items-center home">
      <div className="absolute top-10">
        <img src="logo.svg" alt="" className="w-60" />
      </div>
      <h1 className="heading-lg py-1  text-white">
        Welcome to <span className="text-blue-light">TypeWeather</span>
      </h1>
      <p className="text-md text-gray-200">
        Choose a location to see the weather forecast
      </p>
      <div className={`${selectedCity ? "hidden" : null}`}>
        <div className="flex items-center gap-1">
          <input
            type="text"
            className="outline-none p-4 sm:w-72 w-60 rounded-lg bg-gray-600 text-white mt-3"
            placeholder="Search location"
            onChange={(e) => {
              setTimeout(() => {
                // api istek optimizasyonu için yapıldı
                setText(e.target.value);
              }, 700);
            }}
          />
          <div
            className="bg-gray-600 p-3 mt-3 rounded-lg
        cursor-pointer"
            onClick={getLocation}
          >
            <MapPin size={32} color="white" />
          </div>
        </div>

        <div
          className={`rounded-lg bg-black mt-2 overflow-hidden space-y-[2px]
      ${text ? "" : "hidden"}`}
        >
          {text.length >= 3 ? (
            cities?.length != 0 ? (
              cities?.map((item, index) => (
                <div
                  className="w-full text-white p-4 bg-gray-500 cursor-pointer"
                  onClick={() => setSelectedCity(item)}
                  key={index}
                >
                  {item.name} - {item.country}
                </div>
              ))
            ) : (
              <p
                className="text-white flex items-center justify-center 
            p-4 bg-gray-500"
              >
                City not found
              </p>
            )
          ) : (
            <p
              className="text-white flex items-center justify-center 
            p-4 bg-gray-500"
            >
              Loading
              <Loader />
            </p>
          )}
        </div>
      </div>
      {selectedCity && (
        <div
          className="w-72 text-white p-4 mt-5 rounded-lg bg-gray-500 opacity-60 
        flex items-center justify-between pr-10"
        >
          {selectedCity.name} - {selectedCity.country}
          <Loader />
        </div>
      )}
    </div>
  );
}

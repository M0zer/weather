import React, { useState, useEffect } from "react";
import styles from "./Weather.module.css";
import WeatherChart from "./WeatherChart";

const WeatherComponent = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);

  useEffect(() => {
    if (!location.latitude || !location.longitude) return;

    const fetchCurrentWeather = async () => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`;
      const response = await fetch(url);
      const data = await response.json();
      setCurrentWeather(data.current_weather);
    };

    const fetchDailyForecast = async () => {
      const today = new Date();
      const startDate = today.toISOString().split("T")[0];
      const endDate = new Date(today.setDate(today.getDate() + 7))
        .toISOString()
        .split("T")[0];

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_mean&timezone=Europe/Budapest&start_date=${startDate}&end_date=${endDate}`;
      const response = await fetch(url);
      const data = await response.json();
      setDailyForecast(data);
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchCurrentWeather(), fetchDailyForecast()]);
      setLoading(false);
    };

    fetchData();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentWeather || !dailyForecast) {
    return <div>Error fetching data</div>;
  }
  function capitalizeFirstLetter(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return capitalizeFirstLetter(
      new Intl.DateTimeFormat("hu-HU", { weekday: "long" }).format(date)
    );
  };

  const weatherCodeToIcon = (weathercode) => {
    switch (weathercode) {
      case 0:
        return "☀️"; // Tiszta ég
      case 1:
      case 2:
      case 3:
        return "⛅"; // Részben felhős
      case 45:
      case 48:
        return "🌫️"; // Köd
      case 51:
      case 53:
      case 55:
        return "🌦️"; // Szitálás
      case 61:
      case 63:
      case 65:
        return "🌧️"; // Eső
      case 71:
      case 73:
      case 75:
        return "❄️"; // Hó
      case 80:
      case 81:
      case 82:
        return "🌦️"; // Záporok
      case 95:
      case 96:
      case 99:
        return "⛈️"; // Vihar
      default:
        return "❓"; // Ismeretlen kód
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftside}>
        <h2>{currentWeather.temperature}°C</h2>
        <p>Időjárás: {weatherCodeToIcon(currentWeather.weathercode)}</p>
      </div>
      <div className={styles.rightside}>
        <p>Hét napos előrejelzés</p>
        <table>
          {dailyForecast.daily.time.map((date, index) => (
            <tr key={date} className={styles.day}>
              <td>
                {" "}
                <h2>{formatDay(date)}</h2>
              </td>
              <td>
                {weatherCodeToIcon(dailyForecast.daily.weathercode[index])}{" "}
                {dailyForecast.daily.precipitation_probability_mean[index]}%
              </td>
              <td>
                {dailyForecast.daily.temperature_2m_min[index]}°C /{" "}
                {dailyForecast.daily.temperature_2m_max[index]}°C
              </td>
            </tr>
          ))}
        </table>
        <WeatherChart dailyForecast={dailyForecast}></WeatherChart>
      </div>
    </div>
  );
};

export default WeatherComponent;

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

const WeatherChart = ({ dailyForecast }) => {
  const days = dailyForecast;
  const chartData = {
    labels: days.daily.time,
    datasets: [
      {
        label: "Max Hőmérséklet (°C)",
        data: days.daily.temperature_2m_max,
        borderColor: "rgba(255, 255, 255, 1)",
        fill: false,
        tension: 0.5,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: false,
          text: "Dátum",
        },
      },
      y: {
        title: {
          display: false,
          text: "Hőmérséklet (°C)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>7 Napos Maximum Hőmérséklet Grafikon</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};
export default WeatherChart;

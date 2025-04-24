import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import s from "./CurrencyChart.module.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const CurrencyChart = () => {
  const rates = useSelector((state) => state.currency.rates);

  // Якщо ще немає курсів — не рендеримо графік
  if (rates.length === 0) return null;

  // Вигадані курси
  const fakeRates = [
    { currency: "", purchase: 38.49, sale: 38.99 },
    { currency: "", purchase: 40.09, sale: 40.59 },
    { currency: "", purchase: 42.89, sale: 43.59 },
    { currency: "", purchase: 44.09, sale: 44.49 },
  ];

  // Вставити реальні USD та EUR разом із фейками
  const finalRates = [
    fakeRates[0],
    rates.find((r) => r.currency === "USD"),
    fakeRates[1],
    fakeRates[2],
    rates.find((r) => r.currency === "EUR"),
    fakeRates[3],
  ].filter(Boolean); // Якщо якась валюта не прийшла — пропустити

  const labels = finalRates.map((r) => r.currency);
  const purchase = finalRates.map((r) => r.purchase);
  const sale = finalRates.map((r) => r.sale);

  const labelPlugin = {
    id: "customLabels",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;

      chart.data.datasets.forEach((dataset, datasetIndex) => {
        if (dataset.label === "Sale") {
          chart.getDatasetMeta(datasetIndex).data.forEach((point, index) => {
            const currency = finalRates[index]?.currency;
            if (currency === "USD" || currency === "EUR") {
              ctx.save();
              ctx.fillStyle = "#ff868d";
              ctx.font = "bold 12px sans-serif";
              ctx.textAlign = "center";
              ctx.fillText(currency, point.x - 1, point.y - 5); // над точкою
              ctx.restore();
            }
          });
        }
      });
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // приховати легенду згори
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false, //прибирає лінію осі
        ticks: {
          display: false, // прибрати підписи X
        },
        grid: {
          drawOnChartArea: false, // прибрати сітку
          drawTicks: false,
          drawBorder: false, // прибрати лінію осі
        },
      },
      y: {
        beginAtZero: false,
        display: false,
        ticks: {
          display: false, // прибрати підписи Y
        },
        grid: {
          drawOnChartArea: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    layout: {
      padding: {
        top: 12,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Purchase",
        data: purchase,
        fill: true,
        backgroundColor: "rgba(100, 149, 237, 0.3)",
        tension: 0.4,
        pointRadius: 0, // прибираємо всі точки
      },
      {
        label: "Sale",
        data: sale,
        fill: false,
        borderColor: "#ff868d",
        tension: 0.4,
        pointBackgroundColor: "#ff868d",
        pointRadius: sale.map((_, i) =>
          finalRates[i]?.currency === "USD" || finalRates[i]?.currency === "EUR"
            ? 5
            : 0
        ), // точки лише на USD і EUR
      },
    ],
  };

  return (
    <div className={s.chart}>
      <Line data={data} options={options} plugins={[labelPlugin]} />
    </div>
  );
};

export default CurrencyChart;

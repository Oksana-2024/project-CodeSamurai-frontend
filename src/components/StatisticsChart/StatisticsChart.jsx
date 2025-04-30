import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import s from "./StatisticsChart.module.css";
import { colors } from "../../helpers/statistics";
import {
  selectStatisticsCategories,
  selectStatisticsTransactions,
} from "../../redux/statistics/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = () => {
  const transactions = useSelector(selectStatisticsTransactions);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  const categories = useSelector(selectStatisticsCategories);
  if (!categories.length) {
    return;
  }
  const data = {
    labels: categories?.map((v) => v.name) || [],
    datasets: [
      {
        label: "Amount",
        data: categories.map((v) => v.total) || [],
        backgroundColor: colors.slice(0, categories.length) || [],
        borderColor: colors.slice(0, categories.length) || [],
        borderWidth: 44,
        weight: 0,
      },
    ],
  };
  return (
    <div className={s.chartContainer}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          marginTop: "-54%",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        <p className={s.balance}>₴ {transactions.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default StatisticsChart;

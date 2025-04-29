import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./StatisticsChart.module.css";
import { useSelector } from "react-redux";
import { selectStatisticsTransactions } from "../../redux/statistics/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsChart = ({ data }) => {
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
  return (
    <div className={s.chartContainer}>
      <Doughnut data={data} options={options} />
      <div style={{ marginTop: "-150px", marginLeft: "100px" }}>
        <p>
          <span>₴</span> {transactions.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default StatisticsChart;

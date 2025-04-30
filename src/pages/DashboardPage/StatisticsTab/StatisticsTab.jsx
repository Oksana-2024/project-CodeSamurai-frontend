import StatisticsChart from "../../../components/StatisticsChart/StatisticsChart";
import StatisticsDashboard from "../../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../../components/StatisticsTable/StatisticsTable";
import s from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  return (
    <div className={s.statisticsBox}>
      <div className={s.chart}>
        <h2 className={s.title}>Statistics</h2>
        <StatisticsChart />
      </div>
      <div className={s.tabContainer}>
        <div className={s.dashboard}>
          <StatisticsDashboard />
        </div>
        <div className={s.table}>
          <StatisticsTable />
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;

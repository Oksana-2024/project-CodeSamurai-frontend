import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStatistics } from "../../redux/statistics/operations";
import css from "./StatisticsDashboard.module.css";
import { colors, months, years } from "../../helpers/statistics";
import StatisticsChart from "../StatisticsChart/StatisticsChart";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.statistics.categories);
  const { month: savedMonth, year: savedYear } = useSelector(
    (state) => state.statistics
  );
  const [month, setMonth] = useState(savedMonth || new Date().getMonth() + 1);
  const [year, setYear] = useState(savedYear || new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);
  const data = {
    labels: categories?.map((v) => v.name) || [],
    datasets: [
      {
        label: "Amount",
        data: categories.map((v) => v.total) || [],
        backgroundColor: colors.slice(0, categories.length) || [],
        borderColor: colors.slice(0, categories.length) || [],
        borderWidth: 44,
        weight: 0
      },
    ],
  };

  return (
    <div className={css.dashboard}>
      <StatisticsChart data={data} />
      <label className={css.label}>
        Month
        <select
          className={css.select}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className={css.label}>
        Year
        <select
          className={css.select}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default StatisticsDashboard;

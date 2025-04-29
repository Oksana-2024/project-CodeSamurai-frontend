import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStatistics } from "../../redux/statistics/operations";
import { months, years } from "./options";
import css from "./StatisticsDashboard.module.css";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const { month: savedMonth, year: savedYear } = useSelector(
    (state) => state.statistics
  );
  const [month, setMonth] = useState(savedMonth || new Date().getMonth() + 1);
  const [year, setYear] = useState(savedYear || new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  return (
    <div className={css.dashboard}>
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

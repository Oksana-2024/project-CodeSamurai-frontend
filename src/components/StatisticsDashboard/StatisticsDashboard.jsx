import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchStatistics } from "../../redux/statistics/operations";
import s from "./StatisticsDashboard.module.css";
import { months, years } from "../../helpers/statistics";
import { selectMonth, selectYear } from "../../redux/statistics/selectors";
import { IoIosArrowDown } from "react-icons/io";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const savedMonth = useSelector(selectMonth);
  const savedYear = useSelector(selectYear);
  const [month, setMonth] = useState(savedMonth || new Date().getMonth() + 1);
  const [year, setYear] = useState(savedYear || new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  return (
    <div className={s.dashboard}>
      <label className={s.label}>
        <select
          className={s.selectStatistic}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          <option value="" disabled hidden>
            Month
          </option>
          {months.map(({ value, label }) => (
            <option  key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <IoIosArrowDown size={24} className={s.selectIcon} />
      </label>

      <label className={s.label}>
        <select
          className={s.selectStatistic}
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <option  value="" disabled hidden>
            Year
          </option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <IoIosArrowDown size={24} className={s.selectIcon} />
      </label>
    </div>
  );
};

export default StatisticsDashboard;

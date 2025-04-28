import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";

const StatisticsTable = () => {
  const { statistics } = useSelector((state) => state.statistics);

  if (!statistics?.categories?.length) {
    return (
      <p className={styles.message}>No statistics available for this period.</p>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <ul className={styles.table}>
        {statistics.categories.map((category) => (
          <li key={category.name} className={styles.row}>
            <span
              className={styles.color}
              style={{ backgroundColor: category.color }}
            ></span>
            <span className={styles.name}>{category.name}</span>
            <span className={styles.amount}>
              {category.total.toFixed(2)} UAH
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <p>
          Expenses:{" "}
          <span className={styles.expenses}>
            {statistics.expenseSummary.toFixed(2)} UAH
          </span>
        </p>
        <p>
          Income:{" "}
          <span className={styles.income}>
            {statistics.incomeSummary.toFixed(2)} UAH
          </span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;

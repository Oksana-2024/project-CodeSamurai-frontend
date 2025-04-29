import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";

const StatisticsTable = () => {
  const categories = useSelector((state) => state.statistics.categories);
  const income = useSelector((state) => state.statistics.income);
  const expense = useSelector((state) => state.statistics.expense);

  if (!categories?.length) {
    return (
      <p className={styles.message}>No statistics available for this period.</p>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <ul className={styles.table}>
        {categories.map((category) => (
          <li key={category.name} className={styles.row}>
            <span
              className={styles.color}
              style={{ backgroundColor: category.color }}
            ></span>
            <span className={styles.name}>{category.name}</span>
            <span className={styles.amount}>{category.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className={styles.total}>
        <p>
          Expenses:{" "}
          <span className={styles.expenses}>{expense?.toFixed(2)}</span>
        </p>
        <p>
          Income: <span className={styles.income}>{income?.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsTable;

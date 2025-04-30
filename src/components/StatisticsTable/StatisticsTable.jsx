import { useSelector } from "react-redux";
import styles from "./StatisticsTable.module.css";
import {
  selectStatisticsCategories,
  selectExpense,
  selectIncome,
} from "../../redux/statistics/selectors";

const StatisticsTable = () => {
  const categories = useSelector(selectStatisticsCategories);
  const income = useSelector(selectIncome);
  const expense = useSelector(selectExpense);

  if (!categories?.length) {
    return (
      <p className={styles.message}>No statistics available for this period.</p>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <ul className={styles.titleTab}>
        <li>
          <p>Category</p>
        </li>
        <li>
          <p>Sum</p>
        </li>
      </ul>
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
        <div className={styles.totalRow}>
          <p>Expenses:</p>
          <p className={styles.expenses}>{expense?.toFixed(2)}</p>
        </div>
        <div className={styles.totalRow}>
          <p>Income:</p>
          <p className={styles.income}>{income?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;

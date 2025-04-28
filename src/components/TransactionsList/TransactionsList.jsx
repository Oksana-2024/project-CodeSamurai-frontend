import { useSelector } from "react-redux";
import { selectTransactions } from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import TransactionsItem from "../TransactionsItem/TransactionsItem";
import useMedia from "../../helpers/useMedia";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getCategories,
  getTransactions,
} from "../../redux/transactions/operations";
import ButtonAddTransactions from "../ButtonAddTransactions/ButtonAddTransactions";

const columns = ["Date", "Type", "Category", "Comment", "Sum", ""];

function TransactionsList() {
  const reduxTransactions = useSelector(selectTransactions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  const { isMobile } = useMedia();

  if (isMobile) {
    return (
      <div className={s.container}>
        <div className={s.list}>
          {reduxTransactions.map((item) => (
            <TransactionsItem key={item._id} transaction={item} />
          ))}
        </div>
        <ButtonAddTransactions />
      </div>
    );
  }

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead className={s.head_row}>
          <tr className={s.row_item}>
            {columns.map((column, idx) => (
              <th key={idx}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reduxTransactions.map((item) => (
            <TransactionsItem key={item._id} transaction={item} />
          ))}
        </tbody>
      </table>
      <ButtonAddTransactions />
    </div>
  );
}

export default TransactionsList;

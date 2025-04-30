import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {selectTransactions} from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import useMedia from "../../helpers/useMedia";
import {getTransactions, getCategories} from "../../redux/transactions/operations";

import TransactionsItem from "../TransactionsItem/TransactionsItem";

const columns = ["Date", "Type", "Category", "Comment", "Sum", "", ""];

function EmptyStateMessage() {
  return (
    <>
      <p className={s.emptyText}>No transaction yet.</p>
      <p className={s.emptyText}>Let&apos;s add your first transaction!</p>
    </>
  );
}

function TransactionsList() {
  const reduxTransactions = useSelector(selectTransactions);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  const {isMobile} = useMedia();

  if (isMobile) {
    return (
      <div className={s.mobileContainer}>
        <div className={`${s.mobileScrollList} ${s.scroll}`}>
          {reduxTransactions.length ? (
            reduxTransactions.map((item) => (
              <TransactionsItem
                key={item._id}
                transaction={item}
              />
            ))
          ) : (
            <EmptyStateMessage />
          )}
        </div>
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
      </table>
      <div className={`${s.scrollBody} ${s.scroll}`}>
        <table className={s.table}>
          <tbody>
            {reduxTransactions.length ? (
              reduxTransactions.map((item) => (
                <TransactionsItem
                  key={item._id}
                  transaction={item}
                />
              ))
            ) : (
              <EmptyStateMessage />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsList;

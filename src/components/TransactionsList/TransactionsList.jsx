import {useDispatch, useSelector} from "react-redux";
import {selectTransError, selectTransLoading, selectTransactions} from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import Loader from "../Loader/Loader";
import FormButton from "../Button/Button";
import TransactionItem from "../TransactionsItem/TransactionsItem";
import useMedia from "../../helpers/useMedia";

const columns = ["Date", "Type", "Category", "Comment", "Sum", ""];

function TransactionList() {
  const reduxTransactions = useSelector(selectTransactions);

  const {isMobile} = useMedia();

  const isLoading = useSelector(selectTransLoading);
  const isError = useSelector(selectTransError);
  const dispatch = useDispatch();

  if (isError) {
    return <p className={s.text}>Oops, something went wrong...</p>;
  }

  if (reduxTransactions.length === 0 && !isLoading) {
    return <div className={s.container}></div>;
  }

  if (isMobile) {
    return (
      <div className={s.container}>
        {isLoading && <Loader />}
        {reduxTransactions.map(({_id, ...item}) => (
          <TransactionItem
            key={_id}
            id={_id}
            transaction={item}
          />
        ))}
      </div>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
    <table className={s.table}>
      <thead className={s.head_row}>
        <tr className={s.row_item}>
          {columns.map((column, idx) => (
            <th key={idx}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reduxTransactions.map(({id, ...item}) => (
          <TransactionItem
            key={id}
            id={id}
            transaction={item}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionList;

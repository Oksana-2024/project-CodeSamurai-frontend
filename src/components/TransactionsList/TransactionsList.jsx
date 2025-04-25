import {useDispatch, useSelector} from "react-redux";
import {selectTransError, selectTransLoading, selectTransactions} from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import Loader from "../Loader/Loader";
import TransactionItem from "../TransactionsItem/TransactionsItem";
import useMedia from "../../helpers/useMedia";
import Button from "../Button/Button";
import {FaPlus} from "react-icons/fa";

const columns = ["Date", "Type", "Category", "Comment", "Sum", ""];

function TransactionList() {
  const reduxTransactions = useSelector(selectTransactions);

  const {isMobile} = useMedia();

  const isLoading = useSelector(selectTransLoading);
  const isError = useSelector(selectTransError);
  const dispatch = useDispatch();

  const handleAddTransaction = () => {
    console.log("Open Add Transaction Modal");
    // dispatch() add here....
  };

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
        <div className={s.list}>
          {reduxTransactions.map((item) => (
            <TransactionItem
              key={item._id}
              transaction={item}
            />
          ))}
        </div>
        <Button
          className={s.addButton}
          text={"+"}
          onClick={handleAddTransaction}
        />
      </div>
    );
  }

  return isLoading ? (
    <Loader />
  ) : (
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
            <TransactionItem
              key={item._id}
              transaction={item}
            />
          ))}
        </tbody>
      </table>
      <Button
        className={s.addButton}
        icon={<FaPlus size={20} />}
        onClick={handleAddTransaction}
      />
    </div>
  );
}

export default TransactionList;

import {useDispatch, useSelector} from "react-redux";
import {selectTransError, selectTransLoading, selectTransactions} from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import Loader from "../Loader/Loader";
import FormButton from "../Button/Button";
import TransactionItem from "../TransactionsItem/TransactionsItem";

const columns = ["Date", "Type", "Category", "Comment", "Sum", ""];

function TransactionList() {
  const reduxTransactions = useSelector(selectTransactions);
  console.log("reduxTransactions", reduxTransactions);

  const isLoading = useSelector(selectTransLoading);
  const isError = useSelector(selectTransError);
  const dispatch = useDispatch();

  return (
    <>
      {isLoading && <Loader />}
      {isError && <p className={s.text}>Oops, something went wrong...</p>}
      {!isLoading && reduxTransactions.length === 0 ? (
        <div className={s.container}>
          <p>No transactions available yet.</p>
          <p>Let&#39;s add your first transaction:</p>
          <FormButton
            type="button"
            text={"Add transaction"}
            variant={"multiColorButton"}
            handlerFunction={() => console.log("open modal")}
          />
        </div>
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
      )}
    </>
  );
}

export default TransactionList;

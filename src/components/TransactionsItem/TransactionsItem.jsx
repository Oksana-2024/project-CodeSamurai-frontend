import clsx from "clsx";
import {useDispatch} from "react-redux";
import {deleteTransactions} from "../../redux/transactions/operations";
import s from "./TransactionsItem.module.css";
import Button from "../Button/Button";
import {MdOutlineModeEdit} from "react-icons/md";
import useMedia from "../../helpers/useMedia";

const getStyleByType = (type) => (type === "INCOME" ? "var(--income-color)" : "var(--expense-color)");

function TransactionItem({transaction, id}) {
  const dispatch = useDispatch();
  const {isMobile} = useMedia();

  const {transactionDate, type, comment, amount} = transaction;
  const date = new Date(transactionDate);
  const formatedDate = `${String(date.getDate()).padStart(2, "0")}
  .${String(date.getMonth() + 1).padStart(2, "0")}
  .${date.getFullYear().toString().slice(-2)}`;
  const formatedType = type == "INCOME" ? "+" : "-";
  const color = getStyleByType(type);

  function onEdit() {
    console.log("open edit modal");
  }

  async function OnDelete() {
    await dispatch(deleteTransactions(id));
  }

  if (isMobile) {
    return (
      <div
        className={s.list}
        style={{borderColor: color}}>
        <div className={s.list_item}>
          <span>Date</span>
          <span>{formatedDate}</span>
        </div>
        <div className={s.list_item}>
          <span>Type</span>
          <span>{formatedType}</span>
        </div>
        <div className={s.list_item}>
          <span>Category</span>
          <span>todo...</span>
        </div>
        <div className={s.list_item}>
          <span>Comment</span>
          <span>{comment}</span>
        </div>
        <div className={s.list_item}>
          <span>Sum</span>
          <span>{amount}</span>
        </div>
        <div className={s.list_item}>
          <Button
            type="button"
            className={clsx(s.delete_btn)}
            onClick={OnDelete}
            text={"Delete"}
          />
          <button
            type="button"
            className={s.edit_btn}
            onClick={onEdit}>
            <MdOutlineModeEdit />
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <tr className={s.row}>
      <td className={s.row_item}>{formatedDate}</td>
      <td
        className={s.row_item}
        style={{textAlign: "center"}}>
        {transaction.type == "INCOME" ? "+" : "-"}
      </td>
      <td className={s.row_item}>categoryId</td>
      {/* <td className={s.row_item}>{transaction.category}</td> */}
      <td className={s.row_item}>{transaction.comment}</td>
      <td
        className={s.row_item}
        style={{color}}>
        {transaction.amount}
      </td>
      <td className={clsx(s.row_item, s.controls)}>
        <button
          type="button"
          className={s.edit_btn}
          onClick={onEdit}>
          <MdOutlineModeEdit />
        </button>
        <Button
          type="button"
          className={clsx(s.delete_btn)}
          onClick={OnDelete}
          text={"Delete"}
        />
      </td>
    </tr>
  );
}

export default TransactionItem;

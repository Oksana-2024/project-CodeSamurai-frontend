import clsx from "clsx";
import {useDispatch} from "react-redux";
import {deleteTransactions} from "../../redux/transactions/operations";
import s from "./TransactionsItem.module.css";
import Button from "../Button/Button";
import {MdOutlineModeEdit} from "react-icons/md";

const getStyleByType = (type) => {
  const currentColor = type === "-" ? "var(--red-color)" : "var(--yellow-color)";
  return {
    color: currentColor,
  };
};

function TransactionItem({transaction, id}) {
  const dispatch = useDispatch();

  function onEdit() {
    console.log("open edit modal");
  }

  async function OnDelete() {
    await dispatch(deleteTransactions(id));
  }

  return (
    <tr className={s.row}>
      <td className={s.row_item}>{transaction.transactionDate}</td>
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
        style={{textAlign: "right"}}>
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

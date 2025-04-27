import clsx from "clsx";
import {useDispatch} from "react-redux";
import {deleteTransactions} from "../../redux/transactions/operations";
import s from "./TransactionsItem.module.css";
import Button from "../Button/Button";
import {MdOutlineModeEdit} from "react-icons/md";
import useMedia from "../../helpers/useMedia";

const getStyleByType = (type) => (type === "income" ? "var(--income-color)" : "var(--expense-color)");

function TransactionsItem({transaction}) {
  const dispatch = useDispatch();
  const {isMobile} = useMedia();

  const {date, type, category, comment, sum} = transaction;

  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear().toString().slice(-2);
  const formattedDate = `${day}.${month}.${year}`;

  const formattedType = type == "income" ? "+" : "-";
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const color = getStyleByType(type);

  function onEdit() {
    console.log("open edit modal ", transaction._id);
  }

  async function OnDelete() {
    await dispatch(deleteTransactions(transaction._id));
  }

  if (isMobile) {
    return (
      <div
        className={s.list}
        style={{borderColor: color}}>
        <div className={s.list_item}>
          <span>Date</span>
          <span>{formattedDate}</span>
        </div>
        <div className={s.list_item}>
          <span>Type</span>
          <span>{formattedType}</span>
        </div>
        <div className={s.list_item}>
          <span>Category</span>
          <span>{formattedCategory}</span>
        </div>
        <div className={s.list_item}>
          <span>Comment</span>
          <span>{comment}</span>
        </div>
        <div className={s.list_item}>
          <span>Sum</span>
          <span>{sum}</span>
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
      <td className={s.row_item}>{formattedDate}</td>
      <td
        className={s.row_item}
        style={{textAlign: "center"}}>
        {formattedType}
      </td>
      <td className={s.row_item}>{formattedCategory}</td>
      <td className={s.row_item}>{comment}</td>
      <td
        className={s.row_item}
        style={{color}}>
        {sum}
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

export default TransactionsItem;

import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import s from "./ButtonAddTransactions.module.css";

const ButtonAddTransactions = ({ onClick }) => {
  return (
    <button type="button" className={s.addButton} onClick={onClick}>
      <FaPlus size={20} />
    </button>
  );
};

export default ButtonAddTransactions;

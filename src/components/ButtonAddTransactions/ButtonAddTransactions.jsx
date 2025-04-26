import Button from "../Button/Button";
import {FaPlus} from "react-icons/fa";
import s from "./ButtonAddTransactions.module.css";

const ButtonAddTransactions = () => {
  return (
    <Button
      className={s.addButton}
      icon={<FaPlus size={20} />}
    />
  );
};

export default ButtonAddTransactions;

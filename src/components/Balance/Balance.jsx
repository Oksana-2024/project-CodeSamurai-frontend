import { useSelector } from "react-redux";
import s from "../Balance/Balance.module.css";
import { selectBalance } from "../../redux/auth/selectors";

const Balance = () => {
  const balance = useSelector(selectBalance);
  return (
    <div className={s.containerBalance}>
      <h2 className={s.textBalance}>Your balance</h2>
      <p className={s.totalBalance}>
        ₴ <span className={s.totalNumber}>{balance.toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Balance;

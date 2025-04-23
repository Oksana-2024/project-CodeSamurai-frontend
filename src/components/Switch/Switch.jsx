import { useState } from "react";
import s from "./Switch.module.css";
import clsx from "clsx";

const Switch = () => {
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };
  return (
    <div className={s.switchBox}>
      <p className={isOn ? s.income : s.incomeActive}>Income</p>
      <div className={s.switch}>
        <label htmlFor="switch" className={s.switchInput}>
          <input
            type="checkbox"
            name="switch"
            id="switch"
            checked={isOn}
            onChange={handleToggle}
          />
          <span className={clsx(s.slider, s.round)}></span>
        </label>
      </div>
      <p className={isOn ? s.expenseActive : s.expense}>Expense</p>
    </div>
  );
};

export default Switch;

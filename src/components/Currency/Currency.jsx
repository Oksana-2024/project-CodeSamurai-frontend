import { useDispatch } from "react-redux";
import { useEffect } from "react";
import s from "./Currency.module.css";
import { useCurrency } from "../../redux/currency/slice.js";
import { fetchCurrency } from "../../redux/currency/operations.js";
import CurrencyChart from "../CurrencyChart/CurrencyChart.jsx";

const Currency = () => {
  const dispatch = useDispatch();
  const { rates, updatedAt } = useCurrency();

  useEffect(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!updatedAt || now - updatedAt > oneHour) {
      dispatch(fetchCurrency());
    }
  }, [dispatch, updatedAt]);

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <ul className={s.thead}>
          <li className={s.th}>Currency</li>
          <li className={s.th}>Purchase</li>
          <li className={s.th}>Sale</li>
        </ul>
        <ul className={s.tbody}>
          {rates.map((rate) => (
            <li className={s.tr} key={rate.currency}>
              <p className={s.td}>{rate.currency}</p>
              <p className={s.td}>{rate.purchase.toFixed(2)}</p>
              <p className={s.td}>{rate.sale.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
      <CurrencyChart />
    </div>
  );
};

export default Currency;

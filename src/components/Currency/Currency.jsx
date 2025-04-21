import { useDispatch } from "react-redux";
import { useEffect } from "react";
import s from "./Currency.module.css";
import { useCurrency } from "../../redux/currency/slice.js";
import { fetchCurrency } from "../../redux/currency/operations.js";
import CurrencyChart from "../CurrencyChart/CurrencyChart.jsx";

const Currency = () => {
  const dispatch = useDispatch();
  const {rates, lastUpdated} = useCurrency();

  useEffect(() => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    if (!lastUpdated || now - lastUpdated > oneHour) {
      dispatch(fetchCurrency());
    }
  }, [dispatch, lastUpdated]);


  return  (<div className={s.wrapper}>
  <table className={s.table}>
    <thead className={s.thead}>
      <tr className={s.tr}>
        <th className={s.th}>Currency</th>
        <th className={s.th}>Purchase</th>
        <th className={s.th}>Sale</th>
      </tr>
    </thead>
    <tbody className={s.tbody}>
      {rates.map((rate) => (
        <tr className={s.tr} key={rate.currency}>
          <td className={s.td}>{rate.currency}</td>
          <td className={s.td}>{rate.purchase.toFixed(2)}</td>
          <td className={s.td}>{rate.sale.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <CurrencyChart />
</div>)
};

export default Currency;

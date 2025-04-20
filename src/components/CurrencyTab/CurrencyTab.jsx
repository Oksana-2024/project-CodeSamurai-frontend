import { useEffect, useState } from "react";
import axios from "axios";
import s from "./CurrencyTab.module.css";

const CurrencyTab = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const cached = JSON.parse(localStorage.getItem("currencyData"));
        const dateNow = Date.now();

        if (cached && dateNow - cached.timestamp < 60 * 60 * 1000) {
          setRates(formatData(cached.data));
        } else {
          const res = await axios.get("https://api.monobank.ua/bank/currency");
          const timestamp = Date.now();
          localStorage.setItem("currencyData", JSON.stringify({ timestamp, data: res.data }));
          setRates(formatData(res.data));
        }
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    fetchCurrencyData();
  }, []);

  const formatData = (data) => {
    const currencyCodes = {
      840: "USD",
      978: "EUR",
    };

    return data
      .filter(({ currencyCodeA, currencyCodeB }) => [840, 978].includes(currencyCodeA) && currencyCodeB === 980)
      .map(({ currencyCodeA, rateBuy, rateSell }) => ({
        currency: currencyCodes[currencyCodeA],
        purchase: rateBuy,
        sale: rateSell,
      }));
  };

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            <th className={s.th}>Currency</th>
            <th className={s.th}>Purchase</th>
            <th className={s.th}>Sale</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {rates.map((rate) => {
            return (
              <tr className={s.tr} key={rate.currency}>
                <td className={s.td}>{rate.currency}</td>
                <td className={s.td}>{rate.purchase.toFixed(2)}</td>
                <td className={s.td}>{rate.sale.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTab;

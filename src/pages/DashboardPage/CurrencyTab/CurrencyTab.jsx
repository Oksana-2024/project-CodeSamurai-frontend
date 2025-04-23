import Currency from "../../../components/Currency/Currency";
import s from "./CurrencyTab.module.css"

const CurrencyTab = () => {
  return (
    <div className={s.currencyMobile}>
      <Currency />
    </div>
  );
};

export default CurrencyTab;

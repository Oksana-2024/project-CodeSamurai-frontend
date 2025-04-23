import { useMediaQuery } from "react-responsive";
import Currency from "../../../components/Currency/Currency";
import s from "./CurrencyTab.module.css"

const CurrencyTab = () => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  
  return (
    <div className={s.currencyMobile}>
    {isSmallScreen &&  <Currency />}
    </div>
  );
};

export default CurrencyTab;

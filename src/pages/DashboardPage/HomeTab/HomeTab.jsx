import { useMediaQuery } from "react-responsive";
import Balance from "../../../components/Balance/Balance";
import TransactionsList from "../../../components/TransactionsList/TransactionsList";
import s from "./HomeTab.module.css";
import ButtonAddTransactions from "../../../components/ButtonAddTransactions/ButtonAddTransactions";


const HomeTab = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  

  return (
    <div>
      {isSmallScreen ? (
        <div className={s.homeTab}>
          <Balance />
          <TransactionsList />
        </div>
      ) : (
        <TransactionsList />
      )}
     
    </div>
  );
};

export default HomeTab;

import { useMediaQuery } from "react-responsive";
import Balance from "../../../components/Balance/Balance";
import TransactionsList from "../../../components/TransactionsList/TransactionsList";
import s from "./HomeTab.module.css";
import ButtonAddTransactions from "../../../components/ButtonAddTransactions/ButtonAddTransactions";
import { useDispatch } from "react-redux";
import { setAddTransaction } from "../../../redux/transactions/slice";


const HomeTab = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const dispatch = useDispatch();
    const handleOpenModal = () => {
      dispatch(setAddTransaction(true));
    };

  return (
    <div className={s.tab}>
      {isSmallScreen ? (
        <div className={s.homeTab}>
          <Balance />
          <TransactionsList />
        </div>
      ) : (
        <TransactionsList />
      )}
         <ButtonAddTransactions onClick={handleOpenModal} />
    </div>
  );
};

export default HomeTab;

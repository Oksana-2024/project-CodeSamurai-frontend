import {useMediaQuery} from "react-responsive";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import Balance from "../../../components/Balance/Balance";
import TransactionsList from "../../../components/TransactionsList/TransactionsList";
import s from "./HomeTab.module.css";
import {getTransactions} from "../../../redux/transactions/operations"; // Adjust the path as needed

const HomeTab = () => {
  const isSmallScreen = useMediaQuery({query: "(max-width: 767px)"});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

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

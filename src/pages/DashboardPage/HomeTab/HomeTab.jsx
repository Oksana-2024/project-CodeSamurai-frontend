import { useMediaQuery } from "react-responsive";
import Balance from "../../../components/Balance/Balance";

const HomeTab = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div>
      {isSmallScreen && <Balance />}
      HomeTab
    </div>
  );
};

export default HomeTab;

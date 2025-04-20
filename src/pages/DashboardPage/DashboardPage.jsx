import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import CurrencyTab from "./CurrencyTab/CurrencyTab";
import HomeTab from "./HomeTab/HomeTab";
import StatisticsTab from "./StatisticsTab/StatisticsTab";
import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";

const DashboardPage = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });
  const isMiddleScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        {isBigScreen && (
          <>
            <Navigation />
            <HomeTab />
            <StatisticsTab />
            <Currency />
          </>
        )}
        {isMiddleScreen && (
          <>
            <Navigation />
            <HomeTab />
            <StatisticsTab />
            <Currency />
          </>
        )}
        {isSmallScreen && (
          <>
            <Navigation />
            <HomeTab />
            <CurrencyTab />
            <StatisticsTab />
          </>
        )}
      </main>
    </>
  );
};

export default DashboardPage;

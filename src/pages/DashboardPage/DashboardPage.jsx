import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import HomeTab from "../../components/HomeTab/HomeTab";
import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import Navigation from "../../components/Navigation/Navigation";

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
            <CurrencyTab />
          </>
        )}
        {isMiddleScreen && (
          <>
            <Navigation />
            <HomeTab />
            <StatisticsTab />
            <CurrencyTab />
          </>
        )}
        {isSmallScreen && (
          <>
            <Navigation />
            <HomeTab />
            <CurrencyTab />
            <StatisticsDashboard />
          </>
        )}
      </main>
    </>
  );
};

export default DashboardPage;

import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";

import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
import { Outlet } from "react-router-dom";
import Balance from "../../components/Balance/Balance";
import s from "./DashboardPage.module.css"

const DashboardPage = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });
  const isMiddleScreen = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <section className={s.dashboardSection}>
      <Header />

      <main>
        {isBigScreen && (
          <>
            <Navigation />
            <Balance/>
            <Currency />
          </>
        )}
        {isMiddleScreen && (
          <>
            <Navigation />
            <Balance/>
            <Currency />
          </>
        )}
        {isSmallScreen && (
          <>
            <Navigation />
          </>
        )}
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardPage;

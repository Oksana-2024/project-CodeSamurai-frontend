import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";

import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
import { Outlet } from "react-router-dom";
import Balance from "../../components/Balance/Balance";
import s from "./DashboardPage.module.css";
import Container from "../../components/Container/Container";

const DashboardPage = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  return (
    <section className={s.dashboardSection}>
      <Header />

      <main>
        <Container className={s.dashboard}>
          {isBigScreen && (
            <>
              <div>
                <Navigation />
              </div>
              <div>
                <Balance />
              </div>
              <div>
                <Currency />
              </div>
            </>
          )}
        {isSmallScreen && (
          <div className={s.mobileDashboard}>
            <Navigation />
          </div>
        )}
        <Outlet />
        </Container>
      </main>
    </section>
  );
};

export default DashboardPage;

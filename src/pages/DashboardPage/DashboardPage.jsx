import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation";
import Currency from "../../components/Currency/Currency";
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
            <div className={s.grid}>
             <div className={s.navBalance}>
                <div className={s.nav}>
                  <Navigation />
                </div>
                  <div className={s.balance}>
                  <Balance />
                </div>
             </div>

              <div className={s.currency}>
                <Currency />
              </div>
            </div>
          )}
          {isSmallScreen && (
            <div className={s.mobileDashboard}>
              <Navigation />
            </div>
          )}
          <div className={s.content}>
            <Outlet />
          </div>
        </Container>
      </main>
    </section>
  );
};

export default DashboardPage;

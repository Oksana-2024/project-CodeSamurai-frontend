import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";

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
      {isBigScreen && (<>components</>)}
      {isMiddleScreen && (<>components</>)}
      {isSmallScreen && <>components</>}
    </>
  );
};

export default DashboardPage;

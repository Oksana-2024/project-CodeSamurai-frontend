import { IoExitOutline } from "react-icons/io5";
import Container from "../Container/Container.jsx";
import Logo from "../Logo/Logo.jsx";
import s from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { RxExit } from "react-icons/rx";
import { setComfirmLogout, useAuth } from "../../redux/auth/slice.js";
import { useDispatch } from "react-redux";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const { user } = useAuth();
  
  const dispatch = useDispatch();
  const handleComfirmLogout = () => {
    dispatch(setComfirmLogout(true))
  };

  return (
    <header className={s.header}>
      <Container className={s.headerContainer}>
        <Logo header />

        {isBigScreen ? (
          <div className={s.user}>
            <p>{user.name}</p>
            <div className={s.line}></div>
            <button
              onClick={handleComfirmLogout}
              type="button"
              className={s.exitBtn}
            >
              <RxExit size={18} /> <p>Exit</p>
            </button>
          </div>
        ) : (
          <div className={s.user}>
            <p>{user.name}</p>
            <button
              onClick={handleComfirmLogout}
              type="button"
              className={s.exitIcon}
            >
              <RxExit size={18} />
            </button>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;

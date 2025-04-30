import Container from "../Container/Container.jsx";
import Logo from "../Logo/Logo.jsx";
import s from "./Header.module.css";
import { useMediaQuery } from "react-responsive";
import { RxExit } from "react-icons/rx";
import {
  setComfirmLogout,
  setOpenUserProfile,
  useAuth,
} from "../../redux/auth/slice.js";
import { useDispatch } from "react-redux";
import Avatar from "../Avatar/Avatar.jsx";

const Header = () => {
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const { user } = useAuth();
  const dispatch = useDispatch();
  const handleComfirmLogout = () => {
    dispatch(setComfirmLogout(true));
  };
  const handleOpenUserProfile = () => {
    dispatch(setOpenUserProfile(true));
  };
  return (
    <header className={s.header}>
      <Container className={s.headerContainer}>
        <Logo header />
        <div className={s.user}>
          <button
            type="button"
            className={s.avatar}
            onClick={handleOpenUserProfile}
          >
            {user?.photo ? (
              <img width={32} src={user.photo} className={s.photo} />
            ) : (
              user.name[0]
            )}
          </button>
          <div className={s.line}></div>
          <button
            onClick={handleComfirmLogout}
            type="button"
            className={s.exitBtn}
          >
            <RxExit size={24} /> {isBigScreen && <p>Exit</p>}
          </button>
        </div>
      </Container>
    </header>
  );
};
export default Header;

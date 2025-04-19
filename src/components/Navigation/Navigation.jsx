import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { BiSolidHome } from "react-icons/bi";
import { MdOutlineTimeline } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import s from "./Navigation.module.css";
import Container from "../Container/Container";

const Navigation = () => {
  const activeStyle = ({ isActive }) => (isActive ? s.active : s.link);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  return (
   <section className={s.navSection}>
      <Container className={s.navContainer}>
        <nav className={s.navList}>
          {isSmallScreen ? (
            <NavLink className={activeStyle} to="/home" end>
              {({ isActive }) => (
                <div className={isActive ? s.activeBorder : s.iconBorder}>
                  <BiSolidHome
                    className={isActive ? s.iconActive : s.icon}
                    size={32}
                  />
                </div>
              )}
            </NavLink>
          ) : (
            <NavLink className={activeStyle} to="/home" end>
              {({ isActive }) => (
                <div className={s.wrapper}>
                  <div className={isActive ? s.activeBox : s.box}>
                    <BiSolidHome
                      className={isActive ? s.iconActive : s.icon}
                      size={12}
                    />
                  </div>
                  <p>Home</p>
                </div>
              )}
            </NavLink>
          )}
          {isSmallScreen ? (
            <NavLink className={activeStyle} to="/statistics" end>
              {({ isActive }) => (
                <div className={isActive ? s.activeBorder : s.iconBorder}>
                  <MdOutlineTimeline
                    className={isActive ? s.iconActive : s.icon}
                    size={32}
                  />
                </div>
              )}
            </NavLink>
          ) : (
            <NavLink className={activeStyle} to="/statistics" end>
              {({ isActive }) => (
                <div className={s.wrapper}>
                  <div className={isActive ? s.activeBox : s.box}>
                    <MdOutlineTimeline
                      className={isActive ? s.iconActive : s.icon}
                      size={12}
                    />
                  </div>
                  <p> Statistics</p>
                </div>
              )}
            </NavLink>
          )}
          {isSmallScreen && (
            <NavLink className={activeStyle} to="/currency" end>
              {({ isActive }) => (
                <div className={isActive ? s.activeBorder : s.iconBorder}>
                  <FaDollarSign
                    className={isActive ? s.iconActive : s.icon}
                    size={32}
                  />
                </div>
              )}
            </NavLink>
          )}
        </nav>
      </Container>
   </section>
  );
};

export default Navigation;

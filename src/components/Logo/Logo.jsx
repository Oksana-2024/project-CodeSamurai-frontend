import clsx from "clsx";
import LogoIcon from "../LogoIcon/LogoIcon.jsx";
import s from "./Logo.module.css";

const Logo = ({ header }) => {
  return (
    <div className={s.logoContainer}>
      <LogoIcon className={clsx(s.icon, header && s.iconHeader)} />
      <p className={clsx(s.logo, header && s.logoHeader)}>Money Guard</p>
    </div>
  );
};

export default Logo;

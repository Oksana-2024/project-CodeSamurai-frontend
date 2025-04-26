import clsx from "clsx";
import s from "./Button.module.css";

const Button = ({className, onClick, text, type = "submit", icon}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(s.baseStyle, className)}>
      {icon && icon}
      {text}
    </button>
  );
};
export default Button;

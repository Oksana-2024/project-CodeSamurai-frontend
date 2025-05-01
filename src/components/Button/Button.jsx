import clsx from "clsx";
import s from "./Button.module.css";

const Button = ({
  className,
  onClick,
  text,
  type = "submit",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(s.baseStyle, className)}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default Button;

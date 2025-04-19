import clsx from "clsx"
import s from "./Button"

 const Button = ({className, onClick, text, type="submit"}) => {
  return (
    <button onClick={onClick} type={type} className={clsx(s.baseStyle, className)}>{text}</button>
  )
}
export default Button
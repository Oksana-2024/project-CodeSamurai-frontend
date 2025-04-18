
 const Button = ({className, onClick, text, type="submit"}) => {
  return (
    <button onClick={onClick} type={type} className={className}>{text}</button>
  )
}
export default Button
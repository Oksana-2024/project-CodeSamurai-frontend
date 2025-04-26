import s from "./ButtonCancel.module.css";

const ButtonCancel = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={s.baseStyle}
    >
     Cancel
    </button>
  );
};
export default ButtonCancel;

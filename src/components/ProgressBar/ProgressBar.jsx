import s from "./ProgressBar.module.css";

const ProgressBar = ({ password = "", confirmPassword = "" }) => {
  const getStatus = () => {
    if (!password && !confirmPassword) return s.empty;
    if (password === confirmPassword) return s.match;
    return s.mismatch;
  };

  const status = getStatus();
  return (
    <div className={s.indicator}>
      <div className={`${s.segment} ${s.left} ${status}`} />
      <div
        className={`${s.segment} ${s.right} ${status === s.empty ? s.default : status}`}
      />
    </div>
  );
};

export default ProgressBar;

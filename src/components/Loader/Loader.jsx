import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.bounce}></div>
      <div className={s.bounce}></div>
    </div>
  );
};

export default Loader;

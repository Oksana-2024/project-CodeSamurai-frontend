import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { selectIsLoading } from "../../redux/global/selectors.js";
import s from "./Loader.module.css";

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) return null;

  return (
    <div className={s.loader}>
      <BeatLoader color="#FFB627" size={30} />
    </div>
  );
};

export default Loader;

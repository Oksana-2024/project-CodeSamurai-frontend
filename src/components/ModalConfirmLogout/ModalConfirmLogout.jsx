import { logoutUser } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectComfirmLogout } from "../../redux/auth/selectors";
import { setComfirmLogout } from "../../redux/auth/slice";
import Button from "../Button/Button";
import s from "./ModalConfirmLogout.module.css";
import ModalWindow from "../ModalWindow/ModalWindow";
import ButtonCancel from "../ButtonCancel/ButtonCancel";

const ModalConfirmLogout = () => {
  const dispatch = useDispatch();
  const isComfirm = useSelector(selectComfirmLogout);

  return (
    <ModalWindow
      closeModal={() => dispatch(setComfirmLogout(false))}
      modalIsOpen={isComfirm}
      showIcon={false}
    >
      <div className={s.modalBox}>
        <p className={s.text}>Are you sure you want to log out?</p>
        <Button
          className={s.btn}
          type="button"
          text="logout"
          onClick={() => {
            dispatch(logoutUser());
            dispatch(setComfirmLogout(false));
          }}
        />
        <ButtonCancel onClick={() => dispatch(setComfirmLogout(false))} />
      </div>
    </ModalWindow>
  );
};

export default ModalConfirmLogout;

import Modal from "react-modal";
Modal.setAppElement("#root");
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import s from "./ModalWindow.module.css";
import { noScrollDisable, noScrollEnable } from "../../helpers/noScroll";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "8px",
    backgroundColor:"var(--bg-modal)",
    backdropFilter: "blur(100px)",
    boxShadow: "0 4px 60px 0 rgba(0, 0, 0, 0.25)",
  },
  overlay: {
    backdropFilter: "blur(7px)",
    background: "var(--bg-blur)",
  },
};

const ModalWindow = ({
  title,
  children,
  modalIsOpen,
  closeModal,
  className,
  showIcon = true,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      onAfterOpen={noScrollEnable}
      onAfterClose={noScrollDisable}
    >
      <div className={clsx(s.modalBox, className)}>
        {showIcon && (
          <AiOutlineClose
            size={18}
            onClick={closeModal}
            className={s.closeIcon}
          />
        )}
        <h3 className={s.title}>{title}</h3>
        {children}
      </div>
    </Modal>
  );
};

export default ModalWindow;

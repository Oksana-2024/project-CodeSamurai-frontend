import Modal from "react-modal";
Modal.setAppElement("#root");
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalWindow = ({ title, children, modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
      >
        <AiOutlineClose size={18} />
        <h3>{title}</h3>
        {children}
      </Modal>
    </div>
  );
};

export default ModalWindow;

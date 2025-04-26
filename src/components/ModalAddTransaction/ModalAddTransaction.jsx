import Modal from "react-modal";
Modal.setAppElement("#root");
import { AiOutlineClose } from "react-icons/ai";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";

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

const ModalAddTransaction = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Modal">
        <AiOutlineClose size={18} />
        {/* <h3></h3> */}

        <AddTransactionForm closeModal={closeModal} />

        <button type="button" onClick={closeModal}>
          CANCEL
        </button>
      </Modal>
    </div>
  );
};

export default ModalAddTransaction;

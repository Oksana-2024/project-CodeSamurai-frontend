import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { setAddTransaction } from "../../redux/transactions/slice";
import { selectOpenAddTransaction } from "../../redux/transactions/selectors";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import useMedia from "../../helpers/useMedia";

const ModalAddTransaction = () => {
  const dispatch = useDispatch();

  const isAddModal = useSelector(selectOpenAddTransaction);
  const { isMobile } = useMedia();
  return (
    <ModalWindow
      closeModal={() => dispatch(setAddTransaction(false))}
      modalIsOpen={isAddModal}
      title="Add transaction"
      showIcon={isMobile ? false : true}
    >
      <AddTransactionForm
        closeModal={() => dispatch(setAddTransaction(false))}
      />

      <ButtonCancel onClick={() => dispatch(setAddTransaction(false))} />
    </ModalWindow>
  );
};

export default ModalAddTransaction;

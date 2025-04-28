import { useDispatch, useSelector } from "react-redux";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectCurrentTransaction } from "../../redux/transactions/selectors";
import useMedia from "../../helpers/useMedia";
import { setEditTransaction } from "../../redux/transactions/slice";
const ModalEditTransaction = () => {
  const dispatch = useDispatch();
  const { isMobile } = useMedia();
  const transaction = useSelector(selectCurrentTransaction);
  return (
    <ModalWindow
      closeModal={() => dispatch(setEditTransaction(null))}
      modalIsOpen={!!transaction}
      title="Edit transaction"
      showIcon={isMobile ? false : true}
    >
      <EditTransactionForm transaction={transaction} />
    </ModalWindow>
  );
};
export default ModalEditTransaction;

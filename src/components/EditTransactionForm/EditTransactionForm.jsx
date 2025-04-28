import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import css from "./EditTransactionForm.module.css";
import Button from "../Button/Button";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import { setEditTransaction } from "../../redux/transactions/slice";
import { updateTransaction } from "../../redux/transactions/operations";
import { toast } from "react-toastify";
const validationSchema = yup.object().shape({
  sum: yup
    .number()
    .required("Please enter the amount")
    .positive("Amount must be greater than zero")
    .typeError("Amount must be a number"),
  date: yup
    .date()
    .required("Date is required")
    .typeError("Invalid date format"),
  comment: yup.string().max(300, "Comment is too long"),
});
const EditTransactionForm = ({ transaction }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sum: transaction?.sum,
      date: new Date(transaction?.date),
      comment: transaction?.comment || "",
    },
  });
  const onSubmit = async (data) => {
    const updatedTransaction = {
      _id: transaction._id,
      ...data,
    };
    await dispatch(updateTransaction(updatedTransaction))
      .unwrap()
      .then(() => {
        toast.success("Transaction updated successfully!");
        dispatch(setEditTransaction(null));
      })
      .catch((error) => {
        console.error(`Failed to add transaction: ${error.message}`);
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      });
  };
  return (
    <form className={css.transaction_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.form_group}>
        <input
          type="number"
          step="0.01"
          placeholder="Enter amount"
          {...register("sum")}
          className={css.input}
        />
        {errors.sum && <p className={css.error}>{errors.sum.message}</p>}
      </div>
      <div className={css.form_group}>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => setValue("date", date)}
              className={css.input}
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
              placeholderText="Select date"
            />
          )}
        />
        {errors.date && <p className={css.error}>{errors.date.message}</p>}
      </div>
      <div className={css.form_group}>
        <textarea
          placeholder="Comment"
          {...register("comment")}
          className={css.textarea}
          rows={3}
        />
        {errors.comment && (
          <p className={css.error}>{errors.comment.message}</p>
        )}
      </div>
      <div className={css.button_group}>
        <Button text="Save" className={css.submit_button} />
        {/* <button type="button" onClick={onClose} className={css.close_button}>
          Cancel
        </button> */}
        <ButtonCancel onClick={() => dispatch(setEditTransaction(false))} />
      </div>
    </form>
  );
};
export default EditTransactionForm;

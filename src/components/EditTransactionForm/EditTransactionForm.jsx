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
import { BiCalendar } from "react-icons/bi";

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
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sum: transaction?.sum,
      date: transaction?.date ? new Date(transaction?.date) : null,
      comment: transaction?.comment || "",
      type: transaction?.type || "expense",
    },
  });

  const watchType = watch("type");

  const onSubmit = async (data) => {
    const updatedTransaction = {
      _id: transaction._id,
      ...data,
    };

    try {
      await dispatch(updateTransaction(updatedTransaction)).unwrap();
      toast.success("Transaction updated successfully!");
      dispatch(setEditTransaction(null));
    } catch (error) {
      console.error(`Failed to update transaction: ${error.message}`);
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    }
  };

  return (
    <form className={css.transaction_form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.type_toggle}>
        <span
          className={`${css.type_option} ${
            watchType === "income" ? css.active : ""
          }`}
          onClick={() => setValue("type", "income")}
        >
          Income
        </span>
        <span className={css.separator}>/</span>
        <span
          className={`${css.type_option} ${
            watchType === "expense" ? css.active : ""
          }`}
          onClick={() => setValue("type", "expense")}
        >
          Expense
        </span>
      </div>

      <div className={css.form_row}>
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
              <div className={css.date_picker_container}>
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className={css.input}
                  dateFormat="dd.MM.yyyy"
                  maxDate={new Date()}
                  placeholderText="Select date"
                />
                <div className={css.date_icon}>
                  <BiCalendar />
                </div>
              </div>
            )}
          />
          {errors.date && <p className={css.error}>{errors.date.message}</p>}
        </div>
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
        <Button text="Save" className={css.submit_button} type="submit" />
        <ButtonCancel onClick={() => dispatch(setEditTransaction(null))} />
      </div>
    </form>
  );
};

export default EditTransactionForm;

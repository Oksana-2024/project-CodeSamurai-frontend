import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";
import { selectCategories } from "../../redux/transactions/selectors";
import { addTransactions } from "../../redux/transactions/operations";
import { setAddTransaction } from "../../redux/transactions/slice";

import s from "./AddTransactionForm.module.css";
import Switch from "../Switch/Switch";
import Button from "../Button/Button";

// Form validation schema
const AddTransactionSchema = yup.object({
    category: yup.string().when("$isChecked", {
    is: true,
    then: (schema) => schema.required("Please select a category"),
    otherwise: (schema) => schema.notRequired(),
  }),
  sum: yup
    .number()
    .required("Please enter the amount")
    .typeError("Must be a number"),
  comment: yup.string(),
});

const AddTransactionForm = ({ closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(true); // Стан для перемикача
  const categories = useSelector(selectCategories);
  const incomeCategory = categories.find(
    (category) => category.name === "Income"
  );
  const expenceCategories = categories.filter(
    (category) => category.name !== "Income"
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddTransactionSchema),
    defaultValues: { sum: "", comment: "", date: new Date() },
    context: { isChecked }, // <-- передаємо в контекст
  });

  const onSubmit = async (data) => {
    const newTransaction = {
      type: !isChecked ? "income" : "expense", // використовуємо isChecked
      categoryId: !isChecked ? incomeCategory._id : data.category,
      sum: data.sum,
      date: data.date,
      comment: data.comment,
    };

    dispatch(addTransactions(newTransaction))
      .unwrap()
      .then(() => {
        toast.success("Transaction added successfully!");
        reset(); // очищаємо форму
        closeModal(() => dispatch(setAddTransaction(false)));
        // закриваємо модальне вікно, якщо передано функцію
      })
      .catch((error) => {
        console.error(`Failed to add transaction: ${error.message}`);
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      });
  };

  return (
    <div className={s.wrapper}>
      <Switch
        className={s.switch}
        onChange={setIsChecked}
        defaultValue={true}
      />

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.select_error_box}>
          {isChecked && (
            <>
              <div className={s.select_box}>
                <select
                  className={s.select}
                  name="category"
                  defaultValue=""
                  {...register("category")}
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>

                  {expenceCategories.map((items) => (
                    <option key={items._id} value={items._id}>
                      {items.name}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className={s.select_icon} />
              </div>
              <div className={s.error_box}>
                {errors.category && (
                  <p className={s.errors}>{errors.category.message}</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className={s.box_sum_date}>
          <div className={s.date_box}>
            <input
              className={s.sum}
              {...register("sum")}
              type="number"
              defaultValue=""
              placeholder="0.00"
              step={0.01}
              min={0.01}
            />
            <div className={s.error_box}>
              {errors.sum && <p className={s.errors}>{errors.sum.message}</p>}
            </div>
          </div>
          <div className={s.date_box}>
            <Controller
              name="date"
              control={control}
              className={s.controller}
              render={({ field }) => (
                <>
                  <DatePicker
                    {...field}
                    selected={field.value || startDate}
                    onChange={(date) => {
                      field.onChange(date);
                      setStartDate(date);
                    }}
                    dateFormat="dd.MM.yyyy"
                    className={s.DatePicker}
                    maxDate={new Date()}
                  />
                </>
              )}
            />
            <div className={s.date_icon}>
              <BiCalendar />
            </div>
          </div>
        </div>

        <input
          className={s.comment}
          {...register("comment")}
          placeholder="Comment"
          autoComplete="off"
          type="text"
        />

        <Button className={s.add_btn} text="ADD" />
      </form>
    </div>
  );
};

export default AddTransactionForm;

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

import Button from "../Button/Button";
import Switch from "../Switch/Switch";
import s from "./AddTransactionForm.module.css";

import { addTransactions } from "../../redux/transactions/operations";
import { selectCategories } from "../../redux/statistics/selectors";

// Form validation schema
const AddTransactionSchema = yup.object({
  // category: yup.string().required("Please select a category"),
  sum: yup.number().required("Please enter the amount").typeError("Must be a number"),
  // date: yup.date().required("Date is required"),
  comment: yup.string(),
});

const AddTransactionForm = ({ closeModal }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);
  const [selectCategoriesId, setSelectCategoriesId] = useState(null);
  const categories = useSelector(selectCategories);

  const dispatch = useDispatch();
  // console.log("categories", categories);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(AddTransactionSchema),
    defaultValues: { sum: "", comment: "", date: new Date() },
  });

  const categoriesForSelect = categories
    .filter((category) => category.type !== "INCOME")
    .map((category) => ({
      value: category.id,
      label: category.name,
      isDisabled: category.name === "Main expenses",
    }));

  // ховає placeholder у select
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const onSubmit = async (data) => {
    const categoryId = isChecked ? "67cece57cf044b5afacf7749" : selectCategoriesId;

    const newTransaction = {
      type: isChecked ? "INCOME" : "EXPENSE",
      category: categoryId,
      sum: data.sum,
      date: data.date,
      comment: data.comment,
    };

    dispatch(addTransactions(newTransaction))
      .unwrap()
      .then(() => {
        toast.success("Transaction added successfully!");
        reset(); // очищаємо форму
        // dispatch(closeModal());
        closeModal();
        // закриваємо модальне вікно, якщо передано функцію
      })
      .catch((error) => {
        console.error(`Failed to add transaction: ${error.message}`);
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      });

    console.log("Form: ", data);
  };

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Add transaction</h2>

      <Switch className={s.switch} onChange={setIsChecked} defaultValue={true} />

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.select_error_box}>
          {isChecked && (
            <>
              <div className={s.select_box}>
                <select
                  className={s.select}
                  name="category"
                  {...register("category")}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(selected) => setSelectCategoriesId(selected.value)}
                >
                  {!isFocused && (
                    <option key="placeholder" value="" className={s.select_placeholder}>
                      Select a category
                    </option>
                  )}
                  {categoriesForSelect.map((cat) => (
                    <option key={cat.value} value={cat.value} disabled={cat.isDisabled} className={s.select_option}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <IoIosArrowDown className={s.select_icon} />
              </div>
              <div className={s.error_box}>
                {errors.category && <p style={{ color: "red" }}>{errors.category.message}</p>}
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
            />
            <div className={s.error_box}>{errors.sum && <p style={{ color: "red" }}>{errors.sum.message}</p>}</div>
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

        <input className={s.comment} {...register("comment")} placeholder="Comment" autoComplete="off" type="text" />

        <Button className={s.add_btn} type="submit" text="ADD" />

        <button className={s.cancel_btn} type="button" onClick={closeModal}>
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm;

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./EditTransactionForm.module.css";

const validationSchema = yup.object({
  sum: yup
    .number()
    .required("The field is required.")
    .positive("The sum must be greater than zero."),
  date: yup.date().required("The field is required.").nullable(),
  comment: yup.string(),
});

const EditTransactionForm = ({ initialData, onClose, onSuccess }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sum: initialData?.sum || "",
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      comment: initialData?.comment || "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await fetch("", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error updating transaction");
        return;
      }

      onSuccess(values);
      onClose();
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form className={css.transaction_form} onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <div className={css.error_message}>{errorMessage}</div>}

      <div className={css.form_group}>
        <label htmlFor="sum">Sum</label>
        <input
          type="number"
          id="sum"
          {...register("sum")}
          placeholder="enter the amount"
        />
        {errors.sum && <p className={css.error}>{errors.sum.message}</p>}
      </div>

      <div className={css.form_group}>
        <label htmlFor="date">Date</label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              id="date"
              selected={field.value}
              onChange={(date) => setValue("date", date)}
              placeholderText="enter date"
              dateFormat="dd/MM/yyyy"
              className={css.date_picker}
            />
          )}
        />
        {errors.date && <p className={css.error}>{errors.date.message}</p>}
      </div>

      <div className={css.form_group}>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          {...register("comment")}
          placeholder="enter comment"
        />
      </div>

      <div className={css.button_group}>
        <button type="submit" className={css.submit_button}>
          Save
        </button>
        <button type="button" className={css.close_button} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  return (
    <Formik
      initialValues={{
        sum: initialData?.sum || "",
        date: initialData?.date ? new Date(initialData.date) : new Date(),
        comment: initialData?.comment || "",
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { resetForm }) => {
        try {
          const response = await fetch("", {
            method: "PUT",
            headers: {
              "Content-Type": "",
            },
            body: JSON.stringify(values),
          });

          if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || "Error updating transaction");
            return;
          }

          onSuccess(values);
          resetForm();
          onClose();
        } catch (error) {
          setErrorMessage("An error occurred. Please try again.");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className={css.transaction_form}>
          {errorMessage && (
            <div className={css.error_message}>{errorMessage}</div>
          )}

          <div className={css.form_group}>
            <label htmlFor="sum">Sum</label>
            <Field
              type="number"
              id="sum"
              name="sum"
              placeholder="enter the amount"
            />
            <ErrorMessage name="sum" component="p" className={css.error} />
          </div>

          <div className={css.form_group}>
            <label htmlFor="date"></label>
            <Field name="date">
              {({ field }) => (
                <DatePicker
                  id="date"
                  selected={field.value}
                  onChange={(date) => setFieldValue("date", date)}
                  placeholderText="enter date"
                  dateFormat="dd/MM/yyyy"
                  className={css.date_picker}
                />
              )}
            </Field>
            <ErrorMessage name="date" component="p" className={css.error} />
          </div>

          <div className={css.form_group}>
            <label htmlFor="comment"></label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="enter comment"
            />
          </div>

          <div className={css.button_group}>
            <button type="submit" className={css.submit_button}>
              Save
            </button>
            <button
              type="button"
              className={css.close_button}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditTransactionForm;

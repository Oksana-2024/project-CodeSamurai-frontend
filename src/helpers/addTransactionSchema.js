import * as yup from "yup";

export const AddTransactionSchema = yup.object({
  category: yup.string().when("$isChecked", {
    is: true,
    then: (schema) => schema.required("Please select a category"),
    otherwise: (schema) => schema.notRequired(),
  }),
  sum: yup.number().required("Please enter the amount").typeError("Must be a number"),
  comment: yup.string().max(60, "Max 60 characters"),
});

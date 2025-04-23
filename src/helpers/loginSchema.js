import * as Yup from "yup";

export const validationSchemaLogin = Yup.object({
  email: Yup.string()
    .max(64, "Maximum length is 64 characters")
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password cannot exceed 20 characters")
    .required("Required"),
});

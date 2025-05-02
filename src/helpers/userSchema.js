import { object, string } from "yup";

export const validationSchemaUserUpdate = object({
  name: string()
    .min(2, "Minimum length is 2 characters")
    .max(20, "Maximum length is 20 characters")
    .matches(/^[a-zA-Zа-щА-ЩЬьЮюЯяІіЇїЄєҐґ]+$/, {
      message: "You can add only letters",
    })
    .required("Required"),
});

/**
 * Defines the schema for the NewRecipeView
 */

import * as Yup from "yup";

let sharedSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  lastName: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  username: Yup.string().required("Required"),
});

export const newSchema = sharedSchema.shape({
  password: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  confirm: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const editSchema = sharedSchema;

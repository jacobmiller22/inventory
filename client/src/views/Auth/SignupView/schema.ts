/**
 * Defines the schema for the NewRecipeView
 */

import * as Yup from "yup";

export default Yup.object().shape({
  firstName: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  lastName: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .required("Required"),
  confirmPassword: Yup.string()
    .max(30, "Character limit exceeded (30)")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

/**
 * Defines the schema for the NewRecipeView
 */

import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string()
    .max(50, "Character limit exceeded (50)")
    .required("Required"),
  password: Yup.string()
    .max(50, "Character limit exceeded (50)")
    .required("Required"),
});

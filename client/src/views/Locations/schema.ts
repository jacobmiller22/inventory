/**
 * Defines the schema for the NewRecipeView
 */

import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .max(50, "Character limit exceeded (50)")
    .required("Required"),
  description: Yup.string().max(2000, "Character limit exceeded (2000)"),
});

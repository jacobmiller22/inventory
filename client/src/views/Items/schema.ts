/**
 * Defines the schema for the NewRecipeView
 */

import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .max(50, "Character limit exceeded (50)")
    .required("Required"),
  quantity: Yup.number()
    .min(0, "Must be greater than or equal to 0")
    .required("Required"),
  unit: Yup.string()
    .max(50, "Character limit exceeded (50)")
    .required("Required"),
  description: Yup.string().max(2000, "Character limit exceeded (2000)"),
  location: Yup.string().required("Required"),
  tags: Yup.string(),
  // tags: Yup.array().of(Yup.string()),
});

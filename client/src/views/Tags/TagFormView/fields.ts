/**
 * Defines the fields used in NewRecipeView
 */

import { FormType } from "interfaces/form";

const fields = [
  {
    name: "name",
    label: "Tag name",
    placeholder: "Enter tag name",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
];

export default fields;

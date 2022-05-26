/**
 * Defines the fields used in NewRecipeView
 */

import { FormType } from "interfaces/form";

const fields = [
  {
    name: "name",
    label: "Item name",
    placeholder: "Enter item name",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
];

export default fields;

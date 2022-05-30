/**
 * Defines the fields used in NewRecipeView
 */

import { FormType } from "interfaces/form";

const fields = [
  {
    name: "name",
    label: "Location name",
    placeholder: "Enter location name",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description...",
    initialValue: "",
    type: FormType.LONG_TEXT,
    required: false,
  },
];

export default fields;

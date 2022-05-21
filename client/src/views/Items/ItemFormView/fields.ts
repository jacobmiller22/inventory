/**
 * Defines the fields used in NewRecipeView
 */

import { FormType } from "interfaces/form";

export default [
  {
    name: "name",
    label: "Item name",
    placeholder: "Enter item name",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "X items",
    initialValue: 1,
    type: FormType.NUMBER,
    required: true,
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "Unit",
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
  {
    name: "locationId",
    label: "Location",
    placeholder: "Description...",
    initialValue: "",
    type: FormType.SELECT,
    required: true,
    multiple: false,
    options: [],
  },
  {
    name: "tagIds",
    label: "Tags",
    placeholder: "Description...",
    initialValue: "",
    type: FormType.SELECT,
    required: false,
    multiple: false,
    options: [],
  },
];

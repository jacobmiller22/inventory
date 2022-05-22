/**
 * Defines the fields used in SignupView
 */

import { FormType } from "interfaces/form";

export default [
  {
    name: "username",
    label: "Username",
    placeholder: "",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },

  {
    name: "password",
    label: "Password",
    placeholder: "",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    hide: true,
    required: true,
  },
];

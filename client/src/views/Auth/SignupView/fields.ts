/**
 * Defines the fields used in SignupView
 */

import { FormType } from "interfaces/form";

const fields = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "John",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Doe",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "jdoe@gmail.com",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
  {
    name: "username",
    label: "Username",
    placeholder: "jdoe22",
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
    required: true,
    hide: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
    hide: true,
  },
];

export default fields;

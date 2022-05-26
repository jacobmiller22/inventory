/**
 * Defines the fields used in SignupView
 */

import { FormType } from "interfaces/form";
import { Role } from "interfaces/user";

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
    name: "confirm",
    label: "Confirm Password",
    placeholder: "",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
    hide: true,
  },
  {
    name: "roles",
    label: "Roles",
    placeholder: "",
    initialValue: [],
    type: FormType.SELECT,
    required: true,
    multiple: true,
    options: [
      { id: Role.ADMIN, label: "Admin" },
      { id: Role.USER, label: "User" },
    ],
  },
  {
    name: "profileSrc",
    label: "Profile Source URL",
    placeholder: "",
    initialValue: "",
    type: FormType.SHORT_TEXT,
    required: true,
  },
];

export default fields;

export interface FormField {
  name: string;
  label: string;
  type: string;
  value: string;
}

export enum FormType {
  LONG_TEXT = "LONG_TEXT",
  SHORT_TEXT = "SHORT_TEXT",
  NUMBER = "NUMBER",
  ARRAY = "ARRAY",
  SELECT = "SELECT",
}

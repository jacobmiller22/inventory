import { AnySchema } from "yup";
/** Interfaces/types */

/** components */
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, FormikProps, Field, FieldArray, useField } from "formik";

import NumberField from "../NumberField";
import TextArea from "../TextArea";
import Spacer from "../Spacer";
import React from "react";
import AddIcon from "@mui/icons-material/AddSharp";
import RemoveIcon from "@mui/icons-material/RemoveSharp";
import theme from "theme";
import _ from "lodash";
import { FormType } from "interfaces/form";

interface IRecipeFormProps<V> {
  fields: any[];
  onSubmit: (values: V) => Promise<boolean>;
  schema?: AnySchema;
  submitButtonText?: string;
  successText?: string;
  resetOnSuccess?: boolean;
}

const BasicForm = <V extends object>({
  fields,
  onSubmit,
  schema,
  submitButtonText = "Submit",
  successText = "Success",
  resetOnSuccess = true,
}: IRecipeFormProps<V>) => {
  const [submitText, setSubmitText] = React.useState(submitButtonText);

  const handleSubmit = async (values: any, actions: any) => {
    const success: boolean = await onSubmit(values);
    actions.setSubmitting(false);
    setSubmitText(successText);
    setTimeout(() => {
      setSubmitText(submitButtonText);
    }, 3000);
    if (success && resetOnSuccess) {
      actions.resetForm();
    }
  };

  let initialValues = createInitialValues(fields, "initialValue");

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(props: FormikProps<any>) => (
        <Form>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            paddingX="2"
          >
            {renderFields(fields, { formikProps: props })}
            <Button
              type="submit"
              variant="contained"
              disabled={!props.dirty || props.isSubmitting}
            >
              {props.isSubmitting ? (
                <CircularProgress size={24.5} />
              ) : (
                submitText
              )}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;

const renderFields = (fields: any[], { formikProps }: { formikProps: any }) => {
  return fields.map((customField, index: number) => {
    return (
      <React.Fragment key={`field-${index}`}>
        {renderField(customField, { formikProps, index })}
      </React.Fragment>
    );
  });
};

const renderField = (
  customField: any,
  {
    formikProps,
    index,
    parentName = undefined,
  }: { formikProps: any; index: number; parentName?: any }
) => {
  /** Render the field array fields */
  if (customField.type === FormType.ARRAY) {
    return (
      <Box>
        <FieldArray name={customField.name}>
          {(arrayHelpers) => (
            <Box
              marginLeft="0.5rem"
              paddingLeft="0.5rem"
              sx={{
                borderLeft: "1px solid",
                borderLeftColor: theme.palette.divider,
              }}
            >
              {formikProps.values[customField.name].map(
                (value: any, subIndex: number) => {
                  return (
                    <Box key={`field-${index}-${subIndex}`}>
                      <Box width="100%" display="flex" alignItems="center">
                        <FormLabel>
                          {customField.singularLabel} {subIndex + 1}
                        </FormLabel>
                        <Spacer />
                        <Button
                          color="secondary"
                          onClick={() => arrayHelpers.remove(subIndex)}
                          startIcon={<RemoveIcon />}
                        >
                          Remove
                        </Button>
                      </Box>
                      {customField.fields.map(
                        (subCustomField: any, fieldIndex: number) => {
                          return (
                            <React.Fragment
                              key={`field-${index}-${subIndex}-${fieldIndex}`}
                            >
                              {renderField(subCustomField, {
                                formikProps,
                                index: subIndex,
                                parentName: customField.name,
                              })}
                            </React.Fragment>
                          );
                        }
                      )}
                    </Box>
                  );
                }
              )}
              <Button
                color="secondary"
                onClick={() => {
                  let newField = createInitialValues(customField.fields, "");

                  arrayHelpers.push(newField);
                }}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
          )}
        </FieldArray>
      </Box>
    );
  }

  /** Render the standard field NOT an array */

  const name = `${parentName ? `${parentName}.${index}.` : ""}${
    customField.name
  }`;
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: any }) => {
        return (
          <Box width="100%" marginY="0.25rem">
            {CustomInput(customField, field, formikProps)}
          </Box>
        );
      }}
    </Field>
  );
};

const CustomInput = (
  customField: any,
  formikField: any,
  { errors, touched, index }: { errors: any; touched: any; index: number }
) => {
  const [hookField, meta, hookHelpers] = useField(formikField.name);

  const errorMessage: string = meta.touched && meta.error ? meta.error! : "";

  switch (customField.type) {
    case FormType.LONG_TEXT: {
      return (
        <TextArea
          id={formikField.name}
          sx={{ width: "100%" }}
          placeholder={customField.placeholder}
          label={customField.label}
          helperText={customField.helperText}
          required={customField.required}
          error={Boolean(errorMessage)}
          disabled={
            customField.editable === undefined ? false : !customField.editable
          }
          {...formikField}
        />
      );
    }
    case FormType.SHORT_TEXT: {
      const errorMessage: string =
        meta.touched && meta.error ? meta.error! : "";

      return (
        <TextField
          id={formikField.name}
          sx={{ width: "100%" }}
          placeholder={customField.placeholder}
          label={customField.label}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={
            customField.editable === undefined ? false : !customField.editable
          }
          variant="standard"
          required={customField.required}
          error={Boolean(errorMessage)}
          {...formikField}
          helperText={
            errorMessage ? errorMessage : customField.helperText || " "
          }
        />
      );
    }
    case FormType.NUMBER: {
      return (
        <NumberField
          id={formikField.name}
          sx={{ width: "100%" }}
          placeholder={customField.placeholder}
          label={customField.label}
          helperText={customField.helperText}
          required={customField.required}
          error={errorMessage}
          disabled={
            customField.editable === undefined ? false : !customField.editable
          }
          {...formikField}
        />
      );
    }
    case FormType.SELECT: {
      return (
        <FormControl variant="standard" sx={{ width: "100%", m: 0 }}>
          <InputLabel id={`${formikField.name}-label`}>
            {customField.label}
          </InputLabel>
          <Select
            id={formikField.name}
            labelId={`${formikField.name}-label`}
            sx={{ width: "100%" }}
            placeholder={customField.placeholder}
            label={customField.label}
            disabled={
              customField.editable === undefined ? false : !customField.editable
            }
            multiple={
              customField.multiple === undefined ? false : customField.multiple
            }
            variant="standard"
            required={customField.required}
            error={Boolean(errorMessage)}
            {...formikField}
          >
            {customField.options.map(
              (option: { id: string; label: string }, i: number) => (
                <MenuItem key={`option-${i}`} value={option.id}>
                  {option.label}
                </MenuItem>
              )
            )}
          </Select>
          <FormHelperText error={Boolean(errorMessage)}>
            {errorMessage ? errorMessage : customField.helperText || " "}
          </FormHelperText>
        </FormControl>
      );
    }
    case FormType.ARRAY: {
      throw new Error("Array type not supported. This should never happen");
      return null;
    }
    default: {
      console.warn("Unsupported field type. Defaulting to short text field");
      return (
        <TextField
          id={formikField.name}
          variant="standard"
          label={customField.label}
          placeholder={customField.placeholder}
          required={customField.required}
          error={Boolean(errorMessage)}
          touched={touched[formikField.name]}
          disabled={
            customField.editable === undefined ? false : !customField.editable
          }
          helperText={
            errorMessage ? errorMessage : customField.helperText || " "
          }
          {...formikField}
        />
      );
    }
  }
};
const createInitialValues = (fields: any[], k: string | null) => {
  return mapObjectArr(fields, (field) =>
    field.type === FormType.ARRAY
      ? [
          field.name,

          [
            mapObjectArr(field.fields, (subField) => [
              subField.name,
              k ? subField[k] : "",
            ]),
          ],
        ]
      : [field.name, k ? field[k] : ""]
  );
};

export const mapObjectArr = (obj: any[], func: (...args: any[]) => any) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [...func(v)]));

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
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/AddSharp";
import RemoveIcon from "@mui/icons-material/RemoveSharp";
import theme from "theme";
import { FormType } from "interfaces/form";
import { Status } from "interfaces";
import SubmitButton from "components/SubmitButton";

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
  const [status, setStatus] = React.useState<Status>(Status._);

  const resetStatusTimer = () => {
    setTimeout(() => {
      setStatus(Status._);
    }, 3000);
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setSubmitText(submitButtonText);
    } else if (status === Status.ERROR) {
      setSubmitText("Error");
    }
    resetStatusTimer();
  }, [status]);

  const handleSubmit = async (values: any, actions: any) => {
    const success: boolean = await onSubmit(values);
    actions.setSubmitting(false);
    // setSubmitText(successText);
    setStatus(success ? Status.SUCCESS : Status.ERROR);
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
            {/* {renderFields(fields, { formikProps: props })} */}
            <FormContent fields={fields} formikProps={props} />
            <SubmitButton
              isSubmitting={props.isSubmitting}
              status={status}
              isValid={props.isValid}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default BasicForm;

interface FormContent {
  fields: any[]; // A (custom field object)[]
  formikProps: any;
}

/**
 * Component that renders the form fields
 */
const FormContent = ({ fields, formikProps }: FormContent) => {
  return (
    <React.Fragment>
      {fields.map((customField, index: number) => {
        return (
          <React.Fragment key={`field-${index}`}>
            {/* {CustomField(customField, { formikProps, index })} */}
            <FormField field={customField} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

interface FormField {
  field: any; // A custom field object
  parent?: string;
}

/**
 * Component that represents a field specified by the user-specifed field
 */
const FormField = ({ field, parent }: FormField) => {
  const name = parent ? parent : field.name;

  if (field.type === FormType.ARRAY) {
    return (
      <Box>
        <FieldArray name={field.name}>
          {(arrayHelpers) => (
            <Box
              marginLeft="0.5rem"
              paddingLeft="0.5rem"
              sx={{
                borderLeft: "1px solid",
                borderLeftColor: theme.palette.divider,
              }}
            >
              <FormFieldArrayChildren
                arrayHelpers={arrayHelpers}
                customField={field}
                formikName={name}
              />
            </Box>
          )}
        </FieldArray>
      </Box>
    );
  }

  // Parent looks like `${parent}.${index}.`

  return (
    <Field name={name}>
      {(props: FormFieldChildProps) => (
        <FormFieldChild {...props} customField={field} />
      )}
    </Field>
  );
};

interface FormFieldChildProps {
  field: any;
  customField: any;
  form: any;
}

const FormFieldChild = ({ field, customField }: FormFieldChildProps) => {
  return (
    <Box width="100%" marginY="0.25rem">
      <FormFieldChildInput customField={customField} formikName={field.name} />
    </Box>
  );
};

interface FormFieldArrayChildrenProps {
  formikName: string;
  customField: any;
  arrayHelpers: any;
}

const FormFieldArrayChildren = ({
  arrayHelpers,
  customField,
  formikName,
}: FormFieldArrayChildrenProps) => {
  const [field, meta] = useField(formikName);

  return (
    <React.Fragment>
      {meta.value.map((value: any, subIndex: number) => {
        return (
          <Box key={`field-${formikName}-${subIndex}`}>
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
                    key={`field-${formikName}-${subIndex}-${fieldIndex}`}
                  >
                    <FormField
                      field={subCustomField}
                      parent={`${formikName}.${subIndex}.${subCustomField.name}`}
                    />
                  </React.Fragment>
                );
              }
            )}
          </Box>
        );
      })}
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
    </React.Fragment>
  );
};

interface FormFieldChildInputProps {
  customField: any;
  formikName: string;
}

const FormFieldChildInput = ({
  customField,
  formikName,
}: FormFieldChildInputProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(formikName);

  const errorMessage: string = meta.touched && meta.error ? meta.error! : "";

  const textFieldProps = {
    id: field.name,
    sx: { width: "100%" },
  };

  const customProps = {
    placeholder: customField.placeholder,
    label: customField.label,
    helperText: errorMessage ? errorMessage : customField.helperText || " ",
    required: customField.required,
    error: Boolean(errorMessage),
    disabled:
      customField.editable === undefined ? false : !customField.editable,
  };

  switch (customField.type) {
    case FormType.LONG_TEXT: {
      return (
        <TextArea
          {...customProps}
          {...textFieldProps}
          InputProps={{
            type: (customField.hide && "password") || "text",
          }}
          {...field}
        />
      );
    }
    case FormType.SHORT_TEXT: {
      return (
        <TextField
          {...customProps}
          {...textFieldProps}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            type: (customField.hide && "password") || "text",
          }}
          variant="standard"
          {...field}
        />
      );
    }
    case FormType.NUMBER: {
      return (
        <NumberField
          {...customProps}
          {...textFieldProps}
          InputProps={{
            type: (customField.hide && "password") || "text",
          }}
          {...field}
        />
      );
    }
    case FormType.SELECT: {
      return (
        <FormControl variant="standard" sx={{ width: "100%", m: 0 }}>
          <InputLabel id={`${field.name}-label`}>
            {customField.label}
          </InputLabel>
          <Select
            {...textFieldProps}
            {...customProps}
            labelId={`${field.name}-label`}
            multiple={
              customField.multiple === undefined ? false : customField.multiple
            }
            variant="standard"
            {...field}
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
    }
    default: {
      throw new Error("Unknown, unsupported field type: " + customField.type);
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

/**
 *
 * Old code, keeping for reference. Note that this is not a common occurence, but currently this is the fastest way to do this.
 * Other things to attend to and and I cannot remember if the level 2 array fields work on the old code bc they don't quite work correctly with the new code,
 * but I do not have a use for that deep of form nesting at the moment so I am pushing this off to later.
 */
//  const renderFields = (fields: any[], { formikProps }: { formikProps: any }) => {
//   return fields.map((customField, index: number) => {
//     return (
//       <React.Fragment key={`field-${index}`}>
//         {CustomField(customField, { formikProps, index })}
//       </React.Fragment>
//     );
//   });
// };

// const CustomField = (
//   customField: any,
//   {
//     formikProps,
//     index,
//     parentName = undefined,
//   }: { formikProps: any; index: number; parentName?: any }
// ) => {
//   /** Render the field array fields */
//   if (customField.type === FormType.ARRAY) {
//     return (
//       <Box>
//         <FieldArray name={customField.name}>
//           {(arrayHelpers) => (
//             <Box
//               marginLeft="0.5rem"
//               paddingLeft="0.5rem"
//               sx={{
//                 borderLeft: "1px solid",
//                 borderLeftColor: theme.palette.divider,
//               }}
//             >
//               {formikProps.values[customField.name].map(
//                 (value: any, subIndex: number) => {
//                   return (
//                     <Box key={`field-${index}-${subIndex}`}>
//                       <Box width="100%" display="flex" alignItems="center">
//                         <FormLabel>
//                           {customField.singularLabel} {subIndex + 1}
//                         </FormLabel>
//                         <Spacer />
//                         <Button
//                           color="secondary"
//                           onClick={() => arrayHelpers.remove(subIndex)}
//                           startIcon={<RemoveIcon />}
//                         >
//                           Remove
//                         </Button>
//                       </Box>
//                       {customField.fields.map(
//                         (subCustomField: any, fieldIndex: number) => {
//                           return (
//                             <React.Fragment
//                               key={`field-${index}-${subIndex}-${fieldIndex}`}
//                             >
//                               {CustomField(subCustomField, {
//                                 formikProps,
//                                 index: subIndex,
//                                 parentName: customField.name,
//                               })}
//                             </React.Fragment>
//                           );
//                         }
//                       )}
//                     </Box>
//                   );
//                 }
//               )}
//               <Button
//                 color="secondary"
//                 onClick={() => {
//                   let newField = createInitialValues(customField.fields, "");

//                   arrayHelpers.push(newField);
//                 }}
//                 startIcon={<AddIcon />}
//               >
//                 Add
//               </Button>
//             </Box>
//           )}
//         </FieldArray>
//       </Box>
//     );
//   }

//   /** Render the standard field NOT an array */

//   const name = `${parentName ? `${parentName}.${index}.` : ""}${
//     customField.name
//   }`;
//   return (
//     <Field name={name}>
//       {({ field, form }: { field: any; form: any }) => {
//         return (
//           <Box width="100%" marginY="0.25rem">
//             {CustomInput(customField, field)}
//           </Box>
//         );
//       }}
//     </Field>
//   );
// };

// const CustomInput = (customField: any, formikField: any) => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [hookField, meta, hookHelpers] = useField(formikField.name);

//   const errorMessage: string = meta.touched && meta.error ? meta.error! : "";

//   switch (customField.type) {
//     case FormType.LONG_TEXT: {
//       return (
//         <TextArea
//           id={formikField.name}
//           sx={{ width: "100%" }}
//           placeholder={customField.placeholder}
//           label={customField.label}
//           helperText={customField.helperText}
//           required={customField.required}
//           InputProps={{
//             type: (customField.hide && "password") || "text",
//           }}
//           error={Boolean(errorMessage)}
//           disabled={
//             customField.editable === undefined ? false : !customField.editable
//           }
//           {...formikField}
//         />
//       );
//     }
//     case FormType.SHORT_TEXT: {
//       const errorMessage: string =
//         meta.touched && meta.error ? meta.error! : "";

//       return (
//         <TextField
//           id={formikField.name}
//           sx={{ width: "100%" }}
//           placeholder={customField.placeholder}
//           label={customField.label}
//           InputLabelProps={{
//             shrink: true,
//           }}
//           InputProps={{
//             type: (customField.hide && "password") || "text",
//           }}
//           disabled={
//             customField.editable === undefined ? false : !customField.editable
//           }
//           variant="standard"
//           required={customField.required}
//           error={Boolean(errorMessage)}
//           {...formikField}
//           helperText={
//             errorMessage ? errorMessage : customField.helperText || " "
//           }
//         />
//       );
//     }
//     case FormType.NUMBER: {
//       return (
//         <NumberField
//           id={formikField.name}
//           sx={{ width: "100%" }}
//           placeholder={customField.placeholder}
//           label={customField.label}
//           helperText={customField.helperText}
//           InputProps={{
//             type: (customField.hide && "password") || "text",
//           }}
//           required={customField.required}
//           error={errorMessage}
//           disabled={
//             customField.editable === undefined ? false : !customField.editable
//           }
//           {...formikField}
//         />
//       );
//     }
//     case FormType.SELECT: {
//       return (
//         <FormControl variant="standard" sx={{ width: "100%", m: 0 }}>
//           <InputLabel id={`${formikField.name}-label`}>
//             {customField.label}
//           </InputLabel>
//           <Select
//             id={formikField.name}
//             labelId={`${formikField.name}-label`}
//             sx={{ width: "100%" }}
//             placeholder={customField.placeholder}
//             label={customField.label}
//             disabled={
//               customField.editable === undefined ? false : !customField.editable
//             }
//             multiple={
//               customField.multiple === undefined ? false : customField.multiple
//             }
//             variant="standard"
//             required={customField.required}
//             error={Boolean(errorMessage)}
//             {...formikField}
//           >
//             {customField.options.map(
//               (option: { id: string; label: string }, i: number) => (
//                 <MenuItem key={`option-${i}`} value={option.id}>
//                   {option.label}
//                 </MenuItem>
//               )
//             )}
//           </Select>
//           <FormHelperText error={Boolean(errorMessage)}>
//             {errorMessage ? errorMessage : customField.helperText || " "}
//           </FormHelperText>
//         </FormControl>
//       );
//     }
//     case FormType.ARRAY: {
//       throw new Error("Array type not supported. This should never happen");
//     }
//     default: {
//       console.warn("Unsupported field type. Defaulting to short text field");
//       return (
//         <TextField
//           id={formikField.name}
//           variant="standard"
//           label={customField.label}
//           placeholder={customField.placeholder}
//           required={customField.required}
//           InputProps={{
//             type: (customField.hide && "password") || "text",
//           }}
//           error={Boolean(errorMessage)}
//           //@ts-ignore
//           touched={meta.touched[formikField.name as string]}
//           disabled={
//             customField.editable === undefined ? false : !customField.editable
//           }
//           helperText={
//             errorMessage ? errorMessage : customField.helperText || " "
//           }
//           {...formikField}
//         />
//       );
//     }
//   }
// };

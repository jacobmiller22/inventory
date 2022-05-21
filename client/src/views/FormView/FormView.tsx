/** Components */
import { BackButton, BasicForm } from "components";

interface FormViewProps<T> {
  fields: any;
  schema: any;
  onSubmit: (values: T) => Promise<boolean>;
  resetOnSuccess?: boolean;
}

const FormView = <V extends object>({
  fields,
  schema,
  onSubmit,
  resetOnSuccess,
}: FormViewProps<V>) => {
  if (!fields) {
    return <div>temploading</div>;
  }

  return (
    <div>
      <br />
      <BackButton variant="text" />
      <br />
      <br />
      <BasicForm
        fields={fields}
        schema={schema}
        onSubmit={onSubmit}
        resetOnSuccess={resetOnSuccess}
      />
    </div>
  );
};

export default FormView;

/** Components */
import { BackButton, BasicForm, Loader } from "components";

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
    return <Loader />;
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

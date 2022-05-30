/** Components */
import { BackButton, BasicForm } from "components";
import Loader from "components/Loader";

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
    return <Loader size={24} />;
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

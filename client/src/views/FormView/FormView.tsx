/** Components */
import { BackButton, BasicForm } from "components";

interface FormViewProps<T> {
  fields: any;
  schema: any;
  onSubmit: (values: T) => Promise<boolean>;
}

const FormView = <V extends object>({
  fields,
  schema,
  onSubmit,
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
      <BasicForm fields={fields} schema={schema} onSubmit={onSubmit} />
    </div>
  );
};

export default FormView;

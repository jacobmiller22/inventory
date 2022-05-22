import fields from "./fields";
import schema from "./schema";
/** Interfaces/types */

import { BasicForm } from "components";
import AuthView from "../AuthView";
import { signup } from "api/auth";

/** components */

interface SignupViewProps {}

const SignupView = ({}: SignupViewProps) => {
  const handleSubmit = async (values: any): Promise<boolean> => {
    console.log(values);
    const user: any | null = await signup(values);
    return Boolean(user);
  };

  return (
    <AuthView>
      <BasicForm
        fields={fields}
        resetOnSuccess={false}
        onSubmit={handleSubmit}
        schema={schema}
      />
    </AuthView>
  );
};

export default SignupView;

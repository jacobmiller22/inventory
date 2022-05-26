import fields from "./fields";
import schema from "./schema";
/** Interfaces/types */

import { BasicForm } from "components";
import AuthView from "../AuthView";
import { signup } from "api/auth";
import { useAuth } from "contexts/auth";

/** components */

const SignupView = () => {
  const { checkAuth } = useAuth();

  const handleSubmit = async (values: any): Promise<boolean> => {
    const user: any | null = await signup(values);
    checkAuth();
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

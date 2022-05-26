import fields from "./fields";
import schema from "./schema";
import { login } from "api/auth";
/** Interfaces/types */

import { BasicForm } from "components";
import AuthView from "../AuthView";
import { useAuth } from "contexts/auth";

/** components */

const LoginView = () => {
  const { checkAuth } = useAuth();
  const handleSubmit = async (values: any): Promise<boolean> => {
    const token = await login(values);
    if (token) {
      checkAuth();
    }
    return Boolean(token);
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

export default LoginView;

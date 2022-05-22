import fields from "./fields";
import schema from "./schema";
import { login } from "api/auth";
/** Interfaces/types */

import { BasicForm } from "components";
import AuthView from "../AuthView";
import axios from "axios";
import { useAuth } from "contexts/auth";

/** components */

interface LoginViewProps {}

const LoginView = ({}: LoginViewProps) => {
  const { checkAuth } = useAuth();
  const handleSubmit = async (values: any): Promise<boolean> => {
    console.log(values);

    const token = await login(values);
    console.log("token", token);
    if (token) {
      checkAuth();
    }
    return Boolean(token);
  };
  // axios.interceptors
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

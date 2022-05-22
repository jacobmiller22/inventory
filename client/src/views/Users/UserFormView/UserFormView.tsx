import fieldsTemplate from "./fields";
import schema from "./schema";
import { useParams, useNavigate } from "react-router-dom";
/** Interfaces/types */
import { UserId, User } from "interfaces/user";

/** components */
import { useEffect, useState } from "react";
import { BasicForm } from "components";
import FormView from "views/FormView";
import { getUser } from "api/users";

type Params = {
  userId?: UserId;
};

interface IUserFormViewProps {}

const UserFormView = ({}: IUserFormViewProps) => {
  const params: Params = useParams();

  const [fields, setFields] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      // No route params.. This is the new location route
      setFields(fieldsTemplate);
      return;
    }

    // Route params.. this is the edit user route
    if (!user) return; // Populate fields once we have a user

    const newFields: any[] = populateFields(user);
    setFields(newFields);
  }, [params, user]);

  useEffect(() => {
    if (!params.userId) return;

    (async () => {
      setUser(await getUser(params.userId!));
    })();
  }, [params]);

  const handleSubmit = async (values: any): Promise<boolean> => {
    // const user: any | null = await signup(values);
    // return Boolean(user);
    console.log(values);
    return true;
  };

  return (
    <FormView
      fields={fields}
      resetOnSuccess={false}
      onSubmit={handleSubmit}
      schema={schema}
    />
  );
};

export default UserFormView;

const populateFields = (user: User) => {
  let newTemplate = [...fieldsTemplate];
  if (Boolean(user)) {
    newTemplate = newTemplate.filter(
      (field) => field.name !== "password" && field.name !== "confirm"
    );
  }
  return newTemplate.map((field) => {
    //@ts-expect-error
    return { ...field, initialValue: user[field.name] };
  });
};

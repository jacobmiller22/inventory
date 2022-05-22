import fieldsTemplate from "./fields";
import { editSchema, newSchema } from "./schema";
import { useParams, useNavigate } from "react-router-dom";
/** Interfaces/types */
import { UserId, User } from "interfaces/user";

/** components */
import { useEffect, useState } from "react";
import { BasicForm } from "components";
import FormView from "views/FormView";
import { getUser, updateUser, createUser } from "api/users";
import _ from "lodash";

type Params = {
  userId?: UserId;
};

interface IUserFormViewProps {}

const UserFormView = ({}: IUserFormViewProps) => {
  const params: Params = useParams();

  const [fields, setFields] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const isEdit = Boolean(params.userId);

  useEffect(() => {
    if (!isEdit) {
      // No route params.. This is the new location route
      setFields(fieldsTemplate);
      return;
    }

    // Route params.. this is the edit user route
    if (!user) return; // Populate fields once we have a user

    const newFields: any[] = populateFields(user);
    console.log("newFields", newFields);
    setFields(newFields);
  }, [params, user]);

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      setUser(await getUser(params.userId!));
    })();
  }, [params]);

  const handleSubmit = async (
    values:
      | Omit<User, "userId">
      | (Omit<User, "userId"> & { password: string; confirm: string })
  ): Promise<boolean> => {
    console.log("Submit!", values);
    // Create the item if we are on the new item route, otherwise update the item

    if (isEdit) {
      // This is an existing item
      return await __updateUser(params.userId!, values);
    }

    // This is a new item
    return await __createUser(
      values as Omit<User, "userId"> & { password: string; confirm: string }
    );
  };

  return (
    <FormView
      fields={fields}
      resetOnSuccess={false}
      onSubmit={handleSubmit}
      schema={isEdit ? editSchema : newSchema}
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

const __createUser = async (
  values: Omit<User, "userId"> & { password: string }
): Promise<boolean> => {
  const { username, email, firstName, lastName, profileSrc, roles, password } =
    values;

  const newUser: Omit<User, "userId"> & { password: string } = {
    username,
    email,
    firstName,
    lastName,
    profileSrc,
    roles,
    password,
  };

  const userId: UserId | null = await createUser(newUser);

  return Boolean(userId);
};

const __updateUser = async (
  userId: UserId,
  values: Omit<User, "userId">
): Promise<boolean> => {
  const { username, email, firstName, lastName, profileSrc, roles } = values;

  const newUser: Omit<User, "userId"> = {
    username,
    email,
    firstName,
    lastName,
    profileSrc,
    roles,
  };

  console.log("Update Item!", newUser);

  const success: boolean = await updateUser(userId, newUser);

  return success;
};

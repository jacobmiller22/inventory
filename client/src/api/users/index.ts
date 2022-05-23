import { setAuthorizationHeader } from "api/auth";
import axios from "axios";
import { MinUser, User, UserId } from "interfaces/user";

/** Locations */

const userApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/users`,
  withCredentials: true,
});

const adminUserApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/admin/users`,
  withCredentials: true,
});

userApi.interceptors.request.use(setAuthorizationHeader);

adminUserApi.interceptors.request.use(setAuthorizationHeader);

export const getUsers = async (): Promise<MinUser[]> => {
  const res = await userApi.get("/");

  console.log(res);

  const locations: MinUser[] = res.data;

  return locations;
};

export const getUser = async (id: UserId): Promise<User | null> => {
  if (!id || typeof id !== "string") {
    throw "getLocation expects a string locationId";
  }
  const res = await userApi.get(`/${id}`);

  console.log(res);

  const location: User = res.data;

  return location;
};

export const createUser = async (
  user: Omit<User, "userId">
): Promise<UserId | null> => {
  const res = await adminUserApi.post("/", user);

  console.log(res);
  const userId: UserId = res.data;

  if (!userId) {
    return null;
  }
  return userId;
};

export const updateUser = async (
  id: UserId,
  fields: Partial<Omit<User, "userId">>
): Promise<boolean> => {
  try {
    const res = await adminUserApi.put(`/${id}`, fields);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteUser = async (id: UserId): Promise<boolean> => {
  try {
    await adminUserApi.delete(`/${id}`);

    return true;
  } catch (err) {
    console.log("error", err);
    return false;
  }
};

export const deleteUsers = async (ids: UserId[]): Promise<boolean> => {
  // Temporary solution until bulk delete is available from API
  const successArr = await Promise.all(
    ids.map(async (id: UserId) => {
      return await deleteUser(id);
    })
  );
  console.log(
    "deleteUsers",
    successArr,
    successArr.every((el) => el === true)
  );

  return successArr.every((el) => el === true);
};

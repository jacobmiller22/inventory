import { setAuthorizationHeader } from "api/auth";
import axios from "axios";
import { MinUser, User, UserId } from "interfaces/user";

/** Locations */

const userApi = axios.create({
  baseURL: `${process.env.DOCKER ? "/api" : "http://localhost:8080"}/v1/users`,
  // withCredentials: true,
});

const adminUserApi = axios.create({
  baseURL: `${
    process.env.DOCKER ? "/api" : "http://localhost:8080"
  }/v1/admin/users`,
  // withCredentials: true,
});

userApi.interceptors.request.use(setAuthorizationHeader);

adminUserApi.interceptors.request.use(setAuthorizationHeader);

export const getUsers = async (): Promise<MinUser[] | null> => {
  try {
    const res = await userApi.get("/");
    const locations: MinUser[] = res.data;
    return locations;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUser = async (id: UserId): Promise<User | null> => {
  try {
    const res = await userApi.get(`/${id}`);
    const location: User = res.data;
    return location;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createUser = async (
  user: Omit<User, "userId">
): Promise<UserId | null> => {
  try {
    const res = await adminUserApi.post("/", user);
    const userId: UserId = res.data;
    return userId;
  } catch (err) {
    console.error(err);
    return null;
  }
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
    console.error(err);
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

  return successArr.every((el) => el === true);
};

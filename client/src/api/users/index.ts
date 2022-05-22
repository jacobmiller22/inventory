import { setAuthorizationHeader } from "api/auth";
import axios from "axios";
import { MinUser, User, UserId } from "interfaces/user";

/** Locations */

const userApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/users`,
  withCredentials: true,
});

userApi.interceptors.request.use(setAuthorizationHeader);

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
  location: Omit<User, "locationId">
): Promise<UserId | null> => {
  const res = await userApi.post("/", location);

  console.log(res);
  const locationId: UserId = res.data;

  if (!locationId) {
    return null;
  }
  return locationId;
};

export const updateUser = async (
  id: UserId,
  fields: Partial<Omit<User, "items" | "locationId">>
): Promise<boolean> => {
  try {
    const res = await userApi.put(`/${id}`, fields);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteUser = async (id: UserId): Promise<boolean> => {
  try {
    const res = await userApi.delete(`/${id}`);

    return res.data;
  } catch (err) {
    return false;
  }
};

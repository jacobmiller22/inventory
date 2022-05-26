import axios from "axios";

const authApi = axios.create({
  baseURL: `/api/auth`,
});

type LoginPayload = {
  username: string;
  password: string;
};

export const login = async ({
  username,
  password,
}: LoginPayload): Promise<string | null> => {
  try {
    const res = await authApi.post("/login", { username, password });
    window.localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (err) {
    return null;
  }
};

type SignupPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export const signup = async (payload: SignupPayload): Promise<any | null> => {
  try {
    const res = await authApi.post("/signup", payload);
    window.localStorage.setItem("user", JSON.stringify(res.data));

    return res.data;
  } catch (err) {
    return null;
  }
};

export const setAuthorizationHeader = (req: any) => {
  const user: { token: string } | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (user?.token) {
    // @ts-ignore
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
};

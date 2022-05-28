import axios from "axios";

const authApi = axios.create({
  baseURL: `${process.env.DOCKER ? "/api" : "http://localhost:8080"}/auth`,
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

export const validateToken = async (): Promise<boolean> => {
  try {
    const res = await authApi.post("/validate");
    //
    console.log(res);
    return true;
  } catch (err) {
    window.localStorage.removeItem("user");
    return false;
  }
};

export const setAuthorizationHeader = (
  req: any & { headers: { Authorization: string } }
) => {
  const user: { token: string } | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
};

authApi.interceptors.request.use(setAuthorizationHeader);

import authService from "@/services/auth";
import { HttpStatus } from "@/types/http";
import { Middleware } from "@/types";
import { Role, UserPending } from "@/types/user";

const login: Middleware = async (req, res) => {
  const { username, password } = req.body;

  const userWithToken = await authService.login({ username, password });
  console.log("userWithToken", userWithToken);
  if (!userWithToken || !userWithToken.token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid login" });
    return;
  }

  res.status(HttpStatus.OK).json(userWithToken);
  return;
};

const signup: Middleware = async (req, res) => {
  const { username, password, email } = req.body;

  const newUser: UserPending = {
    email,
    username,
    password,
    roles: [Role.USER],
  };

  console.log("newUser", newUser);

  const newUserSanitized = await authService.signup(newUser);

  if (!newUserSanitized) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occured while creating new user" });
    return;
  }

  console.log("Attempting to login after signup");

  /** User has been successfully created, signin the user */

  const userWithToken = await authService.login({
    username: newUserSanitized.username,
    password,
  });

  if (!userWithToken || !userWithToken.token) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while logging in." });
    return;
  }

  res.status(HttpStatus.OK).json({ token: userWithToken.token });
  return;
};

export default {
  login,
  signup,
};

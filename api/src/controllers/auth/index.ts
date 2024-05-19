import authService from "@/services/auth";
import { HttpStatus } from "@/types/http";
import { Middleware } from "@/types";
import { Role, UserPending } from "@/types/user";

const login: Middleware = async (req, res) => {
  const { username, password } = req.body;

  const userWithToken = await authService.login({ username, password });

  if (!userWithToken || !userWithToken.token) {
    res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid login" });
    return;
  }

  // res.cookie("jwt", userWithToken.token, {
  //   httpOnly: false,
  //   secure: true,
  //   maxAge: 3600000,
  // });

  res.status(HttpStatus.OK).json(userWithToken);
  return;
};

const signup: Middleware = async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  console.log("SIGNING UP", req.body);
  const newUser: UserPending = {
    email,
    username,
    password,
    roles: [Role.USER],
    firstName,
    lastName,
  };

  const newUserSanitized = await authService.signup(newUser);

  if (!newUserSanitized) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occured while creating new user" });
    return;
  }

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

  res.status(HttpStatus.OK).json(userWithToken);
  return;
};

const requestPasswordChange: Middleware = async (req, res) => {
  const { email } = req.body;
  const success = await authService.requestPasswordChange(email);

  if (!success) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while sending password change information" });
    return;
  }

  res.status(HttpStatus.OK).end();
  return;
};

export default {
  login,
  signup,
  requestPasswordChange,
};

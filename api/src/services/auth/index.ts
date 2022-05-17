import usersService from "../users";
import config from "../../config.json";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  MinUser,
  User,
  UserConfidential,
  UserConfidentialPending,
  UserPending,
} from "../../types/user";

type LoginArgs = {
  username: string;
  password: string;
};

const login = async ({ username, password }: LoginArgs) => {
  /** Login a user if they are not authenticated and renew their token if they are already authenticated */

  const { _id: id }: MinUser =
    (await usersService.getUserByUsername(username)) || ({} as MinUser);

  if (!id) {
    return null;
  }

  const user: UserConfidential | null = await usersService.getUserConfidential(
    id
  );

  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.hash);

  if (!isMatch) {
    return null;
  }

  const sanitizedUser = usersService.__sanitizeUser(user);

  const token = createToken(sanitizedUser);

  return {
    ...sanitizedUser,
    token,
  };
};

const signup = async (user: UserPending): Promise<MinUser | null> => {
  /** Make sure the user doesn't exist already */

  const newUserID: string | null = await usersService.createUser(user);

  // Check if the user was created successfully
  if (!newUserID) {
    return null;
  }

  // If the user was created successfully, return the user object
  const newUser = await usersService.getUser(newUserID);

  return newUser;
};

/**
 * Hashes the given password and salts it with bcrypt.
 * @param {*} password
 */
export const saltHashPassword = async (password: string): Promise<string> => {
  const saltRounds = config.saltRounds;
  return await bcrypt.hash(password, saltRounds);
};

const createToken = (user: User): string => {
  const token: string = jwt.sign(
    { sub: user._id, roles: user.roles },
    config.secret,
    {
      expiresIn: config.tokenExpiration,
    }
  );

  return token;
};

export default {
  login,
  signup,
};

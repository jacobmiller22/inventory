import validate from "validator";
import { v4 as uuid } from "uuid";
import { saltHashPassword } from "../auth";
import {
  MinUser,
  User,
  UserConfidential,
  UserPending,
  UserUpdate,
} from "../../interfaces/user";
import { User as UserModel } from "../../models";

const getUser = async (userId: string): Promise<User | null> => {
  const isValid = validate.isUUID(userId);

  if (!isValid) {
    return null;
  }

  const user: User = await UserModel.findById(userId).select([
    "_id",
    "username",
    "roles",
    "email",
    "createdAt",
    "wonBids",
    "profileSrc",
  ]);

  if (!user) {
    return null;
  }

  return __sanitizeUser(user);
};

const getMinUser = async (userId: string): Promise<MinUser | null> => {
  const isValid = validate.isUUID(userId);

  if (!isValid) {
    return null;
  }

  const user: MinUser = await UserModel.findById(userId).select([
    "_id",
    "username",
    "wonBids",
    "profileSrc",
  ]);

  if (!user) {
    return null;
  }

  return __sanitizeMinUser(user);
};

/**
 *
 * Get confidential information about a user
 *
 * @param {UserConfidential} userId
 * @returns
 */
const getUserConfidential = async (
  userId: string
): Promise<UserConfidential | null> => {
  const isValid: boolean = validate.isUUID(userId);

  if (!isValid) {
    return null;
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    return null;
  }

  return user;
};

const getUserByEmail = async (email: string): Promise<MinUser | null> => {
  const user = await UserModel.findOne({ email }).select([
    "_id",
    "username",
    "profileSrc",
    "wonBids",
  ]);

  if (!user) {
    return null;
  }

  //@ts-ignore
  return __sanitizeMinUser(user);
};

const getUserByUsername = async (username: string): Promise<MinUser | null> => {
  const user = await UserModel.findOne({ username }).select([
    "_id",
    "username",
    "wonBids",
    "profileSrc",
  ]);

  if (!user) {
    return null;
  }

  //@ts-ignore
  return __sanitizeMinUser(user);
};

const getUsers = async (): Promise<User[]> => {
  const users: User[] =
    (await UserModel.find().select([
      "_id",
      "username",
      "roles",
      "email",
      "createdAt",
      "wonBids",
      "profileSrc",
    ])) ?? [];

  return users.map((user: User) => __sanitizeUser(user));
};

const getMinUsers = async (): Promise<MinUser[]> => {
  const users: User[] =
    (await UserModel.find().select(["_id", "username", "profileSrc"])) ?? [];

  return users.map((user: MinUser) => __sanitizeMinUser(user));
};

/**
 * Creates a new user and returns the userId
 *
 * @param user user to be created
 * @returns the _id of the user created or null if an error occured.
 */
const createUser = async (user: UserPending): Promise<string | null> => {
  const createdAt = new Date().getTime();

  const newUser: Partial<UserConfidential> = {
    _id: uuid(),
    createdAt,
    username: user.username,
    email: user.email,
    hash: await saltHashPassword(user.password),
    roles: user.roles,
  };

  const createdUser = new UserModel(newUser); // Create a new UserModel instance
  try {
    await createdUser.save(); // Save the user to the database, TODO: handle errors
  } catch (err) {
    console.error("Error occured whilist creating user", err);
    return null;
  }

  // Return the ID of the newly created user
  return newUser._id!;
};

/**
 * Deletes a user from the database
 * @param userId the _id of the user to be deleted
 * @returns true or false depending on if the user was deleted or not
 */
const deleteUser = async (userId: string): Promise<boolean> => {
  const isValid = validate.isUUID(userId);

  if (!isValid) {
    return false;
  }

  const user = await UserModel.findByIdAndRemove(userId);

  if (!user) {
    return false;
  }

  return true;
};

/**
 * Updates a user in the database, cannot update the password
 * @param userId the _id of the user to be updated
 * @param newUserData the new data to be updated
 */
const updateUser = async (
  userId: string,
  newUserData: Partial<UserUpdate>
): Promise<User | null> => {
  const { username, email, roles, profileSrc } = newUserData;

  try {
    const newUser = await UserModel.findByIdAndUpdate(userId, {
      username,
      email,
      roles,
      profileSrc,
    });

    return __sanitizeUser(newUser);
  } catch (err) {
    console.error("Error occured while updating user", err);
    return null;
  }
};

export const __sanitizeMinUser = (
  user: User | MinUser | UserConfidential
): MinUser => {
  const sanitizedUser = {
    _id: user._id,
    username: user.username,

    profileSrc: user.profileSrc,
  };

  return sanitizedUser;
};

export const __sanitizeUser = (user: User | UserConfidential): User => {
  const sanitizedUser = {
    ...__sanitizeMinUser(user),
    roles: user.roles,
    email: user.email,
    createdAt: user.createdAt,
  };

  return sanitizedUser;
};

export default {
  getUser,
  getMinUser,
  getUserByEmail,
  getUserByUsername,
  getUsers,
  getMinUsers,
  getUserConfidential,
  createUser,
  deleteUser,
  updateUser,

  __sanitizeMinUser,
  __sanitizeUser,
};

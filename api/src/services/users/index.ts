import validate from "validator";
import { v4 as uuid } from "uuid";
import { saltHashPassword } from "@/services/auth";
import {
  MinUser,
  User,
  ConfidentialUser,
  UserDocument,
  UserId,
  UserPending,
  UserUpdate,
  Role,
} from "@/types/user";
import { User as UserModel } from "@/models";

let __IS_NO_USERS_CREATED: boolean = true; // A flag to indicate if users have been created, used to create the admin user as the first user

const getMinUser = async (userId: string): Promise<MinUser | null> => {
  const isValid = validate.isUUID(userId);

  if (!isValid) {
    return null;
  }

  const user:
    | null
    | (UserDocument & {
        toObject: () => UserDocument;
      }) = await UserModel.findById(userId).select([
    "_id",
    "username",
    "profileSrc",
    "roles",
  ]);

  if (!user) {
    return null;
  }

  return userDoc2MinUser(user.toObject());
};

const getUserByEmail = async (email: string): Promise<MinUser | null> => {
  const user:
    | null
    | (UserDocument & {
        toObject: () => UserDocument;
      }) = await UserModel.findOne({ email }).select([
    "_id",
    "username",
    "profileSrc",
    "roles",
  ]);

  if (!user) {
    return null;
  }

  return userDoc2MinUser(user.toObject());
};

const getUserByUsername = async (username: string): Promise<MinUser | null> => {
  const user:
    | null
    | (UserDocument & {
        toObject: () => UserDocument;
      }) = await UserModel.findOne({ username }).select([
    "_id",
    "username",
    "profileSrc",
    "roles",
  ]);

  if (!user) {
    return null;
  }

  return userDoc2MinUser(user.toObject());
};

const getUser = async (userId: string): Promise<User | null> => {
  const user:
    | null
    | (UserDocument & {
        toObject: () => UserDocument;
      }) = await UserModel.findById(userId).select([
    "_id",
    "username",
    "roles",
    "email",
    "createdAt",
    "profileSrc",
  ]);

  if (!user) {
    return null;
  }

  return userDoc2User(user.toObject());
};

/**
 * Get confidential information about a user
 * @param {ConfidentialUser} userId
 * @returns
 */
const getUserConfidential = async (
  userId: string
): Promise<ConfidentialUser | null> => {
  const user:
    | null
    | (UserDocument & {
        toObject: () => UserDocument;
      }) = await UserModel.findById(userId);

  if (!user) {
    return null;
  }

  return userDoc2ConfidentialUser(user.toObject());
};

const getMinUsers = async (): Promise<MinUser[]> => {
  const users: (UserDocument & {
    toObject: () => UserDocument;
  })[] =
    (await UserModel.find().select([
      "_id",
      "username",
      "profileSrc",
      "roles",
    ])) ?? [];

  return users.map(
    (
      user: UserDocument & {
        toObject: () => UserDocument;
      }
    ) => userDoc2MinUser(user.toObject())
  );
};

const getUsers = async (): Promise<User[]> => {
  const users: (UserDocument & {
    toObject: () => UserDocument;
  })[] =
    (await UserModel.find().select([
      "_id",
      "username",
      "roles",
      "email",
      "createdAt",
      "profileSrc",
    ])) ?? [];

  return users.map(
    (
      user: UserDocument & {
        toObject: () => UserDocument;
      }
    ) => userDoc2User(user.toObject())
  );
};

/**
 * Creates a new user and returns the userId
 *
 * @param user user to be created
 * @returns the _id of the user created or null if an error occured.
 */
const createUser = async (user: UserPending): Promise<string | null> => {
  const createdAt = new Date().getTime();

  const userId = `u_${uuid()}`;

  const roles = __IS_NO_USERS_CREATED ? [Role.ADMIN, Role.USER] : user.roles; // If no users have been created, the first user created is the admin user

  const newUser: Omit<UserDocument, "profileSrc" | "__v"> = {
    _id: userId,
    createdAt,
    username: user.username,
    email: user.email,
    hash: await saltHashPassword(user.password),
    roles,
  };

  const createdUser = new UserModel(newUser); // Create a new UserModel instance
  try {
    await createdUser.save(); // Save the user to the database, TODO: handle errors

    if (__IS_NO_USERS_CREATED) {
      // If no users have been created, the first user created is the admin user, so set the flag to false since we have created a user
      __IS_NO_USERS_CREATED = false;
    }

    // Return the ID of the newly created user
    return userId!;
  } catch (err) {
    console.error("Error occured whilist creating user", err);
    return null;
  }
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

/**
 * Deletes a user from the database
 * @param id the userId of the user to be deleted
 * @returns true or false depending on if the user was deleted or not
 */
const deleteUser = async (id: UserId): Promise<boolean> => {
  try {
    await UserModel.findByIdAndRemove(id);
    return true;
  } catch (err) {
    return false;
  }
};

export const __sanitizeMinUser = (user: any): MinUser => {
  const sanitizedUser = {
    userId: user.userId,
    username: user.username,
    roles: user.roles,
    profileSrc: user.profileSrc,
  };

  return sanitizedUser;
};

export const userDoc2MinUser = (user: UserDocument): MinUser => {
  const { _id, username, profileSrc, roles } = user;

  return {
    userId: _id,
    username,
    profileSrc,
    roles,
  };
};

export const userDoc2User = (user: UserDocument): User => {
  const { email, createdAt } = user;

  return {
    ...userDoc2MinUser(user),
    email,
    createdAt,
  };
};

export const userDoc2ConfidentialUser = (
  user: UserDocument
): ConfidentialUser => {
  const { hash } = user;

  return {
    ...userDoc2User(user),
    hash,
  };
};

export const __sanitizeUser = (user: User | ConfidentialUser): User => {
  const sanitizedUser = {
    ...__sanitizeMinUser(user),
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

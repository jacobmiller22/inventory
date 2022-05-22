import type { Request, Response } from "express";
import validator from "validator";
import { HttpStatus } from "@/types/http";
import {
  isValidUserId,
  MinUser,
  Role,
  User,
  UserId,
  UserPending,
} from "@/types/user";
import usersService from "@/services/users";
import { removeUndefined } from "@/lib/validators";

/**
 * Get user by id, contains some private information
 */
const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!isValidUserId(userId)) {
    res.status(HttpStatus.BAD_REQUEST).send("Invalid userId");
    return;
  }

  const user: User | null = await usersService.getUser(userId);

  if (!user) {
    res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    return;
  }

  res.status(HttpStatus.OK).json(user);
  return;
};

/**
 * Returns a list of users with minimal public information
 */
const getMinUsers = async (req: Request, res: Response): Promise<void> => {
  const users: MinUser[] = await usersService.getMinUsers();

  if (!users || !Array.isArray(users)) {
    res.status(HttpStatus.NOT_FOUND).json({ message: "Users not found" });
    return;
  }

  res.status(HttpStatus.OK).json(users);
};

/**
 * Accepts a user object and creates it
 */
const createUser = async (req: Request, res: Response): Promise<void> => {
  const user: any = req.body;

  if (typeof user !== "object") {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Body must be an object" });
    return;
  }

  let sanitizedUser: UserPending;

  try {
    if (!user.email || !validator.isEmail(user.email)) {
      throw new Error("Invalid email");
    }
    if (!user.username || typeof user.username !== "string") {
      throw new Error("Invalid username");
    }
    if (!user.password || typeof user.password !== "string") {
      throw new Error("Invalid password");
    }
    if (!user.roles || !Array.isArray(user.roles)) {
      throw new Error("Invalid roles. Roles must be an array");
    }
    if (!user.firstName || typeof user.firstName !== "string") {
      throw new Error("Invalid firstName");
    }
    if (!user.lastName || typeof user.lastName !== "string") {
      throw new Error("Invalid lastName");
    }
    sanitizedUser = {
      email: user.email,
      username: user.username,
      password: user.password,
      roles: user.roles,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: err });
    return;
  }

  if (!sanitizedUser) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Error while creating user" });
    return;
  }

  const newUserId = await usersService.createUser(sanitizedUser);

  if (newUserId === null) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Users not created" });
    return;
  }

  res.status(HttpStatus.OK).send(newUserId);
  return;
};

/**
 * Accepts a list of user objects and creates them
 */
const createUsers = async (req: Request, res: Response): Promise<void> => {
  const users: any[] = req.body;

  if (!users || !Array.isArray(users)) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Body must be an array of user objects to create" });
    return;
  }

  let sanitizedUsers: UserPending[] = [];

  try {
    sanitizedUsers = users.map((user: any, i: number) => {
      if (!user.email || !validator.isEmail(user.email)) {
        throw new Error(`Invalid email at index ${i}`);
      }
      if (!user.username || typeof user.username !== "string") {
        throw new Error(`Invalid username at index ${i}`);
      }
      if (!user.password || typeof user.password !== "string") {
        throw new Error(`Invalid password at index ${i}`);
      }
      if (!user.roles || !Array.isArray(user.roles)) {
        throw new Error(`Invalid roles at index ${i}. Roles must be an array`);
      }
      if (!user.firstName || typeof user.firstName !== "string") {
        throw new Error(`Invalid firstName at index ${i}`);
      }
      if (!user.lastName || typeof user.lastName !== "string") {
        throw new Error(`Invalid lastName at index ${i}`);
      }
      return {
        email: user.email,
        username: user.username,
        password: user.password,
        roles: user.roles,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    });
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: err });
    return;
  }

  const newUserIdsSanitized = await Promise.all(
    sanitizedUsers.map(
      async (newUser: UserPending) => await usersService.createUser(newUser)
    )
  );

  if (!newUserIdsSanitized || !Array.isArray(newUserIdsSanitized)) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Users not created" });
    return;
  }

  res.status(HttpStatus.OK).json(newUserIdsSanitized);
  return;
};

/**
 * Delete user by id
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  const success: boolean = await usersService.deleteUser(userId);

  if (!success) {
    res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    return;
  }

  res.status(HttpStatus.CREATED).end();
};

const updateUserEmail = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!isValidUserId(userId)) {
    res.status(HttpStatus.BAD_REQUEST).send("Invalid userId");
  }

  const { email }: { email: string } = req.body;
  if (!email || !validator.isEmail(email)) {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid email" });
    return;
  }
  const user: User | null = await usersService.updateUser(userId, { email });

  if (!user) {
    res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    return;
  }

  res.status(HttpStatus.CREATED).end();
};

const updateUserPicture = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  if (!isValidUserId(userId)) {
    res.status(HttpStatus.BAD_REQUEST).send("Invalid userId");
  }

  const { src }: { src: string } = req.body;
  if (!src || typeof src !== "string") {
    res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid src" });
    return;
  }
  const user: User | null = await usersService.updateUser(userId, {
    profileSrc: src,
  });

  if (!user) {
    res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
    return;
  }

  res.status(HttpStatus.CREATED).end();
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId: UserId | any = req.params.userId;

  if (!isValidUserId(userId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid userId");
  }

  let newUser: Omit<User, "password" | "createdAt"> = {
    userId: req.body.locationId,
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roles: req.body.roles,
    profileSrc: req.body.profileSrc,
  };

  if (userId && !isValidUserId(userId)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("userId must be a valid userId");
  }

  if (newUser.username && typeof newUser.username !== "string") {
    return res.status(HttpStatus.BAD_REQUEST).end("Username must be a string");
  }

  if (
    newUser?.email &&
    (typeof newUser.email !== "string" || !validator.isEmail(newUser.email))
  ) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Email must be a string and valid");
  }

  if (newUser.firstName && typeof newUser.firstName !== "string") {
    return res.status(HttpStatus.BAD_REQUEST).end("firstName must be a string");
  }

  if (newUser.lastName && typeof newUser.lastName !== "string") {
    return res.status(HttpStatus.BAD_REQUEST).end("lastName must be a string");
  }

  if (newUser.roles && !Array.isArray(newUser.roles)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Roles must be an array");
  }

  // Verify correct roles structure
  if (
    newUser.roles &&
    (newUser.roles as any[]).some((role) => role !== "admin" && role !== "user")
  ) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Provided at least one invalid role");
  }

  if (newUser.profileSrc && typeof newUser.profileSrc !== "string") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("profileSrc must be a string");
  }

  /** Remove undefined values from newLocation object */
  newUser = removeUndefined(newUser);

  if (Object.keys(newUser).length === 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("None of the given fields are valid");
  }

  const success = await usersService.updateUser(userId, newUser);

  console.log(success);
  console.log(newUser);

  if (!success) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    return;
  }

  res.status(HttpStatus.OK).json(true);
  return;
};

export default {
  getUser,
  getMinUsers,
  deleteUser,
  updateUserEmail,
  updateUser,
  createUser,
  createUsers,
  updateUserPicture,
};

import type { Request, Response } from "express";
import validator from "validator";
import { HttpStatus } from "@/types/http";
import { isValidUserId, MinUser, Role, User, UserPending } from "@/types/user";
import usersService from "@/services/users";

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

export default {
  getUser,
  getMinUsers,
  deleteUser,
  updateUserEmail,
  createUsers,
  updateUserPicture,
};

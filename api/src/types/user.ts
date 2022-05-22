import { Document } from "./mongo";
import validate from "validator";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type UserId = string;

export interface UserPending {
  username: string;
  email: string;
  password: string;
  roles: Role[];
  firstName: string;
  lastName: string;
}

/**
 * Represents a user object that contains only public information.
 */
export interface MinUser {
  userId: UserId;
  username: string;
  profileSrc: string;
  roles: Role[];
}

/**
 * Represents a user object that contains more information, some of which is not necessarily public.
 */
export interface User extends MinUser {
  createdAt: number;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Represents a user that has been created in the database. Biggest difference between this and the UserConfidentialPending
 * is that this one's password is hashed.
 */
export interface ConfidentialUser extends User {
  hash: string;
}

/**
 * Represents a user that is about to be created in the database. Biggest difference between this and the UserConfidential
 * is that this one's password is not hashed.
 */
export interface UserConfidentialPending extends User {
  password: string;
}

export interface UserUpdate extends Omit<User, "createdAt" | "_id"> {}

export interface UserDocument extends Document {
  _id: UserId;
  username: string;
  email: string;
  roles: Role[];
  createdAt: number;
  profileSrc: string;
  hash: string;
  firstName: string;
  lastName: string;
}

export const isValidUserId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("u_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface UserPending {
  username: string;
  email: string;
  password: string;
  roles: Role[];
}

/**
 * Represents a user object that contains only public information.
 */
export interface MinUser {
  _id: string;
  username: string;
  profileSrc: string;
}

/**
 * Represents a user object that contains more information, some of which is not necessarily public.
 */
export interface User extends MinUser {
  createdAt: number;
  email: string;
  roles: Role[];
}

/**
 * Represents a user that has been created in the database. Biggest difference between this and the UserConfidentialPending
 * is that this one's password is hashed.
 */
export interface UserConfidential extends User {
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

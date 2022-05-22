import { StringDecoder } from "string_decoder";

export type UserId = string;

export enum Role {
  USER = "user",
  ADMIN = "admin",
}
export interface MinUser {
  userId: UserId;
  username: string;
  profileSrc: string;
  roles: Role[];
}

export interface User extends MinUser {
  email: StringDecoder;
}

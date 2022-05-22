import { StringDecoder } from "string_decoder";

export type UserId = string;

export interface MinUser {
  userId: UserId;
  name: string;
  profileSrc: string;
}

export interface User extends MinUser {
  email: StringDecoder;
}

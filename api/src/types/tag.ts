import validate from "validator";
import { Document } from "./mongo";

export type Tag = {
  tagId: TagId;
  name: string;
};

export type TagId = string;

export interface TagDocument extends Document {
  _id: TagId;
  name: string;
}

export const isValidTagId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("t_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

import validate from "validator";

export type Tag = {
  tagId: string;
  name: string;
};

export type TagId = string;

export const isValidTagId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("t_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

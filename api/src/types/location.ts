import validate from "validator";
import { ItemId } from "./item";

export type LocationId = string;

export type Location = {
  locationId: LocationId;
  name: string;
  description: string;
  items: ItemId[];
};

export type LocationList = Omit<Location, "items">[];

export const isValidLocationId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 18 || !id.startsWith("l_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

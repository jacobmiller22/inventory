import validate from "validator";
import { ItemId } from "./item";
import { Document } from "./mongo";

export type LocationId = string;

export interface MinLocation {
  locationId: LocationId;
  name: string;
  description: string;
}

export interface Location extends MinLocation {
  items: ItemId[];
}

export type LocationList = Omit<Location, "items">[];

export interface LocationDocument extends Document {
  _id: LocationId;
  name: string;
  description: string;
  items: any[];
}

export const isValidLocationId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("l_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

import validate from "validator";
import { ItemId } from "./item";

export type LocationId = string;

export type Location = {
  locationId: LocationId;
  name: string;
  description: string;
  items: ItemId[];
};

export const verifyLocationId = (id: LocationId): boolean => {
  return true;
};

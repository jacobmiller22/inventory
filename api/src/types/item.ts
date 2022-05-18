import validate from "validator";
import { LocationId } from "./location";
import { Tag } from "./tags";

export type ItemId = string;

export interface Item {
  itemId: ItemId;
  locationId: LocationId;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  tags: Tag[];
  imgSrcs: string[];
}

export type ItemList = Omit<Item, "">[];

export interface ItemRecord extends Omit<Item, "locationId"> {
  _id: ItemId;
  _location: LocationId;
}

export const isValidItemId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("i_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

import validate from "validator";
import { LocationId, MinLocation } from "./location";
import { Document } from "./mongo";
import { Tag, TagId } from "./tag";

export type ItemId = string;

export interface MinItem {
  itemId: ItemId;
  locationId: LocationId;
  name: string;
  quantity: number;
  unit: string;
  tags: Tag[];
}
export interface Item extends Omit<MinItem, "locationId"> {
  description: string;
  imgSrcs: string[];
  location: MinLocation | null;
}

export interface ItemDocument<L = LocationId, T = TagId> extends Document {
  _id: ItemId;
  _location: L;
  name: string;
  description: string;
  quantity: 1;
  unit: string;
  _tags: T[];
  imgSrcs: string[];
}

export const isValidItemId = (id: any): boolean => {
  if (typeof id !== "string" || id.length !== 38 || !id.startsWith("i_")) {
    return false;
  }

  return validate.isUUID(id.slice(2));
};

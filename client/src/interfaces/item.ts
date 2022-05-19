import { LocationId, MinLocation } from "./location";
import { Tag } from "./tag";

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
  location: MinLocation | null;
}

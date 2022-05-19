import axios from "axios";
import { Item, ItemId, MinItem } from "interfaces/item";
import { LocationId, MinLocation } from "interfaces/location";

const locationApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/locations`,
});

export const getLocations = async (): Promise<MinLocation[]> => {
  const res = await locationApi.get("/");

  console.log(res);

  const locations: MinLocation[] = res.data;

  return locations;
};

export const getLocation = async (id: LocationId): Promise<Location | null> => {
  if (!id || typeof id !== "string") {
    throw "getLocation expects a string locationId";
  }
  const res = await locationApi.get(`/${id}`);

  console.log(res);

  const location: Location = res.data;

  return location;
};

export const createLocation = async (
  location: Omit<Location, "locationId">
): Promise<LocationId | null> => {
  return null;
};

export const updateLocation = async (
  id: LocationId,
  fields: Partial<Omit<Location, "items" | "locationId">>
): Promise<boolean> => {
  return false;
};

export const deleteLocation = async (id: LocationId): Promise<boolean> => {
  return false;
};

const itemApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/items`,
});

export const getItems = async (): Promise<MinItem[]> => {
  const res = await itemApi.get("/");
  console.log(res);

  const items: MinItem[] = res.data;

  return items;
};

export const getItem = async (id: ItemId): Promise<Item | null> => {
  if (!id || typeof id !== "string") {
    throw "getItem expects a string locationId";
  }
  const res = await itemApi.get(`/${id}`);

  console.log(res);

  const item: Item = res.data;

  return item;
};

export const createItem = async (
  item: Omit<Item, "itemId">
): Promise<ItemId | null> => {
  return null;
};

export const updateItem = async (
  id: ItemId,
  fields: Partial<Omit<Item, "itemId">>
): Promise<boolean> => {
  return false;
};

export const deleteItem = async (id: ItemId): Promise<boolean> => {
  return false;
};

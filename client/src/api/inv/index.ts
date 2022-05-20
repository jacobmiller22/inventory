import axios from "axios";
import { Item, ItemId, MinItem } from "interfaces/item";
import { LocationId, MinLocation, Location } from "interfaces/location";
import { Tag, TagId } from "interfaces/tag";
import { HttpStatus } from "lib/http";

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
  try {
    const res = await itemApi.get(`/${id}`);

    console.log(res);

    const item: Item = res.data;

    return item;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const createItem = async (
  item: Omit<MinItem & Item, "itemId" | "location">
): Promise<ItemId | null> => {
  const res = await itemApi.post("/", item);

  console.log(res);
  const itemId: ItemId = res.data;

  if (!itemId) {
    return null;
  }
  return itemId;
};

export const updateItem = async (
  id: ItemId,
  fields: Partial<Omit<Item, "itemId">>
): Promise<boolean> => {
  return false;
};

export const deleteItem = async (id: ItemId): Promise<boolean> => {
  const res = await itemApi.delete(`/${id}`);

  console.log(res);

  return res.status !== HttpStatus.OK;
};

export const deleteItems = async (ids: ItemId[]): Promise<boolean> => {
  // Temporary solution until bulk delete is available from API
  await Promise.all(
    ids.map(async (id: ItemId) => {
      return await deleteItem(id);
    })
  );
  return true;
};

const tagApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/tags`,
});

export const getTags = async (): Promise<Tag[]> => {
  const res = await tagApi.get("/");
  console.log(res);

  const items: Tag[] = res.data;

  return items;
};

export const createTag = async (
  item: Omit<Tag, "tagId">
): Promise<TagId | null> => {
  return null;
};

export const updateTag = async (
  id: TagId,
  fields: Partial<Omit<Tag, "tagId">>
): Promise<boolean> => {
  return false;
};

export const deleteTag = async (id: TagId): Promise<boolean> => {
  return false;
};

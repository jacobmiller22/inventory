import { setAuthorizationHeader } from "api/auth";
import axios from "axios";
import { Item, ItemId, MinItem } from "interfaces/item";
import { LocationId, MinLocation, Location } from "interfaces/location";
import { Tag, TagId } from "interfaces/tag";
import { HttpStatus } from "lib/http";

/** Locations */

const locationApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/locations`,
  withCredentials: true,
});

locationApi.interceptors.request.use(setAuthorizationHeader);

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
  const res = await locationApi.post("/", location);

  console.log(res);
  const locationId: LocationId = res.data;

  if (!locationId) {
    return null;
  }
  return locationId;
};

export const updateLocation = async (
  id: LocationId,
  fields: Partial<Omit<Location, "items" | "locationId">>
): Promise<boolean> => {
  try {
    const res = await locationApi.put(`/${id}`, fields);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteLocation = async (id: LocationId): Promise<boolean> => {
  try {
    const res = await locationApi.delete(`/${id}`);

    return res.data;
  } catch (err) {
    return false;
  }
};

/** Items */

const itemApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/items`,
  withCredentials: true,
});

itemApi.interceptors.request.use(setAuthorizationHeader);

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
  item: Omit<MinItem & Item, "itemId" | "location" | "tags"> & { tags: TagId[] }
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
  fields: Partial<
    Omit<Item, "itemId" | "location" | "tags"> & { tags: TagId[] }
  >
): Promise<boolean> => {
  try {
    const res = await itemApi.put(`/${id}`, fields);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteItem = async (id: ItemId): Promise<boolean> => {
  try {
    const res = await itemApi.delete(`/${id}`);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteItems = async (ids: ItemId[]): Promise<boolean> => {
  // Temporary solution until bulk delete is available from API
  const successArr = await Promise.all(
    ids.map(async (id: ItemId) => {
      return await deleteItem(id);
    })
  );

  return successArr.every((el) => el === true);
};

/** Tags */

const tagApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/v1/inv/tags`,
  withCredentials: true,
});

tagApi.interceptors.request.use(setAuthorizationHeader);

export const getTags = async (): Promise<Tag[]> => {
  const res = await tagApi.get("/");
  console.log(res);

  const items: Tag[] = res.data;

  return items;
};

export const getTag = async (tagId: TagId): Promise<Tag> => {
  const res = await tagApi.get(`/${tagId}`);
  console.log(res);

  const tag: Tag = res.data;

  return tag;
};

export const createTag = async (
  tag: Omit<Tag, "tagId">
): Promise<TagId | null> => {
  const res = await tagApi.post("/", tag);

  console.log(res);
  const tagId: TagId = res.data;

  if (!tagId) {
    return null;
  }
  return tagId;
};

export const updateTag = async (
  id: TagId,
  fields: Partial<Omit<Tag, "tagId">>
): Promise<boolean> => {
  try {
    const res = await tagApi.put(`/${id}`, fields);

    return res.data;
  } catch (err) {
    return false;
  }
};

export const deleteTag = async (id: TagId): Promise<boolean> => {
  try {
    const res = await tagApi.delete(`/${id}`);

    return res.data;
  } catch (err) {
    return false;
  }
};

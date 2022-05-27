import { setAuthorizationHeader } from "api/auth";
import axios from "axios";
import { Item, ItemId, MinItem } from "interfaces/item";
import { LocationId, MinLocation, Location } from "interfaces/location";
import { Tag, TagId } from "interfaces/tag";

/** Locations */

const locationApi = axios.create({
  baseURL: `${
    process.env.DOCKER ? "/api" : "http://localhost:8080"
  }/v1/inv/locations`,
  // withCredentials: true,
});

locationApi.interceptors.request.use(setAuthorizationHeader);

export const getLocations = async (): Promise<MinLocation[] | null> => {
  try {
    const res = await locationApi.get("/");
    const locations: MinLocation[] = res.data;
    return locations;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getLocation = async (id: LocationId): Promise<Location | null> => {
  try {
    const res = await locationApi.get(`/${id}`);
    const location: Location = res.data;
    return location;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createLocation = async (
  location: Omit<Location, "locationId">
): Promise<LocationId | null> => {
  try {
    const res = await locationApi.post("/", location);
    const locationId: LocationId = res.data;
    return locationId;
  } catch (error) {
    return null;
  }
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
    await locationApi.delete(`/${id}`);
    return true;
  } catch (err) {
    return false;
  }
};
export const deleteLocations = async (ids: LocationId[]): Promise<boolean> => {
  // Temporary solution until bulk delete is available from API
  const successArr = await Promise.all(
    ids.map(async (id: ItemId) => {
      return await deleteLocation(id);
    })
  );

  return successArr.every((el) => el === true);
};

/** Items */

const itemApi = axios.create({
  baseURL: `${
    process.env.DOCKER ? "/api" : "http://localhost:8080"
  }/v1/inv/items`,
  // withCredentials: true,
});

itemApi.interceptors.request.use(setAuthorizationHeader);

export const getItems = async (): Promise<MinItem[] | null> => {
  try {
    const res = await itemApi.get("/");
    const items: MinItem[] = res.data;
    return items;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getItem = async (id: ItemId): Promise<Item | null> => {
  if (!id || typeof id !== "string") {
    throw new Error("getItem expects a string locationId");
  }
  try {
    const res = await itemApi.get(`/${id}`);
    const item: Item = res.data;
    return item;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createItem = async (
  item: Omit<MinItem & Item, "itemId" | "location" | "tags"> & { tags: TagId[] }
): Promise<ItemId | null> => {
  try {
    const res = await itemApi.post("/", item);
    const itemId: ItemId = res.data;
    return itemId;
  } catch (err) {
    console.error(err);
    return null;
  }
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
    await itemApi.delete(`/${id}`);
    return true;
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
  baseURL: `${
    process.env.DOCKER ? "/api" : "http://localhost:8080"
  }/v1/inv/tags`,
  // withCredentials: true,
});

tagApi.interceptors.request.use(setAuthorizationHeader);

export const getTags = async (): Promise<Tag[] | null> => {
  try {
    const res = await tagApi.get("/");
    const items: Tag[] = res.data;
    return items;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getTag = async (tagId: TagId): Promise<Tag | null> => {
  try {
    const res = await tagApi.get(`/${tagId}`);
    const tag: Tag = res.data;
    return tag;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createTag = async (
  tag: Omit<Tag, "tagId">
): Promise<TagId | null> => {
  try {
    const res = await tagApi.post("/", tag);
    const tagId: TagId = res.data;
    return tagId;
  } catch (err) {
    console.error(err);
    return null;
  }
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
    await tagApi.delete(`/${id}`);
    return true;
  } catch (err) {
    return false;
  }
};

export const deleteTags = async (ids: TagId[]): Promise<boolean> => {
  // Temporary solution until bulk delete is available from API
  const successArr = await Promise.all(
    ids.map(async (id: ItemId) => {
      return await deleteTag(id);
    })
  );

  return successArr.every((el) => el === true);
};

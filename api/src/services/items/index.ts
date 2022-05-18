/**
 * Item Service
 */

import { ItemId, Item, ItemRecord } from "@/types/item";
import { Item as ItemModel } from "@/models";
import { v4 as uuid } from "uuid";

const getItems = async () => {
  const items = await ItemModel.find();
  return items;
};

const getItem = async (id: ItemId) => {
  const location = await ItemModel.findById(id);
  return location;
};

const createItem = async (item: Omit<Item, "itemId">) => {
  const itemId = `i_${uuid()}`;
  let newLocation: any = { ...item, _id: itemId };

  // Replace locationId with reference to _location

  newLocation._location = newLocation.locationId;
  delete newLocation["locationId"];

  try {
    await ItemModel.create(newLocation);
    return itemId;
  } catch (err) {
    console.error("Error creating item", err);
    return null;
  }
};

const updateItem = async (id: ItemId, item: Omit<Partial<Item>, "itemId">) => {
  try {
    await ItemModel.findByIdAndUpdate(id, item);
    return true;
  } catch (err) {
    return false;
  }
};

const deleteItem = async (id: ItemId) => {
  try {
    await ItemModel.findByIdAndDelete(id);
    return true;
  } catch (err) {
    return false;
  }
};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

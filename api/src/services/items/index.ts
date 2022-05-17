/**
 * Item Service
 */

import { ItemId, Item } from "@/types/item";
import { Item as ItemModel } from "@/models";

const getItems = async () => {
  const items = await ItemModel.find();
  return items;
};

const getItem = async (id: ItemId) => {};

const createItem = async (item: Omit<Item, "itemId">) => {};

const updateItem = async (
  id: ItemId,
  item: Omit<Partial<Item>, "itemId">
) => {};

const deleteItem = async (id: ItemId) => {};

export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

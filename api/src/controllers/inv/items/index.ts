import type { Request, Response } from "express";
import { DataController } from "@/controllers/index";
import { IInventoryItem, TInventoryID } from "@/types/Inventory";
import itemsService from "@/services/items";

const getItems = async (req: Request, res: Response) => {
  /** Get all Items */

  const items = await itemsService.getItems();

  return res.status(200).json(items);
};

const getItem = async (req: Request, res: Response) => {
  /** Get a n Item */

  const id: TInventoryID = req.params?.item_id as TInventoryID;
  // console.log(req);

  const item: IInventoryItem | null = await DataController().getInventoryItem(
    id
  );

  if (item == null) {
    return res.status(400).end("Item already exists");
  }

  return res.status(200).json(item);
};

const createItem = async (req: Request, res: Response) => {
  /** Create a new Item */

  const new_item: IInventoryItem = req.body;

  const inventory_id = await DataController().createInventoryItem(new_item);

  if (inventory_id == null) {
    return res.status(400).end("Item already exists");
  }

  return res.status(201).end();
};

export default { getItems, getItem, createItem };

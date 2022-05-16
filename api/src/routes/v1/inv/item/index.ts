/**
 *
 * The entry point to the route: 'server/v1/inventory/item/
 *
 */
import type { Request, Response } from "express";
import express from "express";
import { DataController } from "@/controllers/index";
import { IInventoryItem, TInventoryID } from "@/interfaces/Inventory";

const router = express();

/**
 * @api {item} /v1/inventory/item/:item Get all details of an inventory item
 */
router.get("/:item_id", async (req: Request, res: Response) => {
  /** Create a new Item */

  const id: TInventoryID = req.params?.item_id as TInventoryID;
  // console.log(req);

  const item: IInventoryItem | null = await DataController().getInventoryItem(
    id
  );

  if (item == null) {
    return res.status(400).end("Item already exists");
  }

  return res.status(200).json(item);
});

/**
 * @api {post} /v1/inventory/ Create an inventory item
 */
router.post("/", async (req: Request, res: Response) => {
  /** Create a new Item */

  const new_item: IInventoryItem = req.body;

  const inventory_id = await DataController().createInventoryItem(new_item);

  if (inventory_id == null) {
    return res.status(400).end("Item already exists");
  }

  return res.status(201).end();
});

export default router;

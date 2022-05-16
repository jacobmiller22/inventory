/**
 *
 * The entry point to the route: 'server/v1/inventory/
 *
 */
import type { Request, Response } from "express";
import express from "express";
import { DataController } from "@/controllers/index";

import { IInventoryItemMap } from "@/interfaces/Inventory";
import itemRouter from "./item";
import locationsRouter from "./locations";
import typesRouter from "./types";

const router = express();

/**
 * @api {get} /v1/inventory/ Get the inventory
 */
router.get("/", async (req: Request, res: Response) => {
  /** Get all inventory items */

  res.setHeader("Content-Type", "application/json");
  const all: IInventoryItemMap = await DataController().getInventory();
  if (all == null) {
    return res.status(500).end();
  }
  return res.status(200).json(all);
});

/**
 * Define further nested routes
 */
router.use("/item", itemRouter);
router.use("/locations", locationsRouter);
router.use("/types", typesRouter);

export default router;

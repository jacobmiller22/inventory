/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import type { Request, Response } from "express";
import express from "express";
import { DataController } from "@/controllers/index";
import {
  IInventoryLocation,
  IInventoryLocationMap,
  TLocationID,
} from "@/interfaces/Inventory";

const router = express();

router.get("/", async (req: Request, res: Response) => {
  /** Get all locations */
  res.setHeader("Content-Type", "application/json");
  const all: IInventoryLocationMap = await DataController().getLocations();
  if (all == null) {
    return res.status(400).end();
  }
  return res.status(200).json(all);
});

router.post("/", async (req: Request, res: Response) => {
  /** Add a new location */
  const location: IInventoryLocation = req.body.location;
  if (location == null) {
    return res.status(400).end();
  }
  const result: TLocationID | null =
    await DataController().createInventoryLocation(location);
  if (result == null) {
    return res.status(500).end();
  }
  return res.status(200).json(result);
});

router.put("/", async (req: Request, res: Response) => {});

export default router;

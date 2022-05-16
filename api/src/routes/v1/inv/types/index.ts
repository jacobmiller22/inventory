/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import type { Request, Response } from "express";
import express from "express";
import { DataController } from "@/controllers/index";
import { TItemType } from "@/interfaces/Inventory";

const router = express();

router.get("/", async (req: Request, res: Response) => {
  /** Get all types */
  res.setHeader("Content-Type", "application/json");
  const all: TItemType[] = await DataController().getTypes();
  if (all == null) {
    return res.status(500).end();
  }
  return res.status(200).json(all);
});

router.post("/", async (req: Request, res: Response) => {
  /** Add a new type */
  const type: TItemType = req.body.type;
  if (type == null) {
    return res.status(400).end();
  }
  const result: Boolean = await DataController().createType(type);
  if (result == null) {
    return res.status(500).end();
  }
  return res.status(200).json(result);
});

export default router;

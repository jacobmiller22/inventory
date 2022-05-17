import type { Request, Response } from "express";
import { DataController } from "@/controllers/index";
import { IInventoryItemMap } from "@/types/Inventory";

const getInventory = async (req: Request, res: Response) => {
  /** Get all inventory items */

  const all: IInventoryItemMap = await DataController().getInventory();

  if (all == null) {
    return res.status(500).end();
  }

  return res.status(200).json(all);
};

export default { getInventory };

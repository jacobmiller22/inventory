import { Request, Response } from "express";
import { DataController } from "@/controllers/index";
import { TItemType } from "@/types/Inventory";

const getTypes = async (req: Request, res: Response) => {
  /** Get all types */
  res.setHeader("Content-Type", "application/json");
  const all: TItemType[] = await DataController().getTypes();

  if (all == null) {
    return res.status(500).end();
  }

  return res.status(200).json(all);
};

const createType = async (req: Request, res: Response) => {
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
};

export default { getTypes, createType };

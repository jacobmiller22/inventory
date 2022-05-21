import type { Request, Response } from "express";
import itemsService from "@/services/items";
import { isValidItemId, Item, ItemId, MinItem } from "@/types/item";
import { HttpStatus } from "@/types/http";
import { removeUndefined } from "@/lib/validators";
import { isValidLocationId } from "@/types/location";
import { isValidTagId, TagId } from "@/types/tag";

const getItems = async (req: Request, res: Response) => {
  /** Get all locations */

  const items: MinItem[] = await itemsService.getItems();

  return res.status(HttpStatus.OK).json(items);
};

const getItem = async (req: Request, res: Response) => {
  /** Get information about a location */
  const itemId: any = req.params.itemId;

  if (!isValidItemId(itemId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid itemId");
  }

  const item = await itemsService.getItem(itemId);

  if (!item) {
    return res.status(HttpStatus.NOT_FOUND).end();
  }

  return res.status(HttpStatus.OK).json(item);
};

const createItem = async (req: Request, res: Response) => {
  /** Create a new Item */

  const item: Omit<MinItem, "itemId" | "tags"> & {
    tags: TagId[];
    description: string;
    imgSrcs: string[];
  } = {
    locationId: req.body.locationId,
    name: req.body.name,
    description: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit,
    tags: req.body.tags,
    imgSrcs: [],
  };

  const itemId: ItemId | null = await itemsService.createItem(item);

  if (itemId === null) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(200).json(itemId);
};

const updateItem = async (req: Request, res: Response) => {
  const itemId: ItemId | any = req.params.itemId;

  if (!isValidItemId(itemId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid itemId");
  }

  let newItem: Omit<MinItem, "itemId" | "imgSrcs"> & { description: string } = {
    locationId: req.body.locationId,
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    unit: req.body.unit,
    tags: req.body.tags,
  };

  if (newItem.locationId && !isValidLocationId(newItem.locationId)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Item locationId must be a valid locationId");
  }

  if (newItem.name && typeof newItem.name !== "string") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Location name must be a string");
  }

  if (newItem?.description && typeof newItem.description !== "string") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Location description must be a string");
  }

  if (newItem.quantity && typeof newItem.quantity !== "number") {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Item quantity must be a string");
  }

  if (newItem.unit && typeof newItem.unit !== "string") {
    return res.status(HttpStatus.BAD_REQUEST).end("Item unit must be a string");
  }

  if (newItem.tags && !Array.isArray(newItem.tags)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Location tags must be an array");
  }

  // Verify correct tag structure
  if (newItem.tags && (newItem.tags as any[]).some((id) => !isValidTagId(id))) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("Provided at least one invalid tag");
  }

  /** Remove undefined values from newLocation object */
  newItem = removeUndefined(newItem);

  if (Object.keys(newItem).length === 0) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .end("None of the given fields are valid");
  }

  const success = await itemsService.updateItem(itemId, newItem);

  if (!success) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).json(true);
};

const deleteItem = async (req: Request, res: Response) => {
  /** Delete an item */
  const itemId: ItemId = req.params.itemId;

  console.log("itemId", itemId);

  if (!isValidItemId(itemId)) {
    return res.status(HttpStatus.BAD_REQUEST).end("Invalid itemId");
  }

  const success = await itemsService.deleteItem(itemId);

  if (!success) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }

  return res.status(HttpStatus.OK).json(true);
};

export default { getItems, getItem, createItem, updateItem, deleteItem };
function isValidTag(t: any): unknown {
  throw new Error("Function not implemented.");
}

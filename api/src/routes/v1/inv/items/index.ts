/**
 *
 * The entry point to the route: 'server/v1/inventory/item/
 *
 */
import express from "express";
import invItemController from "@/controllers/inv/items";
import { verifyExistence } from "@/middleware/existence";

const router = express();

router.get("/", invItemController.getItems);

/**
 * @api {item} /v1/inventory/item/:item Get all details of an inventory item
 */
router.get("/:item_id", invItemController.getItem);

/**
 * @api {post} /v1/inventory/ Create an inventory item
 */
router.post(
  "/",
  verifyExistence(["name", "quantity", "note", "type", "locationId"]),
  invItemController.createItem
);

export default router;

/**
 *
 * The entry point to the route: 'server/v1/inventory/item/
 *
 */
import express from "express";
import invItemController from "@/controllers/inv/items";
import { verifyExistence } from "@/middleware/existence";
import { requireAuth } from "@/middleware/auth";

const router = express();

router.get("/", invItemController.getItems);

/**
 * @api {item} /v1/inventory/item/:item Get all details of an inventory item
 */
router.get("/:itemId", invItemController.getItem);

/**
 * @api {post} /v1/inventory/ Create an inventory item
 */
router.post(
  "/",
  verifyExistence([
    "locationId",
    "name",
    "description",
    "quantity",
    "unit",
    "tags",
  ]),
  invItemController.createItem
);

router.put("/:itemId", invItemController.updateItem);

router.delete("/:itemId", invItemController.deleteItem);

export default router;

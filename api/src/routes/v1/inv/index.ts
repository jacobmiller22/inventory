/**
 *
 * The entry point to the route: 'server/v1/inventory/
 *
 */
import express from "express";
import invController from "@/controllers/inv";

import itemRouter from "./items";
import locationsRouter from "./locations";
import typesRouter from "./types";

const router = express();

/**
 * @api {get} /v1/inventory/ Get the inventory
 */
router.get("/", invController.getInventory);

/**
 * Define further nested routes
 */
router.use("/items", itemRouter);
router.use("/locations", locationsRouter);
router.use("/types", typesRouter);

export default router;

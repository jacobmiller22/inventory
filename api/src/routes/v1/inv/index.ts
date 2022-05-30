/**
 * Inventory routes for v1 API
 *
 * @requires - verification middleware to ensure that the user is authenticated from upstream routes.
 */
import express from "express";

import itemRouter from "./items";
import locationsRouter from "./locations";
import tagsRouter from "./tags";

const router = express();

router.use("/items", itemRouter);
router.use("/locations", locationsRouter);
router.use("/tags", tagsRouter);

export default router;

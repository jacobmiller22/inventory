/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import express from "express";
import invTypeController from "@/controllers/inv/types";

const router = express();

router.get("/", invTypeController.getTypes);

router.post("/", invTypeController.createType);

export default router;

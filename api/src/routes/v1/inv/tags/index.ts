/**
 *
 * The entry point to the route: 'server/v1/inventory/types/
 *
 */
import express from "express";
import invTypeController from "@/controllers/inv/tags";
import { verifyExistence } from "@/middleware/existence";

const router = express();

router.get("/", invTypeController.getTags);

router.get("/:tagId", invTypeController.getTag);

router.post("/", verifyExistence(["name"]), invTypeController.createTag);

router.put("/:tagId", invTypeController.updateTag);

router.delete("/:tagId", invTypeController.deleteTag);

export default router;

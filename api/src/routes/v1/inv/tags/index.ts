/**
 * Tag routes for inventory v1 API
 *
 * @requires - verification middleware to ensure that the user is authenticated from upstream routes.
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

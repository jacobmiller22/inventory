/**
 *
 * The entry point to the route: 'server/v1/inventory/item/
 *
 */
import express from "express";
import userController from "@/controllers/users";
import { verifyExistence } from "@/middleware/existence";
import { requireAuth } from "@/middleware/auth";

const router = express();

router.post("/", userController.createUser);

router.post("/batch", userController.createUsers);

export default router;

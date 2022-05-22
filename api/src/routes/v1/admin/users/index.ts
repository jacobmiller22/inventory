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

router.post(
  "/",
  verifyExistence(["username", "password", "email", "firstName", "lastName"]),
  userController.createUser
);

router.post("/batch", userController.createUsers);

router.put("/:userId", userController.updateUser);

router.delete("/:userId", userController.deleteUser);

export default router;

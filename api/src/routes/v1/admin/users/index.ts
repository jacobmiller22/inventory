/**
 * Admin User routes for v1 API
 *
 * @requires - verification middleware to ensure that the user is an admin from upstream routes.
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

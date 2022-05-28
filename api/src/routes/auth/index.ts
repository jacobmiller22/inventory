/**
 * Route: `/auctions/<path>`
 */
import express from "express";
import authController from "@/controllers/auth";
import { verifyExistence } from "@/middleware/existence";
import { requireAuth, validateToken } from "@/middleware/auth";

const router = express();

/**
 * Login a user
 */
router.post(
  "/login",
  verifyExistence(["username", "password"]),
  authController.login
);

/**
 * Signup a user
 */
router.post(
  "/signup",
  verifyExistence(["username", "password", "email", "firstName", "lastName"]),
  authController.signup
);

router.post("/validate", validateToken());

export default router;

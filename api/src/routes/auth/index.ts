/**
 * Route: `/auctions/<path>`
 */
import express from "express";
import authController from "@/controllers/auth";
import { verifyExistence } from "@/middleware/existence";

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
  verifyExistence(["username", "password", "email"]),
  authController.signup
);

export default router;

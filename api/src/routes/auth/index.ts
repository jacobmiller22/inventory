/**
 * Auth routes
 */
import express from "express";
import authController from "@/controllers/auth";
import { verifyExistence } from "@/middleware/existence";
import { requireAuth, validateToken } from "@/middleware/auth";

const router = express();

/**
 * Login
 */
router.post(
  "/login",
  verifyExistence(["username", "password"]),
  authController.login
);

/**
 * Signup
 */
router.post(
  "/signup",
  verifyExistence(["username", "password", "email", "firstName", "lastName"]),
  authController.signup
);

/**
 * Validate token
 */
router.post("/validate", validateToken());

router.post("/request-password-change", authController.requestPasswordChange);

export default router;

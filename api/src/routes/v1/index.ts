/**
 * v1 API routes
 */
import express from "express";

import v1InventoryRouter from "./inv";
import v1UsersRouter from "./users";
import v1AdminRouter from "./admin";

import { hasRole, requireAuth } from "@/middleware/auth";
import { Role } from "@/types/user";

const router = express();

router.use(
  "/inv",
  requireAuth(),
  hasRole([Role.USER, Role.ADMIN]),
  v1InventoryRouter
);
router.use(
  "/users",
  requireAuth(),
  hasRole([Role.USER, Role.ADMIN]),
  v1UsersRouter
);
router.use("/admin", requireAuth(), hasRole([Role.ADMIN]), v1AdminRouter);

export default router;

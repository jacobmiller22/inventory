/**
 *
 * This is the entry point to the router for the API.
 *
 */

import express from "express";
import v1InventoryRouter from "./v1/inv";
import v1UsersRouter from "./v1/users";
import v1AdminRouter from "./v1/admin";
import authRouter from "./auth";
import { hasRole, requireAuth } from "@/middleware/auth";
import { Role } from "@/types/user";

const router = express();

router.use("/auth", authRouter);
router.use("/v1/inv", v1InventoryRouter);
router.use("/v1/users", v1UsersRouter);
router.use("/v1/admin", requireAuth(), hasRole([Role.ADMIN]), v1AdminRouter);

export default router;

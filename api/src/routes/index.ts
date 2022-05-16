/**
 *
 * This is the entry point to the router for the API.
 *
 */

import express from "express";
import type { Request, Response } from "express";
import v1InventoryRouter from "./inv/v1";
import v1UsersRouter from "./users/v1";

import { requireAuth } from "@/middleware/auth";

const router = express();

router.get("/", requireAuth(), (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/inv/v1", v1InventoryRouter);
router.use("/users/v1", v1UsersRouter);

export default router;

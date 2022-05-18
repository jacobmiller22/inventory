/**
 *
 * This is the entry point to the router for the API.
 *
 */

import express from "express";
import type { Request, Response } from "express";
import v1InventoryRouter from "./v1/inv";
import v1UsersRouter from "./v1/users";
import authRouter from "./auth";

const router = express();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/auth", authRouter);
router.use("/v1/inv", v1InventoryRouter);
router.use("/v1/users", v1UsersRouter);

export default router;

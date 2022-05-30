/**
 * Entry point to the API.
 *
 */

import express from "express";

import v1Router from "./v1";
import authRouter from "./auth";

const router = express();

router.get("/", (req, res) =>
  res.send("Hello, World! Welcome to Inventory API!")
);

router.use("/auth", authRouter);
router.use("/v1", v1Router);

export default router;

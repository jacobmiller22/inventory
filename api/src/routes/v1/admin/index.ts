/**
 * Admin routes for v1 API
 *
 * @requires - verification middleware to ensure that the user is an admin from upstream routes.
 */
import { hasRole } from "@/middleware/auth";
import express from "express";
import usersRouter from "./users";

const router = express();

router.use("/users", usersRouter);

export default router;

import express from "express";
import usersRouter from "./users";

const router = express();

router.use("/users", usersRouter);

export default router;

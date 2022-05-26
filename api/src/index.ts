// Register module alias for TS
import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);

if (process.env.NODE_ENV === undefined) {
  throw new Error("NODE_ENV is not set");
}

import dotEnv from "dotenv";

if (!process.env.DOCKER && process.env.NODE_ENV === "development") {
  dotEnv.config({ path: ".env.local" });
  console.log("Loaded .env.local file");
} else if (!process.env.DOCKER && process.env.NODE_ENV === "production") {
  dotEnv.config({ path: ".env.production" });
  console.log("Loaded .env.production file");
}
if (process.env.MONGODB_URI === undefined) {
  throw new Error("MONGODB_URI is not set");
}

import express from "express";
import cors from "cors";
import indexRouter from "@/routes";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

/** Services initializations */
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.error("Error connecting to mongodb", err);
    process.exit();
  });

// Connect routing
app.use("/", indexRouter);

const arg_port = process.argv.indexOf("--port") + 1;

const PORT =
  process.env.PORT || process.argv[arg_port === 0 ? -1 : arg_port] || 8080;

// start the Express server
try {
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
} catch (e) {
  console.log("Failed to start server on port " + PORT);
  console.log(e);
}

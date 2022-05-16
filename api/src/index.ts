import "module-alias/register"; // Register module alias for TS

import express from "express";
import cors from "cors";
import indexRouter from "@/routes";
import initDb from "@/models";

const app = express();

app.use(express.json());
app.use(cors());

/** Services initializations */
initDb();

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

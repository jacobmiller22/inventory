export { default as User } from "./user.model";

import mongoose from "mongoose";
import config from "@/config.json";

/** Initialize our database */
const initDb = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI || config.mongoose.connectionString)
      .then(() => console.log("connected to mongo"));
  } catch (err) {
    console.error("Error connecting to mongodb", err);
    process.exit();
  }
};

export default initDb;

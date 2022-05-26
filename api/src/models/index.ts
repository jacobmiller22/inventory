export { default as User } from "./user.model";
export { default as Location } from "./location.model";
export { default as Item } from "./item.model";
export { default as Tag } from "./tag.model";

import mongoose from "mongoose";
import config from "@/../config.json";

// /** Initialize our database */
// export const initDb = async () => {
//   console.log("Starting mongodb");
//   try {
//     await mongoose.connect(
//       process.env.MONGODB_URI || config.mongoose.connectionString
//     );
//     console.log("Connected to mongodb");
//   } catch (err) {
//     console.error("Error connecting to mongodb", err);
//     process.exit();
//   }
// };

// export default initDb;

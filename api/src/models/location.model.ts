import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: String },
  name: { type: String, unique: false, required: true },
  description: { type: String, unique: false, required: false, default: "" },
  items: { type: [String], unique: false, required: false, default: [] },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("Location", schema);

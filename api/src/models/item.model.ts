import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: String, required: true },
  _location: { type: String, ref: "Location" },
  name: { type: String, unique: false, required: true },
  description: { type: String, unique: false, required: false },
  quantity: { type: Number, unique: false, required: true },
  unit: { type: String, unique: false, required: true },
  _tags: { type: [String], ref: "Tag", default: [] },
  imgSrcs: { type: [String], unique: false, required: true, default: [] },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("Item", schema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: String },
  name: { type: String, unique: true, required: true },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("Tag", schema);

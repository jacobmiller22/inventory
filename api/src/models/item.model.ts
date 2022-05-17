import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: String, required: true },
  locationId: { type: String, required: true },
  name: { type: String, unique: false, required: true },
  quantity: { type: Number, required: true },
  note: { type: String, unique: false, required: false },
  type: { type: String, required: true },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("Item", schema);

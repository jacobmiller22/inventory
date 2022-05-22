import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  _id: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  roles: { type: [String], required: true },
  createdAt: { type: Number, required: true },
  profileSrc: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/component/image/upload/avatars/avatar-plain-1.png",
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

schema.set("toJSON", { virtuals: true });

export default mongoose.model("User", schema);

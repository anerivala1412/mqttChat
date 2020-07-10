import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  _id: String,
  name: String,
});

export const User = mongoose.model("User", UserSchema);

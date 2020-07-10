import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema({
  _id: String,
  name: String,
  member:[' ']
});

export const Group = mongoose.model("Group", GroupSchema);

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: String,
  // senderId: { type: Schema.Types.ObjectId, ref: "User" },
  // groupId: { type: Schema.Types.ObjectId, ref: "Group" },
  // user: {type: Schema.ObjectId, ref: 'UserSchema'},
  senderId: String,
  groupId: String,
  receiverId: String,
});

export const Message = mongoose.model("Message", MessageSchema);

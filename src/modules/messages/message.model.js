const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
  content: {
    type: String
  },
  role: {
    type: String,
    enum: ["user", "assistant", "system"]
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.index({ conversation_id: 1, created_at: 1 });

module.exports = mongoose.model("Message", MessageSchema);

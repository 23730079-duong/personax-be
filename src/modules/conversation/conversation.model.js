const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  persona_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Persona",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  started_at: {
    type: Date
  },
  last_updated: {
    type: Date
  }
});

module.exports = mongoose.model("Conversation", ConversationSchema);

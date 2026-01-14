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

ConversationSchema.index({ user_id: 1 });
ConversationSchema.index({ persona_id: 1 });

module.exports = mongoose.model("Conversation", ConversationSchema);

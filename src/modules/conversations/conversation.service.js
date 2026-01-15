const Conversation = require("./conversation.model");

const startConversation = async ({ user_id, persona_id }) => {
  const conversation = await Conversation.create({
    user_id,
    persona_id,
    started_at: new Date(),
    last_updated: new Date()
  });

  return conversation;
};

const getMyConversations = async (user_id) => {
  return Conversation.find({ user_id })
    .sort({ last_updated: -1 });
};

module.exports = {
  startConversation,
  getMyConversations
};

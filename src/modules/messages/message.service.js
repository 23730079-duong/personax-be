const Message = require("./message.model");
const Conversation = require("../conversations/conversation.model");

const addMessage = async ({ conversation_id, role, content }) => {
  const message = await Message.create({
    conversation_id,
    role,
    content,
    created_at: new Date()
  });

  // update conversation last_updated
  await Conversation.findByIdAndUpdate(conversation_id, {
    last_updated: new Date()
  });

  return message;
};

const getMessagesByConversation = async (
  conversation_id,
  { limit = 50, offset = 0 }
) => {
  return Message.find({ conversation_id })
    .sort({ created_at: 1 })
    .skip(offset)
    .limit(limit);
};

module.exports = {
  addMessage,
  getMessagesByConversation
};

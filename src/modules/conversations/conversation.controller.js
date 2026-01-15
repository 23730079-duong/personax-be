const conversationService = require("./conversation.service");

const startConversation = async (req, res, next) => {
  try {
    const { persona_id } = req.body;

    const conversation = await conversationService.startConversation({
      user_id: req.user.user_id,
      persona_id
    });

    res.status(201).json({
      success: true,
      data: conversation
    });
  } catch (error) {
    next(error);
  }
};

const getMyConversations = async (req, res, next) => {
  try {
    const conversations = await conversationService.getMyConversations(
      req.user.user_id
    );

    res.status(200).json({
      success: true,
      data: conversations
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startConversation,
  getMyConversations
};

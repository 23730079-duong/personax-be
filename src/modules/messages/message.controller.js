const messageService = require("./message.service");
const Conversation = require("../conversations/conversation.model");

const sendMessage = async (req, res, next) => {
  try {
    const { conversation_id, content } = req.body;

    // check conversation ownership
    const conversation = await Conversation.findOne({
      _id: conversation_id,
      user_id: req.user.user_id
    });

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    // save user message
    const userMessage = await messageService.addMessage({
      conversation_id,
      role: "user",
      content
    });

    /**
     * TODO:
     * - Call AI here
     * - Get assistant response
     */
    const Persona = require("../personas/persona.model");
    const aiService = require("../ai/ai.service");

    // get persona model info
    const persona = await Persona.findById(conversation.persona_id);

    // add message to history
    const history = await messageService.getMessagesByConversation(
        conversation_id,
        { limit: 20, offset: 0 }
    );

    // prepend system prompt
    const messages = [
    {
        role: "system",
        content: persona.prompt_context
    },
    ...history.map(m => ({
        role: m.role,
        content: m.content
    })),
    {
        role: "user",
        content
    }
    ];

    // call AI
    const aiReply = await aiService.generateAssistantReply({
        provider: persona.model_provider,   // openai | gemini
        model: persona.model_name,           // gpt-4, gemini-pro
        temperature: persona.temperature || 0.7,
        messages
    });

    // save assistant message
    const assistantMessage = await messageService.addMessage({
    conversation_id,
        role: "assistant",
        content: aiReply
    });

    // mock AI reply
    // const assistantMessage = await messageService.addMessage({
    //   conversation_id,
    //   role: "assistant",
    //   content: "This is a mock assistant reply."
    // });

    res.status(201).json({
      success: true,
      data: {
        user_message: userMessage,
        assistant_message: assistantMessage
      }
    });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { conversation_id } = req.params;
    const { limit, offset } = req.query;

    const messages = await messageService.getMessagesByConversation(
      conversation_id,
      {
        limit: Number(limit) || 50,
        offset: Number(offset) || 0
      }
    );

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getMessages
};

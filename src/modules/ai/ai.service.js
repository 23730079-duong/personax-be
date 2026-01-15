const openaiService = require("./openai.service");
const geminiService = require("./gemini.service");

const generateAssistantReply = async ({
  provider,
  model,
  temperature,
  messages
}) => {
  switch (provider) {
    case "openai":
      return openaiService.generateReply({
        messages,
        model,
        temperature
      });

    case "gemini":
      return geminiService.generateReply({
        messages,
        model
      });

    default:
      throw new Error("Unsupported AI provider");
  }
};

module.exports = {
  generateAssistantReply
};

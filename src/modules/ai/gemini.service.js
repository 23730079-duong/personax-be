const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateReply = async ({ messages, model }) => {
  const geminiModel = genAI.getGenerativeModel({ model });

  const prompt = messages
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const result = await geminiModel.generateContent(prompt);

  return result.response.text();
};

module.exports = {
  generateReply
};

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateReply = async ({ messages, model, temperature }) => {
  const payload = {
    model,
    messages
  };

  if (!model.includes("nano") && temperature !== undefined) {
    payload.temperature = temperature;
  }

  const response = await client.chat.completions.create(payload);

  return response.choices[0].message.content;
};

module.exports = {
  generateReply
};

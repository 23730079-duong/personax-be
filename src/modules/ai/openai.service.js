const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const generateReply = async ({ messages, model, temperature }) => {
  const response = await client.chat.completions.create({
    model,
    messages,
    temperature
  });

  return response.choices[0].message.content;
};

module.exports = {
  generateReply
};

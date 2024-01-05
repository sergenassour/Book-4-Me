const { OpenAIAPI } = require('openai');

const openai = new OpenAIAPI(process.env.OPENAI_API_KEY);

async function getAIResponse(prompt) {
  try {
    const response = await openai.createCompletion({ model: "text-davinci-003", prompt, max_tokens: 150 });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error("OpenAI Error:", error);
    return null;
  }
}

module.exports = getAIResponse;

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

// Function for intelligent appointment scheduling suggestions
async function getSchedulingSuggestion(clientDetails) {
  const prompt = `Given the client details: ${JSON.stringify(clientDetails)}, suggest optimal appointment times or services.`;
  try {
    const response = await openai.createCompletion({ model: "text-davinci-003", prompt, max_tokens: 150 });
    return response.choices[0].text.trim();
  } catch (error) {
    console.error("OpenAI Scheduling Error:", error);
    return null;
  }
}

// Function for personalized customer interactions
async function getCustomerInteraction(clientInfo) {
  const prompt = `Create a personalized message for a client with the following details: ${clientInfo}`;
  return getAIResponse(prompt);
}

module.exports = {
  getAIResponse,
  getSchedulingSuggestion,
  getCustomerInteraction
};
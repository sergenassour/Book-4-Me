const express = require('express');
const router = express.Router();
const { getCustomerInteraction } = require('../utils/openai'); // Ensure the correct path

// Route for AI-driven personalized communication
router.post('/personalized-message', async (req, res) => {
  try {
    const clientInfo = req.body; // Expecting an object with client details
    const personalizedMessage = await getCustomerInteraction(JSON.stringify(clientInfo));

    if (!personalizedMessage) {
      return res.status(500).json({ message: "Failed to generate a personalized message" });
    }

    res.json({ message: personalizedMessage });
  } catch (error) {
    console.error('AI Personalized Message Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

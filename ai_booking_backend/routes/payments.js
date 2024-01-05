const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeConfig'); // Corrected import path for stripeConfig

router.post('/charge', async (req, res) => {
  try {
    const { amount, source } = req.body;
    
    // Validate the input
    if (!amount || !source) {
      return res.status(400).json({ message: "Amount and source are required" });
    }

    // Create a charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      description: 'Example charge'
    });

    res.json(charge);
  } catch (error) {
    console.error('Stripe Charge Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

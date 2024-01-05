const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeConfig'); // Ensure the correct path

// Route to create a new subscription
router.post('/', async (req, res) => {
  const { customerId, planId } = req.body;

  if (!customerId || !planId) {
    return res.status(400).json({ message: "Customer ID and Plan ID are required" });
  }

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: "Failed to create subscription" });
  }
});

module.exports = router;

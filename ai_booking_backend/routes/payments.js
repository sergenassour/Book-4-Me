const express = require('express');
const router = express.Router();
const stripe = require('../utils/stripeConfig'); // Correct path for stripeConfig

// Route for processing payments (consolidated to handle multiple methods)
router.post('/charge', async (req, res) => {
  try {
    const { paymentMethod, amount, currency = 'usd' } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    let charge;
    if (paymentMethod && paymentMethod.type === 'card') {
      // Handle card payments (default scenario)
      charge = await stripe.charges.create({
        amount,
        currency,
        source: paymentMethod.details, // 'source' assumes a token or similar identifier
        description: 'Card charge'
      });
    } else {
      // Handle other payment methods or default to an error for unspecified methods
      return res.status(400).json({ message: "Unsupported or missing payment method" });
    }

    res.json(charge);
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/refund', async (req, res) => {
  try {
    const { chargeId } = req.body;

    // Basic validation of chargeId
    if (!chargeId || !chargeId.startsWith('ch_')) {
      return res.status(400).json({ message: "Invalid or missing charge ID." });
    }

    // Verify the charge with Stripe
    let charge;
    try {
      charge = await stripe.charges.retrieve(chargeId);
    } catch (stripeError) {
      return res.status(400).json({ message: "Invalid charge ID." });
    }

    // Proceed with refund if the charge is valid
    const refund = await stripe.refunds.create({ charge: chargeId });
    res.json(refund);
  } catch (error) {
    console.error('Stripe Refund Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

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

router.put('/:subscriptionId', async (req, res) => {
  const { subscriptionId } = req.params;
  const { newPlanId } = req.body;

  if (!newPlanId) {
    return res.status(400).json({ message: "New Plan ID is required" });
  }

  try {
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{ plan: newPlanId }],
    });

    res.json(updatedSubscription);
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ message: "Failed to update subscription" });
  }
});

router.delete('/:subscriptionId', async (req, res) => {
  const { subscriptionId } = req.params;

  try {
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);
    res.json(canceledSubscription);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ message: "Failed to cancel subscription" });
  }
});


module.exports = router;

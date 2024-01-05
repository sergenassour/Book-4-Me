const express = require('express');
const Service = require('../models/Service');

const router = express.Router();

// Add a new service
router.post('/', async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a service
router.put('/:serviceId', async (req, res) => {
  try {
    const updatedService = await Service.update(req.body, {
      where: { id: req.params.serviceId }
    });
    res.json({ message: "Service updated", updatedService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a service
router.delete('/:serviceId', async (req, res) => {
  try {
    await Service.destroy({
      where: { id: req.params.serviceId }
    });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

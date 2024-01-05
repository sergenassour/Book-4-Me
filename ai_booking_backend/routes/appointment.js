const express = require('express');
const Appointment = require('../models/Appointment');
const checkAvailability = require('../utils/checkAvailability');

const router = express.Router();

router.post('/', async (req, res) => {
  const { dateTime, staffId } = req.body;
  const isAvailable = await checkAvailability(dateTime, staffId);

  if (!isAvailable) {
    return res.status(400).json({ message: "The selected time slot is not available." });
  }
});

// Book an appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing appointment
router.put('/:appointmentId', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.update(req.body, {
      where: { id: req.params.appointmentId }
    });
    res.json({ message: "Appointment updated", updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel an appointment
router.delete('/:appointmentId', async (req, res) => {
  try {
    await Appointment.destroy({
      where: { id: req.params.appointmentId }
    });
    res.json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

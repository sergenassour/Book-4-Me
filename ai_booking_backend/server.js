require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointment');
const serviceRoutes = require('./routes/services');
const cron = require('node-cron');
const sendReminders = require('./utils/reminders'); // Ensure this path is correct
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(bodyParser.json());

// Use the route modules for different functionalities
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/services', serviceRoutes);
app.use('/payments', paymentRoutes);

// Define a simple route to check server status
app.get('/', (req, res) => {
  res.json({ message: "Welcome to the AI-Integrated Booking System Backend." });
});

// Schedule the reminder function to run every day at 8 AM
cron.schedule('0 8 * * *', () => {
  console.log('Running a job at 08:00 at America/Los_Angeles timezone');
  sendReminders();
}, {
  scheduled: true,
  timezone: "America/Los_Angeles"
});

// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const Appointment = require('../models/Appointment');
const sendEmail = require('./sendEmail');
const moment = require('moment'); // You might need to install moment: npm install moment

const sendReminders = async () => {
  // Assuming appointments have a date field and a boolean field to track if a reminder has been sent
  const today = moment().startOf('day');
  const tomorrow = moment(today).add(1, 'days');

  try {
    const upcomingAppointments = await Appointment.findAll({
      where: {
        date: {
          $gte: today.toDate(),
          $lt: tomorrow.toDate()
        },
        reminderSent: false // Only fetch appointments for which reminders haven't been sent
      }
    });

    upcomingAppointments.forEach(async (appointment) => {
      await sendEmail(
        appointment.userEmail,
        'Appointment Reminder',
        `You have an upcoming appointment on ${moment(appointment.date).format('LLLL')}.`
      );

      // Update the appointment to indicate that a reminder has been sent
      appointment.reminderSent = true;
      await appointment.save();
    });
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};

module.exports = sendReminders;

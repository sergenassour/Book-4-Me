const Sequelize = require('sequelize');
const sequelize = require('../database');

const Appointment = sequelize.define('appointment', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending' // Example: pending, confirmed, completed, cancelled
  },
  // Additional fields as needed
});

module.exports = Appointment;

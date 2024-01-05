const Sequelize = require('sequelize');
const sequelize = require('../database');

const Payment = sequelize.define('payment', {
  transactionId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  serviceId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // Additional fields as needed
});

module.exports = Payment;

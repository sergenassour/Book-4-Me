const Sequelize = require('sequelize');
const sequelize = require('../database');

const Service = sequelize.define('service', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
    // allowNull is true by default
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: 'Duration in minutes'
  },
  // Additional fields as needed
});

module.exports = Service;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('ai_booking', 'sergenassour@gmail.com', 'immu!t2/zAvKj7+', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
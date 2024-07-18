const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blaBla', 'postgres', '123', {
  host: 'db',
  dialect: 'postgres',
});

module.exports = sequelize;
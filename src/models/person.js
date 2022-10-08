const Sequelize = require('sequelize');
const db = require('../database');

const Person = db.define('persons',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true
  },
  work: {
    type: Sequelize.STRING,
    allowNull: true
  }
});
module.exports = Person;
  
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Fruta = sequelize.define('frutas', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
});

module.exports = Fruta;

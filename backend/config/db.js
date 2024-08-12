const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'banner_db',
  'root',
  'Anil@2002',
   {
     host: 'localhost',
     dialect: 'mysql'
   }
 );

module.exports = sequelize;

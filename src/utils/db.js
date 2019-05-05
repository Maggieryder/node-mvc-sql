const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_test', 'rootUser', 'password1', {
  dialect:'mysql', 
  host: 'mr-db.cpjfmenjn0tg.us-east-1.rds.amazonaws.com'
})

module.exports = sequelize;

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'password'
// });

// module.exports = pool.promise();
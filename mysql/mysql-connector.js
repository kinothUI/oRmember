const mysql = require("mysql");
const database = require("./config");

const connection = mysql.createConnection(database.settings);

const mysqlConnector = (sql, callback) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        return reject();
      } else {
        return resolve({ data: results });
      }
    });
  });
};

module.exports = {
  query: mysqlConnector
};

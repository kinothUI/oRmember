const mysql = require("mysql");
const { settings } = require("./config");

const connection = mysql.createPool(settings);

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
  query: mysqlConnector,
};

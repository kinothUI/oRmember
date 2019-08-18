const mysql = require("../mysql/mysql-connector");

const getAllOrders = (req, res) => {
  (async () => {
    try {
      const SELECT_ALL_ORDERS_QUERY = "SELECT * FROM orders;";
      let response = await mysql.query(SELECT_ALL_ORDERS_QUERY);
      res.json({
        data: response.data
      });
    } catch (error) {
      res.send(error);
    }
  })();
};

const addOrder = (req, res) => {
  (async () => {
    try {
      const {
        uuid,
        xchange,
        ticker,
        type,
        lmt,
        volume,
        comment,
        date
      } = req.query;
      const INSERT_ORDERS_QUERY = `INSERT INTO orders (uuid, xchange, ticker, type, lmt, volume, comment, date) VALUES('${uuid}','${xchange}','${ticker}','${type}',${lmt},${volume},'${comment}','${date}');`;
      await mysql.query(INSERT_ORDERS_QUERY);
      res.send("order added successfully");
    } catch (error) {
      res.send(error);
    }
  })();
};

const fillOrder = (req, res) => {
  (async () => {
    try {
      const { uuid, filled } = req.query;
      const UPDATE_ORDERS_FILLED = `UPDATE orders SET filled=${filled} WHERE uuid='${uuid}';`;
      await mysql.query(UPDATE_ORDERS_FILLED);
      res.send("order status updated successfully");
    } catch (error) {
      res.send(error);
    }
  })();
};

const deleteOrder = (req, res) => {
  (async () => {
    try {
      const { uuid } = req.params;
      const DELETE_ORDER_QUERY = `DELETE FROM orders WHERE uuid='${uuid}';`;
      let response = await mysql.query(DELETE_ORDER_QUERY);
      res.send("order deleted successfully" + response.results);
    } catch (error) {
      res.send(error);
    }
  })();
};

module.exports = {
  getAllOrders,
  addOrder,
  fillOrder,
  deleteOrder
};

const mysql = require("../mysql/mysql-connector");

const getAllOrders = async (req, res) => {
  try {
    const SELECT_ALL_ORDERS_QUERY = "SELECT * FROM orders;";
    const { data } = await mysql.query(SELECT_ALL_ORDERS_QUERY);

    res.json({ data });
  } catch (error) {
    res.send(error);
  }
};

const addOrder = async (req, res) => {
  try {
    const { uuid, xchange, ticker, type, lmt, volume, comment, date } = req.query;

    const INSERT_ORDERS_QUERY = `INSERT INTO orders (uuid, xchange, ticker, type, lmt, volume, comment, date) VALUES('${uuid}','${xchange}','${ticker}','${type}',${lmt},${volume},'${comment}','${date}');`;
    await mysql.query(INSERT_ORDERS_QUERY);

    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};

const fillOrder = async (req, res) => {
  try {
    const { uuid, filled } = req.query;

    const UPDATE_ORDERS_FILLED = `UPDATE orders SET filled=${filled} WHERE uuid='${uuid}';`;
    await mysql.query(UPDATE_ORDERS_FILLED);

    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { uuid } = req.params;

    const DELETE_ORDER_QUERY = `DELETE FROM orders WHERE uuid='${uuid}';`;
    await mysql.query(DELETE_ORDER_QUERY);

    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  fillOrder,
  deleteOrder,
};

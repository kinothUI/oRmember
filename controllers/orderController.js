const UUID = require("uuid");
const fs = require("fs");

const mysql = require("../mysql/mysql-connector");

const getAllOrders = async (req, res) => {
  try {
    // https://stackoverflow.com/questions/37470949/how-do-i-generate-nested-json-objects-using-mysql-native-json-functions/37474200#37474200
    const SELECT_ALL_ORDERS_QUERY = `SELECT JSON_OBJECT('id',o.order_id,'uuid',uuid,'broker',broker,'ticker',ticker,'direction',direction,'price',price,'volume',volume,'note',note,'date',date,'filled',filled,'logo',(SELECT CAST(CONCAT('[',GROUP_CONCAT(JSON_OBJECT('id',logo_id,'uuid',uuid,'src',src,'thumbnail',thumbnail,'thumbnailHeight',thumbnailHeight,'thumbnailWidth',thumbnailWidth,'order_id',order_id)),']') AS JSON) FROM logos WHERE order_id = o.order_id)) AS o FROM orders o;`;

    const { data } = await mysql.query(SELECT_ALL_ORDERS_QUERY);

    const json = data.map((row) => {
      const value = Object.values(row).toString();
      const text = JSON.parse(value);
      return text;
    });

    res.json({ data: json });
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

const addOrder = async (req, res) => {
  try {
    const { broker, ticker, direction, price, volume, note, date } = req.body;

    console.log("date in addOrder()", date);

    const uuid = UUID.v4();

    const INSERT_ORDERS_QUERY = `INSERT INTO orders (uuid, broker, ticker, direction, price, volume, note, date) VALUES('${uuid}','${broker}','${ticker}','${direction}','${price}','${volume}','${note}','${date}');`;
    const response = await mysql.query(INSERT_ORDERS_QUERY);

    const data = {
      id: response.data.insertId,
      uuid,
    };

    res.type("json");
    res.json({ data });
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

const fillOrder = async (req, res) => {
  try {
    const { orderId, filled } = req.body;

    const UPDATE_ORDERS_FILLED = `UPDATE orders SET filled=${filled} WHERE order_id='${orderId}';`;
    await mysql.query(UPDATE_ORDERS_FILLED);

    res.sendStatus(204);
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id, files } = req.body;

    const DELETE_ORDER_QUERY = `DELETE FROM orders WHERE order_id='${id}';`;
    await mysql.query(DELETE_ORDER_QUERY);

    if (files) {
      const publicImagesPath = process.cwd() + "/public/images";

      files.forEach((file) =>
        fs.unlink(`${publicImagesPath}/${file.src}`, (err) => {
          if (err) console.log(err);
        })
      );
    }

    res.sendStatus(204);
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

module.exports = {
  getAllOrders,
  addOrder,
  fillOrder,
  deleteOrder,
};

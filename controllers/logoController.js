const mysql = require("../mysql/mysql-connector");
const fs = require("fs");

const getAllLogos = async (req, res) => {
  try {
    const SELECT_LOGOS_QUERY = `SELECT * FROM logos;`;
    const { data } = await mysql.query(SELECT_LOGOS_QUERY);

    res.type("json");
    res.json({ data });
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

const uploadLogo = async (req, res) => {
  try {
    const { orderId, orderUuid } = req.params;
    const { files } = req;

    const insertString = files
      .map(
        (file) => `('${orderUuid}', '${file.filename}', '${file.filename}', 85, 175, ${orderId})`
      )
      .join(", ");

    const INSERT_LOGO_QUERY = `INSERT INTO logos (uuid, src, thumbnail, thumbnailHeight, thumbnailWidth, order_id) VALUE${insertString};`;
    const SELECT_LOGO_BY_ORDER_ID_Q = `SELECT logo_id AS id, uuid, src, thumbnail, thumbnailHeight, thumbnailWidth FROM logos WHERE order_id=${orderId};`;
    await mysql.query(INSERT_LOGO_QUERY);
    const { data } = await mysql.query(SELECT_LOGO_BY_ORDER_ID_Q);

    res.type("json");
    res.json({ files: data });
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

const deleteLogo = async (req, res) => {
  try {
    const { id, filename } = req.body;

    const DELETE_LOGO_QUERY = `DELETE FROM logos WHERE logo_id='${id}';`;
    const sqlRes = await mysql.query(DELETE_LOGO_QUERY);

    fs.unlink(`./public/images/${filename}`, (err) => {
      err ? console.error(err) : null;
    });

    res.sendStatus(204);
  } catch (error) {
    res.setHeader("Content-Type", "application/problem+json");
    return res.json({ code: error.errno, msg: error.sqlMessage });
  }
};

module.exports = {
  getAllLogos,
  uploadLogo,
  deleteLogo,
};

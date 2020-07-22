const mysql = require("../mysql/mysql-connector");
const fs = require("fs");

const getAllLogos = async (req, res) => {
  try {
    const SELECT_LOGOS_QUERY = `SELECT * FROM logo;`;
    const { data } = await mysql.query(SELECT_LOGOS_QUERY);

    res.json({ data });
  } catch (error) {
    return res.status(500).json({ code: error.errno, msg: error.sqlMessage });
  }
};

const uploadLogo = async (req, res) => {
  try {
    const uuid = req.body.uuid;
    const filename = req.file.filename;

    const INSERT_LOGO_QUERY = `INSERT INTO logo (uuid, src, thumbnail, thumbnailWidth, thumbnailHeight) VALUES('${uuid}','${filename}', '${filename}', '150', '85');`;
    const { data } = await mysql.query(INSERT_LOGO_QUERY);

    res.json({ uuid, filename, id: data.insertId });
  } catch (error) {
    return res.status(500).json({ code: error.errno, msg: error.sqlMessage });
  }
};

const deleteLogo = async (req, res) => {
  try {
    const { id, filename } = req.params;

    const DELETE_LOGO_QUERY = `DELETE FROM logo WHERE id='${id}';`;
    await mysql.query(DELETE_LOGO_QUERY);

    fs.unlink(`./public/images/${filename}`, (err) => {
      err ? console.error(err) : null;
    });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ code: error.errno, msg: error.sqlMessage });
  }
};

module.exports = {
  getAllLogos,
  uploadLogo,
  deleteLogo,
};

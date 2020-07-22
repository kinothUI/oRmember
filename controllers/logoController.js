const mysql = require("../mysql/mysql-connector");
const fs = require("fs");

const getAllLogos = async (req, res) => {
  try {
    const SELECT_LOGOS_QUERY = `SELECT * FROM logo;`;
    let response = await mysql.query(SELECT_LOGOS_QUERY);
    res.json({
      data: response.data,
    });
  } catch (error) {
    res.send(error);
  }
};

const uploadLogo = async (req, res) => {
  try {
    const uuid = req.body.uuid;
    const filename = req.file.filename;
    const INSERT_LOGO_QUERY = `INSERT INTO logo (uuid, src, thumbnail, thumbnailWidth, thumbnailHeight) VALUES('${uuid}','${filename}', '${filename}', '150', '85');`;
    const response = await mysql.query(INSERT_LOGO_QUERY);

    res.status(200).send({ uuid, filename, id: response.data.insertId });
  } catch (error) {
    res.send(error);
  }
};

const deleteLogo = async (req, res) => {
  try {
    const { id, filename } = req.params;

    const DELETE_LOGO_QUERY = `DELETE FROM logo WHERE id='${id}';`;
    let response = await mysql.query(DELETE_LOGO_QUERY);

    res.json({ data: response.data });
    fs.unlink(`./public/images/${filename}`, (err) => {
      err ? console.error(err) : null;
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllLogos,
  uploadLogo,
  deleteLogo,
};

const mysql = require("../mysql/mysql-connector");
const fs = require("fs");

// const getAllLogos = (req, res) => {
//   const SELECT_LOGOS_QUERY = `SELECT * FROM logo;`;
//   mysql.query(SELECT_LOGOS_QUERY, (err, results) => {
//     if (err) {
//       return res.send(err);
//     } else {
//       return res.json({
//         data: results
//       });
//     }
//   });
// };

const getAllLogos = (req, res) => {
  (async () => {
    try {
      const SELECT_LOGOS_QUERY = `SELECT * FROM logo;`;
      let response = await mysql.query(SELECT_LOGOS_QUERY);
      res.json({
        data: response.data
      });
    } catch (error) {
      res.send(error);
    }
  })();
};

// const uploadLogo = (req, res) => {
//   const uuid = req.body.uuid;
//   const filename = req.file.filename;
//   const INSERT_LOGO_QUERY = `INSERT INTO logo (uuid, src, thumbnail, thumbnailWidth, thumbnailHeight) VALUES('${uuid}','${filename}', '${filename}', '150', '85');`;
//   mysql.query(INSERT_LOGO_QUERY, err => {
//     if (err) console.error(err);
//   });
//   return res.status(200).send({ uuid, filename });
// };

const uploadLogo = (req, res) => {
  (async () => {
    try {
      const uuid = req.body.uuid;
      const filename = req.file.filename;
      const INSERT_LOGO_QUERY = `INSERT INTO logo (uuid, src, thumbnail, thumbnailWidth, thumbnailHeight) VALUES('${uuid}','${filename}', '${filename}', '150', '85');`;
      await mysql.query(INSERT_LOGO_QUERY);
      res.status(200).send({ uuid, filename });
    } catch (error) {
      res.send(error);
    }
  })();
};

// const deleteLogo = (req, res) => {
//   const { filename } = req.params;
//   const DELETE_LOGO_QUERY = `DELETE FROM logo WHERE src='${filename}';`;
//   mysql.query(DELETE_LOGO_QUERY, (err, results) => {
//     if (err) {
//       console.error(err);
//     } else {
//       return res.json({
//         data: results
//       });
//     }
//   });
//   fs.unlink(`./uploads/${filename}`, err => {
//     err ? console.error(err) : null;
//   });
// };

const deleteLogo = (req, res) => {
  (async () => {
    try {
      const { filename } = req.params;
      const DELETE_LOGO_QUERY = `DELETE FROM logo WHERE src='${filename}';`;
      let response = await mysql.query(DELETE_LOGO_QUERY);
      res.json({
        data: response.data
      });
      fs.unlink(`./uploads/${filename}`, err => {
        err ? console.error(err) : null;
      });
    } catch (error) {
      console.error(error);
    }
  })();
};

module.exports = {
  getAllLogos,
  uploadLogo,
  deleteLogo
};

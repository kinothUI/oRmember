const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    // path.extname() prepends file extension
    const filename = `${req.params.orderUuid}-${Date.now()}` + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({ storage });

//Load Logo Controllers
const logoController = require("../../controllers/logoController");

router.get("/", logoController.getAllLogos);
router.post(
  "/upload/orderId/:orderId/orderUuid/:orderUuid",
  upload.array("files"),
  logoController.uploadLogo
);
router.delete("/delete", logoController.deleteLogo);

module.exports = router;

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});

const upload = multer({ storage });

//Load Logo Controllers
const logoController = require("../../controllers/logoController");

router.get("/logos", logoController.getAllLogos);
router.post(
  "/logo/upload/",
  upload.single("file", "uuid"),
  logoController.uploadLogo
);
router.get("/logos/delete/:filename", logoController.deleteLogo);

module.exports = router;

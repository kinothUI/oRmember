const express = require("express");
const router = express.Router();

//Load Controllers
const orderController = require("../../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.post("/add", orderController.addOrder);
router.patch("/patch", orderController.fillOrder);
router.delete("/delete", orderController.deleteOrder);

module.exports = router;

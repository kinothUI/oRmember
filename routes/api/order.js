const express = require("express");
const router = express.Router();

//Load Controllers
const orderController = require("../../controllers/orderController");

router.get("/orders", orderController.getAllOrders);
router.get("/orders/add", orderController.addOrder);
router.get("/orders/filled", orderController.fillOrder);
router.get("/orders/delete/:uuid", orderController.deleteOrder);

module.exports = router;

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors(), express.static("public/images"));

const orderData = require("./routes/api/order");
const logoData = require("./routes/api/logo");

app.use("/api/orderData", orderData);
app.use("/api/logoData", logoData);
app.use("/public/images", express.static(__dirname + "/public/images"));

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`oRmember-Server listening on Port ${PORT}`);
});

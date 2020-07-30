const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(express.static("public/images"));
app.use(bodyParser.json({ limit: "50mb" }));

const orderRoutes = require("./routes/api/order");
const logoRoutes = require("./routes/api/logo");

app.use("/api/order", orderRoutes);
app.use("/api/logo", logoRoutes);
app.use("/public/images", express.static(`${__dirname}/public/images`));

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log(`oRmember-Server listening on Port ${PORT}`);
});

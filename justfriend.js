require("dotenv").config();
const express = require("express");
const app = express();
var cors = require("cors");
const socket = require("socket.io");
const http = require("http");

const adminRouter = require("./routes/admin.router");
const userRouter = require("./routes/user.router");
const categoryRouter = require("./routes/category.router");
const productRouter = require("./routes/product.router");
const pushRouter = require("./routes/push.router");
const foundationRouter = require("./routes/foundation.router");
const reviewRouter = require("./routes/review.router");
const addressRouter = require("./routes/address.router");

app.use(cors());

var bodyParser = require("body-parser");
app.use(bodyParser.json());


app.use("/uploads", express.static("uploads"));
app.use("/uploads/category", express.static("uploads/category"));
app.use("/uploads/products", express.static("uploads/products"));
app.use("/uploads/userprofile", express.static("uploads/userprofile"));
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/foundation", foundationRouter);
app.use("/api/products", productRouter);
app.use("/api/push", pushRouter);
app.use("/api/review", reviewRouter);
app.use("/api/address", addressRouter);

const port = process.env.APP_PORT || 5000;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log("server up and running on PORT :", port);
});

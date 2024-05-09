const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
const db = require(`./models`);

//routers
const productRouter = require("./routes/Products");
app.use("/products", productRouter);

const transactionRouter = require("./routes/Transactions");
app.use("/transactions", transactionRouter);

const userRouter = require("./routes/Users");
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
  app.listen(2001, () => {
    //api call
    console.log("Server 2001 running");
  });
});
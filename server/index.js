//nodejs express

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require(`./models`);

//routers
const postRouter = require("./routes/Products");
app.use("/products", postRouter);

db.sequelize.sync().then(() => {
  app.listen(2001, () => {
    //api call
    console.log("Server 2001 running");
  });
});

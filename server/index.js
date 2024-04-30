//nodejs express

const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require(`./models`);

//routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter);


db.sequelize.sync().then(() => {
    app.listen(2001, () => {
        //api call
        console.log("con cac");
    });
});


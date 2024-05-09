//nodejs express
// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'

const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["POST, GET"],
    credentials: true,
  }
));

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


//for login
axios.defaults.withCredentials = true;

const verifyUser = (req,res,next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json({Message: "we need token, please provide"})
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err,decoded) => {
      if(err) {
        return res.json({Message: "Authentication Error"})
      } else {
        req.name = decoded.name;
        next();
      }
    })
  }
}

app.get('/',verifyUser, (req,res) => {
  return res.json({Message: "Success", name: req.name})
})

app.post('/Login', (req,res) => {
  const sql = "SELECT * FROM login WHERE email =? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if(err) return res.json({Message: "server side error"});
    if(data.length > 0) {
        const name = data[0].name;
        const token = jwt.sign({name}, "our-jsonwebtoken-secret-key", {expiresIn: 'Id'});
        res.cookie('token',token);
        return res.json({status: "Success"})
    } else {
        return res.json({Message: "No record exist"});
    }
  })
})

app.get('/Logout', (req,res) => { 
  res.clearCookie('token');
  return res.json({Status: "Success"})
})
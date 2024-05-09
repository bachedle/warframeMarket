const express = require("express");
const router = express.Router();
const { Users, Customers } = require("../models");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const { username, password, Email } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      Email: Email,
    });
    res.json("success");
  });
});

router.post("/Login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    res.json({error: "User not found"})
  } else {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        res.json(user);
      } else {
        res.json({error: "Incorrect password"});
      }
    });
  }
})

module.exports = router;
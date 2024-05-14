const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { email, password, Name, Status, Reputation } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      email,
      password: hashedPassword,
      Name,
      Status,
      Reputation,
    });
    res.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/Login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email: email } });
  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res
          .status(400)
          .json({ error: "Wrong Username And Password Combination" });
      } else {
        res.json({ message: "YOU LOGGED IN!!!", user: user });
      }
    });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Products } = require("../models");

// Request to get all products
router.get("/", async (req, res) => {
  const listOfProducts = await Products.findAll();
  res.json(listOfProducts);
});

// Request to get a product by its ID
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findByPk(id);
  res.json(product);
});

// Request to create a new product
router.post("/", async (req, res) => {
  // <-- Changed router.products to router.post
  const product = req.body;
  await Products.create(product);
  res.json(product);
});

module.exports = router;

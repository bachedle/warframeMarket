const express = require("express");
const router = express.Router();
const { Transactions, Products, Users } = require("../models");

router.get("/", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
router.get("/Sell", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        where: { Type: 'Sell' },
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});
router.get("/Sell/:id", async (req, res) => {
    try {
        const transactionID = req.params.id;
        const listOfTransactions = await Transactions.findAll({
            where: { ProductID: transactionID, Type: 'Sell' },
            include: [
                { model: Products },
                { model: Users }
            ],
            order: [['ID', 'DESC']] // Sort by ID column in descending order
        });
        res.json(listOfTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get("/Buy/:id", async (req, res) => {
  try {
      const transactionID = req.params.id;
      const listOfTransactions = await Transactions.findAll({
          where: { ProductID: transactionID, Type: 'Buy' },
          include: [
              { model: Products },
              { model: Users }
          ],
          order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Server error' });
  }
});

router.get("/Buy", async (req, res) => {
    try {
      const listOfTransactions = await Transactions.findAll({
        where: { Type: 'Buy' },
        order: [['ID', 'DESC']] // Sort by ID column in descending order
      });
      res.json(listOfTransactions);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params; // Correctly extract the id parameter
    const transaction = await Transactions.findByPk(id); // Use findByPk method

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    await transaction.destroy();
    res.status(200).json("success");
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "An error occurred while deleting the transaction" });
  }
});

router.put("/update", async (req, res) => {
  try {
    const { id, price, quantity } = req.body; // Correctly extract the quantity parameter
    const transaction = await Transactions.findByPk(id); // Use findByPk method
    
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    transaction.Price = price;
    transaction.Quantity = quantity;
    await transaction.save();
    res.status(200).json("success");
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "An error occurred while updating the transaction" });
  }
});


router.post("/", async (req, res) => {
  try {
    const { ProductID, UserID, Price, Type, Quantity } = req.body;
    const transaction = await Transactions.create({ ProductID, UserID, Price, Type, Quantity });
    res.json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "An error occurred while creating the transaction." });
  }
});


module.exports = router;

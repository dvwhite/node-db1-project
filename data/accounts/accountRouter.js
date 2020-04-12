const express = require("express");
const router = express.Router();

// Database helpers
const { get, getById } = require("./accountDb");

router.get("/", async (req, res) => {
  try {
    const accounts = await get();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(404).json({ message: "No accounts were found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not get accounts" });
  }
});

router.get("/:id", validateAccountId, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const account = await getById(id);
    res.status(200).json(account);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not get account" });
  }
});

// Custom middleware
async function validateAccountId(req, res, next) {
  const id = Number(req.params.id);
  try {
    const account = await getById(id);
    if (account) {
      req.account = account;
    } else {
      res.status(400).json({ message: "Invalid account id" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not get account id" });
  }

  next();
}

module.exports = router;

const express = require("express");
const router = express.Router();

// Database helpers
const { get, getById, insert, update, remove } = require("./accountDb");

// Utils
const { getMissingFields, isFalseyOrEmpty } = require("./../utils/utils");

// Routes
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

router.post("/", validateAccount, async (req, res) => {
  try {
    const account = await insert(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: "Could not add account" });
  }
});
  }
  catch (err) {
    res.status(500).json({ message: "Could not add account" })
  }
});

// Custom middleware
/**
 * @function validateAccountId: Ensures id passed to db helpers is valid
 * @param {*} req: The request object send to the API
 * @param {*} res: The response object send back from the API
 * @param {*} next: A fn that shifts place in the middleware queue forward by 1
 */
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

/**
 * @function validateAccount: Ensures valid req.body sent in a request
 * @param {*} req: The request object send to the API
 * @param {*} res: The response object send back from the API
 * @param {*} next: A fn that shifts place in the middleware queue forward by 1
 */
function validateAccount(req, res, next) {
  const required = ["name", "budget"];
  const missingFields = getMissingFields(required, Object.keys(req.body));
  if (isFalseyOrEmpty(req.body)) {
    if (missingFields) {
      return res.status(400).json({
        message: `Please provide the ${missingFields} for the account`,
      });
    }
  } else {
    return res.status(400).json({ message: "Missing account data" });
  }

  next();
}

/**
 * @function validateUpdate: Ensures valid req.body sent in a request
 * @param {*} req: The request object send to the API
 * @param {*} res: The response object send back from the API
 * @param {*} next: A fn that shifts place in the middleware queue forward by 1
 */
function validateUpdate(req, res, next) {
  if (isFalseyOrEmpty(req.body)) {
    return res.status(400).json({ message: "Missing account data" });
  }

  next();
}

module.exports = router;

const express = require("express");
const server = express();

// Middleware
server.use(express.json());
server.use(logger);

// Routes
const accountRoutes = require('./../data/accounts/accountRouter');
server.use('/accounts', accountRoutes);

// Custom middleware

// Logger
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

server.get("/", (req, res) => {
  res.status(200).json("<h2>Welcome to the Accounts API!</h2>")
})

module.exports = server;

const db = require('./../dbConfig');

module.exports = {
  get,
  getById
}

function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts")
    .where({ id })
    .first(); // return falsey value if null
};

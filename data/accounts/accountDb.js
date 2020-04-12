const db = require('./../dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
}

// The knex dbase query helpers to perform
// CRUD operations on the accounts table

// Create
function insert(account) {
  return db("accounts")
    .insert({ name: account.name, 
              budget: account.budget })
    .then(ids => {
      return getById(ids[0]);
    });
};

// Read
function get() {
  return db("accounts");
}

function getById(id) {
  return db("accounts")
    .where({ id })
    .first(); // return falsey value if null
};

// Update
function update(id, updates) {
  return db("accounts")
    .where({ id })
    .update(updates);
};

// Delete
function remove(id) {
  return db("accounts")
    .where({ id })
    .delete();
}

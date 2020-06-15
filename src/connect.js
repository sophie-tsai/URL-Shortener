const mongoose = require('mongoose');

const db = process.env.MONGODB_URL;

const connect = async (opts = {}) => {
  await mongoose.connect(db);
  mongoose.connect(db);
  mongoose.connection.once('open', () => {
    console.log('Connected to db');
  });
};

module.exports = connect;

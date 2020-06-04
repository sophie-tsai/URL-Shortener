const mongoose = require('mongoose');
const connect = (opts = {}) => {
  const url = `mongodb://localhost:27017/url-shortener`;
  mongoose.connect(url);
  mongoose.connection.once('open', () => {
    console.log('Connected to db');
  });
};

module.exports = connect;

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const connect = (url) =>  mongoose.connect(url);

module.exports = connect;

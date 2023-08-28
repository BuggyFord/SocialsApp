const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.1:7017/');

module.exports = mongoose.connection;

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.1:7017/name of database here');

module.exports = mongoose.connection;

const MongoClient = require('mongodb').MongoClient;
const url = process.env.DATABASE_URL;
let _db;
module.exports = {
  connectToServer: (callback) => {
    MongoClient.connect(url,{ useUnifiedTopology: true,useNewUrlParser: true }, (err,client) => {
      _db = client.db('cannapi');
      return callback(err);
    });
  },
  getDb: function() {
    return _db;
  }
};
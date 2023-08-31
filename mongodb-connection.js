const MongoDBClient = require("mongodb").MongoClient;

//connection URL string
const url = "mongodb://localhost:27017";

//connecting to mongodb server using connect method
MongoDBClient.connect(
  url,
  { useUnifiedTopology: true },
  function (err, client) {
    if (err) {
      console.log("Some Error While Connecting to MongoDB Server" + err);
    } else {
      console.log(
        "Connected Successfully to MongoDB Server using Node.js Driver for MongoDB"
      );
    }
    //close the Server Connection
    client.close();
  }
);

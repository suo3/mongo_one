const { MongoClient } = require("mongodb");

//connection URL string
const url = "mongodb://0.0.0.0:27017/";
dbname = "BPBOnlineBooksDB";

const client = new MongoClient(url);

// Database Name
const dbName = "BPBOnlineBooksDB";

const dbConnection = async () => {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const books = db.collection("BPBOnlineBooksCollection");
    //Add a new book to the collection
    const insertNewBook = await books.insertOne({
      "Book-title": "Harry Potter",
      "Book-author": "JK Rawling",
      "Book-ISBN": "2234567890129",
      "Book-pages": "500",
      "Book-brief-description": "The wizard world"
    });

    const listBooks = await books
      .find({ "Book-title": "Harry Potter" })
      .toArray();
    console.log(listBooks);
  } catch (error) {
    console.log(error);
  } finally {
    //close client on finish/error
    client.close();
  }
};

dbConnection().catch(console.error);

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
    /*     const insertNewBook = await books.insertOne({
      "Book-title": "Harry Potter",
      "Book-author": "JK Rawling",
      "Book-ISBN": "2234567890129",
      "Book-pages": "500",
      "Book-brief-description": "The wizard world"
    }); */

    const query = { "Book-title": "Harry Potter" };
    const options = {
      sort: { "Book-pages": 1 },
      projection: { _id: 0, "Book-title": 1, "Book-pages": 500 }
    };
    const listBooks = await books.find(query, options).toArray();
    console.log(listBooks);

    //find the storage statistics
    /*  const result = await db.command({
      dbStats: 1
    }); */
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    //close client on finish/error
    client.close();
  }
};

dbConnection().catch(console.error);

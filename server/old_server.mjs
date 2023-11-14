import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
const MongoDBObjectID = require("mongodb").ObjectId;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ exended: true }));

app.use(
  cors({
    origin: "*"
  })
);
const port = process.env.port || 3000;

//connection URL string
const url = "mongodb://0.0.0.0:27017/";

/* app.get("/", (req, res) => {
  res.send("Welcome to BPB Publications RESTFUL API 1.0");
}); */

app.listen(port, () => {
  //MongoDB Connection URL String
  //const url = "mongodb://localhost:27017/";
  const dbname = "BPBOnlineBooksDB";
  const client = new MongoClient(url);

  //Connecting to MongoDB Server using connect Method
  const dbConnection = async () => {
    try {
      await client.db(dbname);
      console.log("Connected successfully to server");
      //Select Database
      const db = client.db(dbname);
      //Get the "BPBCatalogCollection"
      const books = db.collection("BPBOnlineBooksCollection");
      const query = { "Book-title": "Harry Potter" };
      const options = {
        sort: { "Book-pages": 1 },
        projection: { _id: 0, "Book-title": 1, "Book-pages": 500 }
      };
      const listBooks = await books.find().toArray();

      console.log("Connected to MongoDB DB:" + dbname);

      //API Endpoint "getAllBPBBooks" using GET Request
      app.get("/getAllBooks", (req, res) => {
        res.send(JSON.stringify(listBooks));
      });

      // API Endpoint "/getBookById/:bookid" using GET Request
      app.get("/getBookById/:bookid", (req, res) => {
        // Retrieve the book from the database based on the provided bookid
        const bookById = books.findOne({
          _id: new MongoDBObjectID(req.params.bookid)
        });

        // Send the retrieved book as a response
        res.send(bookById);
      });

      //API Endpoint "/addNewBook" using POST Request
      /**
       * Handles a POST request to the "/addNewBook" endpoint in an Express.js application.
       * Inserts a new book into a database and sends the inserted book as the response.
       *
       * @param {Object} req - The request object containing the data sent by the client.
       * @param {Object} res - The response object used to send a response back to the client.
       */
      app.post("/addNewBook", (req, res) => {
        const insertedBook = books.insertOne(req.body);
        res.send(insertBook);
      });

      app.put("/bookRanting/:bookid", (req, res) => {
        const findBook = books.findOne({
          _id: new MongoDBObjectID(req.params.bookid)
        });
        console.log(findBook);
        if (isNaN(findBook.ranting)) {
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  dbConnection();
  //Connection Listing to Port 3000
  console.log("API APP Listening to: http://localhost:" + port);
});

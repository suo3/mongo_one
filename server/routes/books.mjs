import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//Get a list of all of the books in the collection
router.get("/", async (req, res) => {
  let collection = await db.collection("BPBOnlineBooksCollection");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

//get a book by id

router.get("/:bookid", async (req, res) => {
  const query = { _id: new ObjectId(req.params.bookid) };
  const collection = await db.collection("BPBOnlineBooksCollection");
  const results = await collection.findOne(query);

  res.send(results).status(200);
});
//create a new record
router.post("/", async (req, res) => {
  let newBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    isbnNumber: req.body.isbnNumber,
    thumbsUp: req.body.thumbsUp
  };

  let collection = await db.collection("BPBOnlineBooksCollection");
  let results = await collection.insertOne(newBook);
  res.send(results).status(200);
});

//updating existing book
router.patch("/:bookid", async (req, res) => {
  const query = { _id: new ObjectId(req.params.bookid) };

  const updateBook = {
    $set: {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      isbnNumber: req.body.isbnNumber,
      thumbsUp: req.params.thumbsUp,
      thumbsDown: req.params.thumbsDown
    }
  };
  const collection = await db.collection("BPBOnlineBooksCollection");
  const results = await collection.updateOne(query, updateBook);
  res.send(results).status(200);
});

//upating thumbsUp endpoint

router.patch("/thumbsUp/:bookid", async (req, res) => {
  const query = { _id: new ObjectId(req.params.bookid) };
  const rating = () => {
    if (isNaN(req.body.thumbsUp)) {
      return 1;
    } else {
      return req.body.thumbsUp + 1;
    }
  };
  const updateBook = {
    $set: {
      title: req.body.title,
      author: req.body.author,
      pages: req.body.pages,
      isbnNumber: req.body.isbnNumber,
      thumbsUp: rating(),
      thumbsDown: req.body.thumbsDown
    }
  };
  const collection = await db.collection("BPBOnlineBooksCollection");
  const results = await collection.updateOne(query, updateBook);
  res.send(results).status(200);
});

//delete a book
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = await db.collection("BPBOnlineBooksCollection");
  const result = await collection.deleteOne(query);

  res.send(result).status(200);
});
export default router;

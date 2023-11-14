import { MongoClient } from "mongodb";

const connectionString = process.env.DB_URL || "";

const client = new MongoClient(connectionString);

let conn;

try {
  conn = await client.connect();
} catch (e) {
  console.log(e);
}

let db = conn.db(process.env.DB_NAME);

export default db;

const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello Worlddd!");
});

app.post("/", (req, res) => {
  res.send("post success");
});

app.put("/", (req, res) => {
  res.send("put success");
});

app.delete("/", (req, res) => {
  res.send("delete success");
});

app.listen(port, () => {
  console.log(`succeses ${port}`);
});

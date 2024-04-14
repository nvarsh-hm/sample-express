const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const pool = require("pg").Pool;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
    env: process.env,
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

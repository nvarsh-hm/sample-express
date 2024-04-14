const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const pool = require("pg").Pool;

const databaseUri = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: databaseUri,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", (request, response) => {
  pool.query("SELECT * FROM User", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 3000;

const databaseUri = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUri,
  connectionTimeoutMillis: 2000,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get("/", (request, response) => {
  pool.query(`SELECT * from public."User"`, (error, results) => {
    if (error) {
      console.error("Database error:", error);
      return response.status(500).json({
        status: "fail",
        message: "Database operation failed",
        error: error.message,
      });
    }
    response.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

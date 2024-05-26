const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Snkumar30",
  database: "database1",
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

app.post("/signup", (req, res) => {
  const { fname, lname, email, password } = req.body;

  const query = "INSERT INTO users (fname, lname, email, upassword) VALUES (?, ?, ?, ?)";
  db.query(query, [fname, lname, email, password], (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data into the database");
    } else {
      console.log("User data inserted successfully");
      res.json({ success: true });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

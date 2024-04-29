require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mysql = require("mysql");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

app.get("/students", (req, res) => {
  let sql = "SELECT * FROM `students`";
  db.query(sql, (err, results, fields) => {
    if (err) {
      console.log("Query Error");
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

app.get("/students/:idno", (req, res) => {
  let id = req.params.idno;
  let sql = "SELECT * FROM `students` WHERE `id`=?";
  db.query(sql, id, (err, results, fields) => {
    if (err) {
      console.log("Query Error");
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

app.delete("/students/:id", (req, res) => {
  let id = req.params.id;
  let sql = "DELETE FROM `students` WHERE `id`=?";
  db.query(sql, id, (err, results, fields) => {
    if (err) {
      console.log("Query Error");
      res.status(500).json(err);
      return;
    }
    let resetSql = "ALTER TABLE students AUTO_INCREMENT = 1";
    db.query(resetSql, (resetErr, resetResults, resetFields) => {
      if (resetErr) {
        console.log("Reset Error");
        res.status(500).json(resetErr);
        return;
      }
      res.status(200).json(results);
    });
  });
});

app.post("/students", (req, res) => {
  let data = req.body;
  console.log("Received data:", data);
  let sql = "INSERT INTO `students`(`username`, `password`) VALUES (?, ?)"; 
  let values = [data.username, data.password]; 
  db.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log("Query Error:", err);
      // Log the error but still return a success response
      res.status(201).json({ message: "Duplicate entry but added successfully" });
    } else {
      console.log("Insertion successful:", results);
      res.status(201).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

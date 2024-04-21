const express = require("express");
const cors = require("cors");
const port = 4321;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mysql = require("mysql");
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mystudents',
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
  let sql = "SELECT * FROM `students` WHERE `idno`=?";
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

app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let sql = "UPDATE `students` SET `idno`=?, `lastname`=?, `firstname`=?, `course`=?, `level`=? WHERE `id`=?";
  let values = [data.idno, data.lastname, data.firstname, data.course, data.level, id];
  db.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log("Query Error");
      res.status(500).json(err);
      return;
    }
    res.status(200).json(results);
  });
});



app.post("/students", (req, res) => {
  let data = req.body;
  let sql = "INSERT INTO `students`(`idno`,`lastname`,`firstname`,`course`,`level`) VALUES(?,?,?,?,?)"; 
  let values = [data.idno, data.lastname, data.firstname, data.course, data.level]; 
  db.query(sql, values, (err, results, fields) => {
    if (err) {
      console.log("Query Error");
      res.status(500).json(err);
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

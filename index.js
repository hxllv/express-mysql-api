const mysql = require("mysql2");
const express = require("express");

const app = express();
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "passwd",
  database: "express_sql_api",
});

conn.connect();

/* ------- */
/* get all */
/* ------- */

app.get(`/api/courses`, (req, res) => {
  conn.query(`SELECT * FROM courses`, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

/* ------ */
/* get id */
/* ------ */

app.get(`/api/courses/:id`, (req, res) => {
  const id = req.params.id;

  conn.query(
    `SELECT * FROM courses WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;

      const eRes = evalResult(results, id);
      if (eRes) return res.status(404).send(eRes);

      res.send(results);
    }
  );
});

/* ---- */
/* post */
/* ---- */

app.post(`/api/courses`, (req, res) => {
  const name = req.body.name;

  const eBod = evalBody(req.body);
  if (eBod) return res.status(400).send(eBod);

  conn.query(
    `INSERT INTO COURSES (name) VALUES ("${name}")`,
    (error, results, fields) => {
      if (error) throw error;

      const course = {
        id: results.insertId,
        name: name,
      };

      res.send(course);
    }
  );
});

/* --- */
/* put */
/* --- */

app.put(`/api/courses/:id`, (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  conn.query(
    `SELECT * FROM courses WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;

      const eRes = evalResult(results, id);
      if (eRes) return res.status(404).send(eRes);
    }
  );

  const eBod = evalBody(req.body);
  if (eBod) return res.status(400).send(eBod);

  conn.query(
    `UPDATE courses SET name = "${name}" WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;

      const course = {
        id: id,
        name: name,
      };

      res.send(course);
    }
  );
});

/* ------ */
/* delete */
/* ------ */

app.delete(`/api/courses/:id`, (req, res) => {
  const id = req.params.id;
  let name;

  conn.query(
    `SELECT * FROM courses WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;

      name = results[0].name;

      const eRes = evalResult(results, id);
      if (eRes) return res.status(404).send(eRes);
    }
  );

  conn.query(
    `DELETE FROM courses WHERE id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;

      const course = {
        id: id,
        name: name,
      };

      res.send(course);
    }
  );
});

/* funcs */

function evalResult(results, param) {
  if (!results.length)
    return `<h1>404</h1><p>Course with given ID: <b>${param}</b> doesn't exist.`;
}

function evalBody(body) {
  const valBool = !body.name || body.name.length < 3;
  if (valBool) return `<h1>400</h1><p>Invalid name: <b>${body.name}</b>.`;
}

/* serve */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

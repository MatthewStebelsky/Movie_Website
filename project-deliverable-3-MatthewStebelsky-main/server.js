import mysql from 'mysql';
import config from './config.js';
import fetch from 'node-fetch';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import response from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post('/api/getMovies', (req, res) => {
        let connection = mysql.createConnection(config);
        let sql = 'SELECT * FROM movies';
      
        connection.query(sql, (error, results, fields) => {
          if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Failed to fetch movies' });
            return;
          }
      
          res.json({ movies: results });
        });
      
        connection.end();
      });
      
      app.post("/api/getSearch", async (req, res) => {
  try {
    const connection = mysql.createConnection(config);
    const {
      movieName,
      actorFirstName,
      actorLastName,
      directorFirstName,
      directorLastName,
    } = req.body;

    const sql = `
      SELECT DISTINCT R.reviewTitle, R.reviewContent, R.reviewScore, M.name, D.first_name, D.last_name
      FROM movies M
      INNER JOIN movies_directors MD ON M.id = MD.movie_id
      INNER JOIN directors D ON MD.director_id = D.id
      INNER JOIN roles RO ON RO.movie_id = M.id
      INNER JOIN actors A ON A.id = RO.actor_id
      LEFT JOIN Review R ON R.movieID = M.id
      WHERE M.name LIKE ?
        AND D.first_name LIKE ?
        AND D.last_name LIKE ?
        AND A.first_name LIKE ?
        AND A.last_name LIKE ?
      ORDER BY M.name ASC
    `;

    const data = [
      `%${movieName}%`,
      `%${directorFirstName}%`,
      `%${directorLastName}%`,
      `%${actorFirstName}%`,
      `%${actorLastName}%`,
    ];

    const results = await new Promise((resolve, reject) => {
      connection.query(sql, data, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });

    res.send({ express: results });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/getTrailer", async (req, res) => {
  try {
    const connection = mysql.createConnection(config);
    const {
      movieName,
      trailer
    } = req.body;

    const sql = `
      SELECT DISTINCT M.name, M.trailer
      FROM movies M
      WHERE M.trailer IS NOT NULL
    `;

    const data = [
      `%${movieName}%`,
      `${trailer}`,
    ];

    const results = await new Promise((resolve, reject) => {
      connection.query(sql, data, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });

    res.send({ express: results });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

      app.post('/api/addReview', (req, res) => {
        let connection = mysql.createConnection(config);
      
        console.log(req.body);
        let sql = 'INSERT INTO Review (reviewTitle, reviewContent, reviewScore, userID, movieID) VALUES (?, ?, ?, ?, ?)';
        let data = [req.body.reviewTitle, req.body.reviewContent, req.body.reviewScore, req.body.userID, req.body.movieID];
        console.log(data);
        connection.query(sql, data, (error, results) => {
          if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Failed to add review' });
            return;
          }

          let string = JSON.stringify(results);
          res.send({ express: string });
        });
      
        connection.end();
      });

      app.post('/api/addEmail', (req, res) => {
        let connection = mysql.createConnection(config);
      
        console.log(req.body);
        let sql = 'INSERT INTO subscription (email) VALUE (?)';
        let data = [req.body.email];
        console.log(data);
        connection.query(sql, data, (error, results) => {
          if (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Failed to add review' });
            return;
          }

          let string = JSON.stringify(results);
          res.send({ express: string });
        });
      
        connection.end();
      });
  

app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
//app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
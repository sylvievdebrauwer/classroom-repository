import express from 'express';
import * as dotenv from 'dotenv';
import {config} from "dotenv";
import cors from 'cors';
import mariadb from 'mariadb';

config()
dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

const app = express();
// Error in console log to improve the performance of the web page when adding events
// Example for 'touchstart' event
element.addEventListener('touchstart', handleTouchStart, { passive: true });
// Example for 'touchmove' event
element.addEventListener('touchmove', handleTouchMove, { passive: true });
// Example for 'mousewheel' event
element.addEventListener('mousewheel', handleMouseWheel, { passive: true });


app.listen(3000, async () => {
  console.log('Server started: http://localhost:3000/');
  let connection 

  try {
      connection = await pool.getConnection()
      const data = await connection.query("SELECT * FROM amazing_ideas");

      console.log(data)
  } catch (err) {
    throw error;

  } finally {
    if (connection) connection.end();
  }
});

app.use(cors());
app.use(express.json(/*{ limit: '50mb' }*/));

app.get('/', async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('connected to database');
        const data = await connection.query("SELECT * FROM amazing_ideas");
        console.log(data)
        res.send(data);
        } catch (error) {
            throw error;
        } finally {
            if (connection) connection.end();
        }
});

// Add a route for /amazing_ideas without an ID
app.get('/amazing_ideas', async (req, res) => {
  let connection;
  try {
      connection = await pool.getConnection();
      console.log('connected to database');
      const data = await connection.query('SELECT * FROM amazing_ideas');
      console.log(data);
      res.send(data);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) connection.end();
  }
});

// Your existing route for /amazing_ideas/:id
app.get("/amazing_ideas/:id", async (req, res) => {
  // ...
});

app.get("/amazing_ideas/:id", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection ();
        const prepare = await connection.prepare( //prepare = sql query
         "SELECT * FROM amazing_ideas WHERE id = ?" // id = 1; DROP TABLES;" or 2 queries : ?, created_at = ?
        );
        const data = await prepare.execute([req.params.id]);
        res.send(data); // send response to front end
    } catch (error) {
        throw error;
    } finally {
        if (connection) connection.end();
    }
});

// POST endpoint to add a new idea... USE PREPARE
app.post('/amazing_ideas', async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
  
    let connection;
    try {
      connection = await pool.getConnection();
      const data = await connection.query(
        'INSERT INTO amazing_ideas (title, description) VALUES (?, ?)',
        [title, description]
      );
      res.status(201).json({ message: 'Idea added successfully.', data });
    } catch (error) {
      console.error('Error adding idea:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      if (connection) connection.end();
    }
  });
  

//app.listen(PORT, () => console.log('Server started: http:localhost:${PORT}/'))





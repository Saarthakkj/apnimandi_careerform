// src/server.js
import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js'; // Import the database connection
import multer from 'multer';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to handle form submission
app.post('/submit-form', upload.single('resume'), async (req, res) => {
  const { firstName, lastName, phoneNumber, email, url } = req.body;
  const resume = req.file;

  try {
    const client = await pool.connect();
    const queryText = `
      INSERT INTO form_data (first_name, last_name, phone_number, email, url, resume_path)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [firstName, lastName, phoneNumber, email, url, resume ? resume.path : null];
    const result = await client.query(queryText, values);
    client.release();

    console.log('Form Data:', result.rows[0]);
    res.send('Form data received and stored');
  } catch (err) {
    console.error('Error storing form data', err);
    res.status(500).send('Error storing form data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
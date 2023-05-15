const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const app = express()
// parse requests of content-type - application/json
app.use(bodyParser.json())
// create database connection

// Import the database 
const db = require("./db");


// Start the server on port 8000
const PORT = 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

const cors = require('cors')
app.use(cors())
app.use(cors());

app.post('/', (req, res) => {
  // Get form data
  const data = {
    city: req.body.city,
    temperature: req.body.temperature,
    description: req.body.description,
  }
  const query = 'INSERT INTO weather (city, temperature, description) VALUES (?, ?, ?)'
  const params = [data.city, data.temperature, data.description]

  db.run(query, params, function (err, rows) {
    if (err) {
      res.status(400)
    } else {
      res.status(200)
      // Return the id of the newly created description
      res.json({ id: this.lastID })
    }
  })
})

// POST / - create a new form
app.post('/form', (req, res) => {
  const { city, temperature, description } = req.body
  console.log(req.body)
  // Convert temperature to a number
  

  // Insert the form data into the database
  db.run(
    `INSERT INTO weather (city, temperature, description)
     VALUES (?, ?, ?)`,
    [city, temperature, description],
    function (err) {
      
        console.error(err)
        return res.status(500).send('Internal server error')
      

      // Return the ID of the newly created form
  
    
    
   
    }
  )
})

// GET //:id - get a form by ID
app.get('/:id', (req, res) => {
  const id = req.params.id

  // Retrieve the form data from the database
  db.get(`SELECT * FROM weather WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error(err.message)
      return res.status(500).send('Internal server error')
    }

    // If the form doesn't exist, return a 404 error
    if (!row) {
      return res.status(404).send('Form not found')
    }

    // Return the form data
     res.send(row)
  })
})

// get all form responses
app.get('/', (req, res) => {
  // retrieve all form data from database
  db.all(`SELECT * FROM weather`, (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // return form data
    res.send(rows);
  });
});
module.exports = db

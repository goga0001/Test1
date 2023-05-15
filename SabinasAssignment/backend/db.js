const sqlite = require('sqlite3').verbose()

const DATABASE_SOURCE = 'db.sqlite'

// Initialize table and insert some sample data
let db = new sqlite.Database('./weather.db', (err) => {
  if (err) {
    throw err
    
  } else {
    console.log('Connected to the weather database')
    // Initialize table
    db.run(
      `CREATE TABLE IF NOT EXISTS weather (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city TEXT, 
            temperature INTEGER, 
            description TEXT
            
            )`,
      () => {
        // Insert sample data
        var insert =
          'INSERT INTO weather (city, temperature, description) VALUES (?,?,?)'
        db.run(insert, [
          'Berlin',
          '13',
          'Cloudy',
        ])
        db.run(insert, ['Bishkek', '28', 'Sunny'])
      }
    )
  }
})

module.exports = db

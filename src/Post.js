import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import form from 'react-bootstrap/form'
import axios from 'axios'

export default function Post() {
  const [temperature, setTemperature] = useState(0)
  const [city, setCity] = useState([])
  const [description, setDescription] = useState([])
  const [jsonData, setJsonData] = useState([])

  const submitdescription = (e) => {
    e.preventDefault()

    var details = {
       city,
       temperature,
       description,
    }


    const formBody = JSON.stringify(details)
    console.log(details)
   

    // Send POST request
    axios
      .post('http://localhost:8000/', details)
      .then((response) => {
      
        
        // Reset fields to the default values
        setCity('')
        setDescription('')
        setTemperature(0)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="search-form">
      <form onSubmit={submitdescription}>
        {/* Cityname input */}
        <form.Group className="mb-3" controlId="CitynameInput">
          <form.Label>City</form.Label>
          <form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your City"
            required
          />
        </form.Group>

        {/* Temperature input  */}
        <form.Group className="mb-3" controlId="temperatureDropdown">
          <form.Label>temperature</form.Label>
          <form.Control
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter Temperature"
            required
          />
        </form.Group>

        {/* Input description */}
        <form.Group className="mb-3" controlId="descriptionInput">
          <form.Label>description</form.Label>
          <form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description for the selected temperature"
            required
          />
        </form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

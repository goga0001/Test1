import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
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


    const FormBody = JSON.stringify(details)
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
    <div className="search-Form">
      <Form onSubmit={submitdescription}>
        {/* Cityname input */}
        <Form.Group className="mb-3" controlId="CitynameInput">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your City"
            required
          />
        </Form.Group>

        {/* Temperature input  */}
        <Form.Group className="mb-3" controlId="temperatureDropdown">
          <Form.Label>temperature</Form.Label>
          <Form.Control
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="Enter Temperature"
            required
          />
        </Form.Group>

        {/* Input description */}
        <Form.Group className="mb-3" controlId="descriptionInput">
          <Form.Label>description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description for the selected temperature"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

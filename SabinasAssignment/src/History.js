import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import axios from 'axios'

function History() {
  const [formData, setFormData] = useState([])
  const [id, setID] = useState('')
  const [newId, setNewID] = useState([])

  useEffect(() => {
    
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/`)
      const data = await response.json()
      setFormData(data)
    }
    fetchData()
  }, [])

  const SearchID = (event) => {
    event.preventDefault() // stop form submission
    const select = document.getElementById('formBasicEmail')
    const nskey = select.value
    console.log(nskey)
    if (nskey) {
      axios
        .get(`http://localhost:8000/${nskey}`)
        .then((response) => {
          console.log(response.data)
          setNewID(response.data)
          const result = JSON.stringify(response.data)
          const resultContainer = document.getElementById('result-container')
          resultContainer.innerHTML = result
          
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <>
      <Form className="search-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search Based on ID</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="100"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
        </Form.Group>
        <button onClick={SearchID}>Click</button>
      </Form>
      <div id="result-container"></div>
      <div className="form-data-container">
        {formData.map((data) => (
          <Card key={data.id} className="form-data-card">
            <Card.Body>
              <Card.Title>Form ID: {data.id}</Card.Title>
              <Card.Text>
                City: {data.city}
                <br />
                Temperature: {data.temperature}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  )
}

export default History

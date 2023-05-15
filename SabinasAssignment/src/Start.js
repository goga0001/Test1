import { useState } from 'react'
import React, { useEffect } from 'react'
import axios from 'axios'



export default function Templates() {
  const [weatherData, setWeatherData] = useState(' ')
  const [newCity, setnewCity] = useState('')
  const [newtemperature, setnewtemperature] = useState('')
  const [newDescription, setnewDescription] = useState('')

  let apiKey = '98d48454e89814601d0a8ebb1acd57ae'
  let units = 'metric'
  useEffect(() => {
    // This code will be executed when the component mounts
    handleFormSubmit({ target: { value: 'Amsterdam' } })
  }, [])

  const handleFormSubmit = (event) => {
    
  
    const cityInput = document.getElementById('city-input')
    console.log(cityInput)
    const city = cityInput.value 
    console.log(city)
    if (city) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
        )
        .then((response) => {
          console.log(response)
          showTemperature(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    window.addEventListener('load', () => {
      const cityInput = document.getElementById('city-input')
      cityInput.value = 'Amsterdam'
      handleFormSubmit(new Event('submit'))
    })

    
   

    const createQuery = () => {
        newCity = prompt(`Enter a new city}:`)
        
        axios
          .post(`http://localhost:8000/form`)
          .then((response) => {
            console.log('Template created ', response.data)
            
          })
          .catch((error) => {
            console.log(error)
            console.log(error.response.data.message)
          })
      
    }
    
    function showTemperature(response) {
      let temperatureElement = document.querySelector('#temp-today')
      let cityElement = document.querySelector('#city-header')
      let descriptionElement = document.querySelector('#description')
      let humidityElement = document.querySelector('#humidity')
      let windElement = document.querySelector('#wind')
      let dateElement = document.querySelector('#date')
      let iconTodayElement = document.querySelector('#icon-today')
      temperatureElement.innerHTML = Math.round(response.data.main.temp)
      cityElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`
      descriptionElement.innerHTML = response.data.weather[0].description
      humidityElement.innerHTML = response.data.main.humidity
      windElement.innerHTML = Math.round(response.data.wind.speed)
      
      iconTodayElement.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      )
   //   getForecast(response.data.coord)
      console.log(response.data)
    }
   

    
    function showPosition(position) {
      let latitude = position.coords.latitude
      let longitude = position.coords.longitude
      let apiKey = 'f27803b22003bacb0df7459dd6dc6bd9'
      let units = 'metric'
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`
      axios.get(apiUrl).then(showTemperature)
    }
    function getCurrentPosition(event) {
      event.preventDefault()
      navigator.geolocation.getCurrentPosition(showPosition)
    }
    let locationButton = document.querySelector('.location-button')
    locationButton.addEventListener('click', getCurrentPosition)
    
  }
  

  let now = new Date()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let currentHour = now.getHours()
  let currentDay = days[now.getDay()]
  let currentMonth = months[now.getMonth()]
  let currentDate = now.getDate()
  if (currentHour < 10) {
    currentHour = `0${currentHour}`
  }
  let currentMinutes = now.getMinutes()
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`
  }
  
    


   



  return (
    <div class="container">
      <div class="weather-application-wrapper">
        <div class="weather-application">
          <form action="" className="mb-2" id="search-form">
            <div class="row">
              <div class="col-md-5 mt-1">
                <input
                  type="text"
                  placeholder="Enter your city here"
                  id="city-input"
                  
                  autoFocus="on"
                />
              </div>
              <div class="col-2 me-0 mt-1">
                <input
                  type="submit"
                  value="Search"
                  class="search-button"
                
                  onClick={handleFormSubmit}
                />
              </div>
              <div class="col-1  me-0 mt-1">
                <button type="button" class="location-button">
                  <i class="fas fa-map-pin" id="location-icon"></i>
                </button>
              </div>
              
            </div>
          </form>
          <div class="row">
            <div class="col-8">
              Last updated: {currentDay}, {currentMonth} {currentDate} at{' '}
              {currentHour}:{currentMinutes}
              <span id="date"></span>
            </div>
            <div class="col-12" id="city-header"></div>
          </div>
          <div class="row">
            <div class="col-4">
              <div id="description"></div>
              <img src="" alt="" id="icon-today" />
            </div>
            <div class="col-4" id="show-temperature">
              <span id="temp-today"></span>
              <span class="temp-C">°C</span>
            </div>

            <div class="col-4">
              <ul class="weather-conditions">
                <li>
                  <strong>Humidity</strong> <span id="humidity"></span>%
                </li>
                <li>
                  <strong>Wind</strong> <span id="wind"></span> km/h
                </li>
              </ul>
            </div>
          </div>
          <div class="weather-forecast" id="forecast"></div>
        </div>

        <small>
          <a
            href="https://github.com/goga0001/vanilla-weather-app"
            target="_blank"
            class="github-reference"
          >
            Open source code
          </a>
          by Sabina Zhurykbay
        </small>
      </div>
    </div>
  )
}
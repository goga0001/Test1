import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Start from './Start'
import Post from './Post'
import History from './History'
import Navbar from './Navbar'


function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/post" element={<Post />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App

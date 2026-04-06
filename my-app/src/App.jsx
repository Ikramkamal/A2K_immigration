import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VisitorVisa from './pages/temporary-residence/VisitorVisa'
import Consultation from './pages/Consultation'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/residence-temporaire" element={<VisitorVisa/>} />
        <Route path="/consultation" element={<Consultation/>} />


      </Routes>
    </Router>
  )
}

export default App
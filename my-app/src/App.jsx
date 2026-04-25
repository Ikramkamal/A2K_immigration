import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
// import VisitorVisa from './pages/temporary-residence/VisitorVisa'
// import SuperVisa from './pages/temporary-residence/SuperVisa'
// import ProfessionalVisa from './pages/temporary-residence/ProfessionalVisa'
// import StudyPermit from './pages/studies/StudyPermit'
// import PermitExtension from './pages/studies/PermitExtension'
// import PostGradWorkPermit from './pages/studies/PostGradWorkPermit'
import Rapport from './pages/Rapport'
import Consultation from './pages/Consultation'

import PaymentSuccess from "./pages/payment_success";




import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />

        {/* <Route path="/visitor-visa" element={<VisitorVisa/>} />
        <Route path="/super-visa" element={<SuperVisa/>} />
        <Route path="/professional-visa" element={<ProfessionalVisa/>} />

        <Route path="/study-permit" element={<StudyPermit/>} />
        <Route path="/permit-extension" element={<PermitExtension/>} />
        <Route path="/postgrad-work-permit" element={<PostGradWorkPermit/>} />    */}

        <Route path="/rapport" element={<Rapport/>} />
        <Route path="/consultation" element={<Consultation/>} />

        <Route path="/payment-success" element={<PaymentSuccess />} />
    


      </Routes>
    </Router>
  )
}

export default App
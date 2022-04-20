import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Error/NotFound/NotFound';
import Home from './index/main/Home';
import About from './index/about/About';
import Contact from './index/contact/Contact';
import Navbar from './index/indexnav/Navbar';
import LoginRegister from './auth/loginregister/LoginRegister';
import AuthRoute from "./Utils/AuthRoute";
import EmailSent from './auth/EmailSent/EmailSent';




function App() {
  
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registerlogin/" element={<AuthRoute><LoginRegister /></AuthRoute>} />
        <Route path="/emailsent/:userEmail" element={<AuthRoute><EmailSent /></AuthRoute>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;

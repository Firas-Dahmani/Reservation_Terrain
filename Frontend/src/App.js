import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Error/NotFound/NotFound';
import Home from './index/main/Home';
import About from './index/about/About';
import Contact from './index/contact/Contact';
import Login from './auth/Login/Login';
import Register from './auth/Register/Register';
import Navbar from './index/indexnav/Navbar';
import Footer from './index/indexfooter/Footer';
import LoginRegister from './auth/loginregister/LoginRegister';


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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerlogin" element={<LoginRegister />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;

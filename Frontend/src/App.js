import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Error/NotFound/NotFound';
import Home from './index/main/Home';
import About from './index/about/About';
import Contact from './index/contact/Contact';
import Navbar from './index/indexnav/Navbar';
import LoginRegister from './auth/loginregister/LoginRegister';
import Footer from './index/indexfooter/Footer';


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
        <Route path="/registerlogin" element={<LoginRegister />} />
      </Routes>
      <Footer />
    </Router>
  </div>
  );
}

export default App;

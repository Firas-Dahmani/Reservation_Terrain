import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Error/NotFound/NotFound';
import Home from './index/main/Home';
import About from './index/about/About';
import Contact from './index/contact/Contact';
import LoginRegister from './auth/loginregister/LoginRegister';
import AuthRoute from "./Utils/AuthRoute";
import EmailSent from './auth/EmailSent/EmailSent';
import Reset from './auth/reset/reset';
import ResetPasswordDone from './auth/reset-password-done/RsetPasswordDone';
import AdminHome from './admin/adminhome/AdminHome';




function App() {
  
  return (
    <div className="App">
    <Router>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Login Register */}
        <Route path="/registerlogin/" element={<AuthRoute><LoginRegister /></AuthRoute>} />
        {/* Reset Password */}
        <Route path="registerlogin/reset" element={<AuthRoute><Reset /></AuthRoute>} />
        <Route path="registerlogin/resetPasswordDone/:userId/:resetString" element={<AuthRoute><ResetPasswordDone /></AuthRoute>} />
        {/* Email Confimation */}
        <Route path="/emailsent">
          <Route path="" element={<AuthRoute><EmailSent /></AuthRoute>} />
          <Route path=":userEmail" element={<AuthRoute><EmailSent /></AuthRoute>} />
          <Route path=":userEmail/:reset" element={<AuthRoute><EmailSent /></AuthRoute>} />
        </Route>
        {/* Admin Router */}
        <Route path="/admin" element={<AdminHome />} />
        {/* ERROR */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;

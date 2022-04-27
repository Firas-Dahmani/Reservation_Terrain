import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from './Error/NotFound/NotFound';
import Home from './index/main/Home';
import About from './index/about/About';
import Contact from './index/contact/Contact';
import LoginRegister from './auth/loginregister/LoginRegister';
import EmailSent from './auth/EmailSent/EmailSent';
import Reset from './auth/reset/reset';
import ResetPasswordDone from './auth/reset-password-done/RsetPasswordDone';
import BasicRoute from './Utils/BasicRoute';
import AuthRoute from './Utils/AuthRoute';
import { useSelector } from 'react-redux';
import AddOwner from './admin/addOwner/AddOwner';
import VilleCRUD from './admin/villeCRUD/VilleCRUD';
import { sessionService } from 'redux-react-session';
import { useState } from 'react';
import StadeCrud from './admin/stadeCRUD/StadeCrud';


function App() {
  const session = useSelector((state) => state.session);
  const { checked } = session;

  const [Role, setRole] = useState("")

  sessionService.loadUser()
    .then((User) => {
      setRole(User.data[0].role)
    })
    .catch(()=> {
      setRole("No User")
    })

  return (
    <div className="App">
    <Router>
      {checked && (
        <Routes>
        {/* Root */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<BasicRoute><About /></BasicRoute>} />
        <Route path="/contact" element={<BasicRoute><Contact /></BasicRoute>} />
        {/* Login Register */}
        <Route path="/registerlogin/" element={<BasicRoute><LoginRegister /></BasicRoute>} />
        {/* Reset Password */}
        <Route path="registerlogin/reset" element={<BasicRoute><Reset /></BasicRoute>} />
        <Route path="registerlogin/resetPasswordDone/:userId/:resetString" element={<BasicRoute><ResetPasswordDone /></BasicRoute>} />
        {/* Email Confimation */}
        <Route path="/emailsent">
          <Route path="" element={<BasicRoute><EmailSent /></BasicRoute>} />
          <Route path=":userEmail" element={<BasicRoute><EmailSent /></BasicRoute>} />
          <Route path=":userEmail/:reset" element={<BasicRoute><EmailSent /></BasicRoute>} />
        </Route>
        {/* Admin Router */}
        {
          Role === "Admin"  && 
            <>
              <Route path="/addowner" element={<AuthRoute><AddOwner/> </AuthRoute>} />
              <Route path="/stade" element={<AuthRoute><StadeCrud /> </AuthRoute>} />
              <Route path="/ville" element={<AuthRoute><VilleCRUD /> </AuthRoute>} />
            </>
        }
        {/* ERROR */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      )}
    </Router>
  </div>
  );
}

export default App;

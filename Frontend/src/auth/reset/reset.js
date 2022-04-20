import  Form from 'react-bootstrap/Form';
import '../loginregister/loginregister.css'
import  Button  from 'react-bootstrap/Button';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgetPassword } from '../../Redux-dep/actions/userActions';
import { useState } from 'react';

function Reset() {
    const [email, setEmail] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userEmailVerif = useSelector((state) => state.userEmailVerif);
    const err = userEmailVerif.error;

    const handleSubmit = async (event) =>{
        event.preventDefault();
        dispatch(forgetPassword(email, navigate))
    }

  return (
        <div className="containerr sign-up-mode">
            <div className="forms-container">
                <div className="signin-signup">
                <Form onSubmit={handleSubmit}  className="sign-up-form">
                    <h2 className="title">Forgot Password?</h2>
                    {err && <AlertCompnenet error={err}/>}
                        <Form.Group className=" mb-3 emailLogin"  controlId="emailLogin">
                            <Form.Label>Enter your email adress</Form.Label>
                            <Form.Control 
                            required  
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            className="input-field"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group >
                    <Button type="submit"  className="btn solid" >
                        Send Email
                    </Button>
                </Form>
                </div>
            </div>
        
            <div className="panels-container">
                <div className="panel left-panel"></div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Attention here !</h3>
                        <p>
                            Once you have submitted the request to reset your password, you will receive an email.  Follow the instructions in the email and your password will be reset.
                        </p>
                        <Button className="btn transparent" id="sign-up-btn" >
                            Don't Worry
                        </Button>
                    </div>
                    <img src={require("../../assets/forgotpassword.png")} className="image" alt="" />

                </div>
            </div>
        </div>
  )
}

export default Reset
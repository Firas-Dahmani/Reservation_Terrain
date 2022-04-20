import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register,login } from '../../Redux-dep/actions/userActions';
import './loginregister.css'
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';

function LoginRegister() {
    const [LoginORregiterClass, setLoginORregiterClass ] = useState("sign-in-mode")

    /* Register Code  */
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [codePostale, setCodePostale] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("Role");
    const [pic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { error } = userRegister;

    const handleSubmitRegister = async (event) =>{
        event.preventDefault();
            const variableRegister = [
                firstname,
                lastname,
                email,
                tel,
                date,
                genre,
                adress,
                ville,
                codePostale,
                password,
                role,
                pic,
                navigate
            ]
            dispatch(register(variableRegister)) 
    }

    //Verification Register


    /* Login code  */
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const userLogin = useSelector((state) => state.userLogin);
    const err = userLogin.error;

  
    const handleSubmitLogin = async (event) =>{
      event.preventDefault();
      dispatch(login(emailLogin, passwordLogin, navigate))
    }

  return (
        <>
        <div className="clearfix"></div>
                <div className= {`containerr ${LoginORregiterClass}`}>
                    <div className="forms-container">
                        <div className="signin-signup ">
                            {/* register */}
                            <Form onSubmit={handleSubmitRegister} className="sign-up-form " >
                                <h2 className="title">Register</h2>
                                {error && <AlertCompnenet error={error}/>}
                                <div className="formAll">
                                {/* <div className="Photo">
                                    <Form.Group className=" mb-3 photo"   controlId="pic">
                                    <RenderImage setPicRegister = {setPicRegister}  pic = {pic}/>
                                    </Form.Group >
                                </div> */}
                                <div className="formRegister ">
                                    <div className="firstlastname">
                                        <Form.Group className=" mb-3 firstname" controlId="firstname">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control required  className="input-field"
                                            autoFocus
                                            type="firstName"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 lastname"  controlId="lastname">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control required  className="input-field"
                                            autoFocus
                                            type="lastName"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        </Form.Group >
                                    </div>
                                    <Form.Group className=" mb-3 email"  controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required  className="input-field"
                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                        autoComplete="off" 
                                        spellCheck="false"
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    </Form.Group >
                                    <div className="telDate">
                                        <Form.Group className=" mb-3 tel"  controlId="tel">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control required  className="input-field"
                                            pattern="((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})"
                                            autoFocus
                                            type="tel"
                                            value={tel}
                                            onChange={(e) => setTel(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 "  controlId="dob">
                                            <Form.Label>Select Date</Form.Label>
                                            <Form.Control required 
                                            className="birthday"
                                            type="date" 
                                            name="dob" 
                                            placeholder="Date of Birth"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)} 
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="genreRole " >
                                        <Form.Group className=" mb-3 genre"  controlId="genre">
                                            <Form.Control required  
                                                as="select"
                                                custom ="true"
                                                defaultValue={genre}
                                                onChange={(e) => setGenre(e.target.value)}>
                                                <option disabled="disabled">Genre</option>
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                            </Form.Control >
                                        </Form.Group>
                                        <Form.Group className=" mb-3 role"  controlId="role">
                                            <Form.Control required  
                                                as="select"
                                                custom ="true"
                                                defaultValue={role}
                                                onChange={(e) => setRole(e.target.value)}>
                                                <option  disabled="disabled">Role</option>
                                                <option value="Equipe">Equipe</option>
                                                <option value="User">User</option>
                                            </Form.Control >
                                        </Form.Group>
                                    </div>
                                    <div className="Ville">
                                    <Form.Group className=" mb-3 adress"  controlId="adress">
                                    <Form.Label>Adress</Form.Label>
                                    <Form.Control required  className="input-field"
                                        autoFocus
                                        type="adress"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                    />
                                    </Form.Group >
                                    <Form.Group className=" mb-3 ville"  controlId="ville">
                                    <Form.Label>Ville</Form.Label>
                                    <Form.Control required  className="input-field"
                                        autoFocus
                                        type="ville"
                                        value={ville}
                                        onChange={(e) => setVille(e.target.value)}
                                    />
                                    </Form.Group >
                                    <Form.Group className=" mb-3 codepostale"  controlId="codePostale">
                                    <Form.Label>Code Postale</Form.Label>
                                    <Form.Control required  className="input-field"
                                        autoFocus
                                        type="codePostale"
                                        value={codePostale}
                                        onChange={(e) => setCodePostale(e.target.value)}
                                    />
                                    </Form.Group >
                                    </div>
                                    <div className="Password">
                                        <Form.Group className=" mb-3 pass"   controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        required  
                                        className="input-field"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 confirmepass"   controlId="confirmPassword">
                                        <Form.Label>Confirme Password</Form.Label>
                                        <Form.Control required  
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        className="input-field"
                                            type="Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value) }
                                        />
                                        </Form.Group >
                                    </div>
                                </div>
                                </div>
                                <Button   type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                    Register
                                </Button>
                            </Form>

                            {/* login */}
                            <Form onSubmit={handleSubmitLogin}  className="sign-in-form">
                            <h2 className="title">Login</h2>
                                {err && <AlertCompnenet error={err}/>}
                                <Form.Group className=" mb-3 emailLogin"  controlId="emailLogin">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required  
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                className="input-field"
                                    autoFocus
                                    type="email"
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />
                                </Form.Group >
                                <Form.Group className=" mb-3 passwordLogin"   controlId="passwordLogin">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required  
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                className="input-field"
                                    type="password"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                                </Form.Group >
                                <p className="social-text" sx={{fontWeight: 'bold'}}>
                                    <Link to='reset'>Forgot password?</Link>
                                </p>
                                <Button  type="submit"  className="btn solid">
                                Login
                                </Button>
                            </Form>
                        </div>
                    </div>

                    <div className="panels-container">

                        <div className="panel left-panel">
                        <div className="content">
                            <h3>New User ?</h3>
                            <p>
                            There’s absolutely no need for me to go to the gym. The name of the cashier at the FoodZone’s I frequent is
                            Jim, so same thing!
                            </p>
                            <Button className="btn transparent" id="sign-up-btn" onClick={() => setLoginORregiterClass("sign-up-mode")}>
                                REGISTER
                            </Button>
                        </div>
                        <img src={require('../../assets/login.png')} className="image" alt="" />
                        </div>

                        <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                            There’s absolutely no need for me to go to the gym. The name of the cashier at the FoodZone’s I frequent is
                            Jim, so same thing!
                            </p>
                            <Button className="btn transparent" id="sign-in-btn" onClick={()=> setLoginORregiterClass("sign-in-mode")}>
                                LOGIN
                            </Button>
                        </div>
                        <img src={require('../../assets/register.png')} className="image" alt="" />
                        </div>
                    </div>
                </div>            
        </>
  )
}

export default LoginRegister
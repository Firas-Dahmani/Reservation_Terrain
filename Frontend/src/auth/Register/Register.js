import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from '@mui/material'
import Registercss from "./Register.module.css"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from './../../Redux-dep/actions/userActions';
import RenderImage from './Image/Image';

function Register() {
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
    const [pic, setPicRegister] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [message, setMessage] = useState("");
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister)

    const { loading, error, userInfo } = userRegister
 
    useEffect(() => {
        if (userInfo){
        navigate('/')
        }
    }, [navigate,userInfo])

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            setMessage("Password Not Match !")
        }else{
            dispatch(register(
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
                pic
            )) 
        }
    }
  return (
    <div className={Registercss.cont}>
        <Card style={{ width: '25rem' , padding:'20px'}}  className=' d-flex justify-content-center m-auto'>
        {
            error && 
            <Alert severity="error" style={{fontSize: 20}}>
              <strong>{error}</strong>
            </Alert>
        }
        {
            message && 
            <Alert severity="error" style={{fontSize: 20}}>
              <strong>{message}</strong>
            </Alert>
        }
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" size="lg" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="firstName"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="lastName"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="tel">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="tel"
                    value={tel}
                    onChange={(e) => setTel(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="dob">
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                    type="date" 
                    name="dob" 
                    placeholder="Date of Birth"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" size="lg" controlId="genre">
                    <Form.Control 
                        as="select"
                        custom ="true"
                        defaultValue={genre}
                        onChange={(e) => setGenre(e.target.value)}>
                        <option disabled="disabled">Genre</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" size="lg" controlId="adress">
                <Form.Label>Adress</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="adress"
                    value={adress}
                    onChange={(e) => setAdress(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="ville">
                <Form.Label>Ville</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="ville"
                    value={ville}
                    onChange={(e) => setVille(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="codePostale">
                <Form.Label>Code Postale</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="codePostale"
                    value={codePostale}
                    onChange={(e) => setCodePostale(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3"  size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control className="text-muted"
                    onFocus={()=> setMessage("")}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3"  size="lg" controlId="confirmPassword">
                <Form.Label>Confirme Password</Form.Label>
                <Form.Control className="text-muted"
                    onFocus={()=> setMessage("")}
                    type="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                />
                </Form.Group >
                <Form.Group className="mb-3"  size="lg" controlId="pic">
                <RenderImage setPicRegister = {setPicRegister}  pic = {pic}/>
                </Form.Group >
                <Form.Group className="mb-3" size="lg" controlId="role">
                    <Form.Control 
                        as="select"
                        custom ="true"
                        defaultValue={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option  disabled="disabled">Role</option>
                        <option value="Equipe">Equipe</option>
                        <option value="User">User</option>
                    </Form.Control>
                </Form.Group>
                <Button  size="lg" type="submit"  /* disabled={!validateForm() || loading} */>
                    Register
                </Button>
            </Form>
        </Card>
    </div>
  )
}

export default Register
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Logincss from "./Login.module.css";
import { Alert } from '@mui/material'
import { useNavigate } from "react-router-dom";
import {  useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux-dep/actions/userActions';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin)

  const { loading, error, userInfo } = userLogin

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  useEffect(() => {
    if (userInfo){
      navigate('/')
    }
  }, [navigate,userInfo])

  const handleSubmit = async (event) =>{
    event.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <div className={Logincss.cont}>
        <Card style={{ width: '18rem' , padding:'20px'}}  className=' d-flex justify-content-center m-auto'>
        {
            error && 
            <Alert severity="error" style={{fontSize: 20}}>
              <strong>{error}</strong>
            </Alert>
        }
            <Form onSubmit={handleSubmit} >
                <Form.Group className="mb-3" size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control className="text-muted"
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group >
                <Form.Group className="mb-3"  size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control className="text-muted"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group >
                <Button size="lg" type="submit"  disabled={!validateForm() || loading}>
                Login
                </Button>
            </Form>
        </Card>
    </div>
  );
}
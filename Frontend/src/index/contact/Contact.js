import './contact.css'
import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contactAction } from '../../Redux-dep/actions/contactActions';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import Navbar from '../indexnav/Navbar';

function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [messageContact, setMessage] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contact = useSelector((state) => state.contact);
    const err = contact.error;

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const variableContact = [
      name,
      email,
      phone,
      company,
      messageContact
    ]
    dispatch(contactAction(variableContact, navigate))
  }


  return (
      <>
        <Navbar />
        <div className="contentContact">
          <div className="container">
            <div className="row align-items-stretch no-gutters contact-wrap">
              <div className="col-md-8">
                <div className="form h-100">
                  <h3>Send us a message</h3>
                  <Form onSubmit={handleSubmit} className="contactform"  id="" >
                  {err && <AlertCompnenet error={err}/>}
                    <div className="row">
                      <Form.Group className="col-md-6 form-group mb-5"  controlId="name">
                        <Form.Label className='col-form-label'>Name *</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Your name" 
                        className="form-control"
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group >
                      <Form.Group className="col-md-6 form-group mb-5"  controlId="email">
                        <Form.Label className='col-form-label'>Email</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Your email" 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group >
                    </div>

                    <div className="row">
                      <Form.Group className="col-md-6 form-group mb-5"  controlId="phone">
                        <Form.Label className='col-form-label'>Phone</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Phone #" 
                        className="form-control"
                        type="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        />
                      </Form.Group >
                      <Form.Group className="col-md-6 form-group mb-5"  controlId="company">
                        <Form.Label className='col-form-label'>Company</Form.Label>
                        <Form.Control 
                        required 
                        placeholder="Company" 
                        className="form-control"
                        type="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        />
                      </Form.Group >
                    </div>

                    <div className="row " >
                      <Form.Group className=" form-group mb-3 "  controlId="message">
                        <Form.Label className='col-form-label'>Message *</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        cols={30} 
                        rows={4}
                        required 
                        placeholder="Write your message" 
                        className="form-control"
                        
                        value={messageContact}
                        onChange={(e) => setMessage(e.target.value)}
                        />
                      </Form.Group >
                    </div>
                    <Button type="submit" className='btn btn-primary rounded-6 py-2 buttonContact px-4'>
                          Send
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="col-md-4">
                <div className="contact-info h-100">
                  <h3>Contact Information</h3>
                  <p className="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, magnam!</p>
                  <ul className="list-unstyled">
                    <li className="d-flex">
                      <span className="text">9757 Aspen Lane South Richmond Hill, NY 11419</span>
                    </li>
                    <li className="d-flex">
                      <span className="text">+1 (291) 939 9321</span>
                    </li>
                    <li className="d-flex">
                      <span className="wrap-icon icon-envelope mr-3"></span>
                      <span className="text">info@mywebsite.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}



export default Contact
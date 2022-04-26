import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from './../adminnav/Navbar';
import './AddOwner.css'
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import { addOwnerAction } from '../../Redux-dep/actions/AdminActions';

function AddOwner() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    
    
    const dispatch = useDispatch();
    const addOwner = useSelector((state) => state.addOwner);
    const { userInfo, error } = addOwner;

    useEffect(()=>{
        setFirstName("")
        setLastName("")
        setEmail("")
        setTel("")
        setDate("")
        setGenre("Genre")
        setAdress("")
        setVille("")
    },[userInfo])
    const handleSubmit = async (event) =>{
        event.preventDefault();
            const variableRegister = [
                firstname,
                lastname,
                email,
                tel,
                date,
                genre,
                adress,
                ville
            ]
            dispatch(addOwnerAction(variableRegister)) 
    }

  return (
      <>
        <AdminNavbar />
        <div className="contentContact">
            <div className="container">
                <div className="row align-items-stretch no-gutters contact-wrap">
                <div className="col-md-4 icon-content">
                        <div className="h-100">
                            <div className="avatar-container">
                                <div className="avatar">
                                    <img src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"  className='avatar-img'/>
                                </div>
                            </div>
                            <div className="row userInfo">
                                <div className='mb-5'>First Name : {userInfo?.user?.lastName}</div> 
                                <div className='mb-5'> Last Name :{userInfo?.user?.firstName}</div> 
                                <div className='mb-5'> Ville : {userInfo?.user?.Ville}</div> 
                                <div className='mb-5'>Password : {userInfo?.Password}</div> 
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form h-100">
                            <h3>Send us a message</h3>
                            <Form onSubmit={handleSubmit} id="" >
                            {error && <AlertCompnenet error={error}/>}
                                <div className="row">
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="firstName">
                                    <Form.Label className='col-form-label'>First Name</Form.Label>
                                    <Form.Control 
                                    required 
                                    placeholder="First name" 
                                    className="form-control"
                                    type="name"
                                    value={firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Group >
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="lastName">
                                    <Form.Label className='col-form-label'>Last Name</Form.Label>
                                    <Form.Control 
                                    required 
                                    placeholder="Last name" 
                                    className="form-control"
                                    type="name"
                                    value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Group >
                                </div>
                                <div className="row">
                                    <Form.Group className=" form-group mb-5"  controlId="email">
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
                                    value={tel}
                                    onChange={(e) => setTel(e.target.value)}
                                    />
                                </Form.Group >
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="dob">
                                    <Form.Label className='col-form-label'>Select Date</Form.Label>
                                    <Form.Control required 
                                    className="form-control"
                                    type="date" 
                                    name="dob" 
                                    placeholder="Date of Birth"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)} 
                                    />
                                </Form.Group>
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="genre">
                                <Form.Label className='col-form-label'>Genre</Form.Label>
                                    <Form.Control required  
                                        as="select"
                                        custom ="true"
                                        className="form-control"
                                        defaultValue={genre}
                                        onChange={(e) => setGenre(e.target.value)}>
                                        <option disabled="disabled">Genre</option>
                                        <option value="Homme">Homme</option>
                                        <option value="Femme">Femme</option>
                                    </Form.Control >
                                </Form.Group>
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="adress">
                                    <Form.Label className='col-form-label'>Adress</Form.Label>
                                    <Form.Control 
                                    required 
                                    placeholder="Adress" 
                                    className="form-control"
                                    type="adress"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                    />
                                </Form.Group >
                                </div>
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="ville">
                                    <Form.Label className='col-form-label'>Ville</Form.Label>
                                    <Form.Control 
                                    required 
                                    placeholder="Ville" 
                                    className="form-control"
                                    type="ville"
                                    value={ville}
                                    onChange={(e) => setVille(e.target.value)}
                                    />
                                </Form.Group >

                                <Button type="submit" className='main-btn'>
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default AddOwner
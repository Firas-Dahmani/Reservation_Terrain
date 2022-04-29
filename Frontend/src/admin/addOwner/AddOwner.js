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
               <div className="row">
                <div className="col-lg-4">
                        <div className="profile-card-4 z-depth-3">
                            <div className="card">
                                <div className="card-body text-center  rounded-top ">
                                    <div className="user-box mb-3">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                                    </div>
                                    <h5 className="mb-1 text-black">{userInfo?.user?.firstName} {userInfo?.user?.lastName}</h5>
                                    <h6 className="text-black">{userInfo?.user?.role}</h6>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group shadow-none">
                                        <li className="list-group-item">
                                            <div className="list-details">
                                                <span>Password :</span>
                                                <small>{userInfo?.Password}</small>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="row text-center mt-4"></div>
                                </div>
                                <div className="card-footer text-center"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body">
                                <h3>ADD OWner</h3>
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
                                    <Form.Group className="mb-3"  controlId="phone">
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
                                    </div>
                                    <div className="row">
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

                                    <Button type="submit" className='main-btn'>
                                        Save
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
      </>
  )
}

export default AddOwner
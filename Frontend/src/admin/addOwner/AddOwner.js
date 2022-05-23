import  Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminNavbar from './../adminnav/Navbar';
import './AddOwner.css'
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import { addOwnerAction } from '../../Redux-dep/actions/AdminActions';
import Loading from './../../loading/Loading';

function AddOwner() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");
    
    
    const dispatch = useDispatch();
    const addOwner = useSelector((state) => state.addOwner);
    const { userInfo, error, loading } = addOwner;

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

        // Input validation
        let regFirstName = /^[a-zA-Z]+$/
        let regLastName = /^[a-zA-Z]+$/
        let regEmail = /\S+@\S+\.\S+/
        let regPhone = /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/
        let regAdress = /^[a-zA-Z0-9\s,'-]*$/
        if(!regFirstName.test(firstname)){
            setErrorMessage("Prénom non valide !")
        }else if(!regLastName.test(lastname)){
            setErrorMessage("Nom non valide !")
        }else if(!regEmail.test(email)){
            setErrorMessage("Email non valide !")
        }else if(!regPhone.test(tel)){
            setErrorMessage("Telephone non valide !")
        }else if(date === ""){
            setErrorMessage("Date non valide !")
        }else if(genre === "Genre"){
            setErrorMessage("Genre non valide !")
        }else if(ville === ""){
            setErrorMessage("Ville non valide !")
        }else if(!regAdress.test(adress) || adress === ""){
            setErrorMessage("Adress non valide !")
        } else {
            setErrorMessage("")
            dispatch(addOwnerAction(variableRegister)) 
        }

            
    }

  return (
      <>
        <AdminNavbar />
        <div className="main-wrapper">
            <div className="container-fluid">
                <div className="row">
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
                                                            <span>Mot de passe : </span>
                                                            {loading ? <Loading/> : <small>{userInfo?.Password}</small>}
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
                                            <h3 className='mb-5'>Ajouter un propriétaire</h3>
                                            <Form onSubmit={handleSubmit} id="" >
                                                {error && <AlertCompnenet error={error}/>}
                                                {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
                                                <div className="row">
                                                <Form.Group className="col-md-6 form-group mb-5"  controlId="firstName">
                                                    <Form.Label className='col-form-label'>Prénom</Form.Label>
                                                    <Form.Control 
                                                        placeholder="First name" 
                                                        className="form-control"
                                                        type="name"
                                                        value={firstname}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </Form.Group >
                                                <Form.Group className="col-md-6 form-group mb-5"  controlId="lastName">
                                                    <Form.Label className='col-form-label'>Nom</Form.Label>
                                                    <Form.Control 
            
                                                    placeholder="Last name" 
                                                    className="form-control"
                                                    type="name"
                                                    value={lastname}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </Form.Group >
                                                </div>
                                                <div className="row">
                                                    <Form.Group className="col-md-8 form-group mb-3"  controlId="email">
                                                        <Form.Label className='col-form-label'>Adresse e-mail</Form.Label>
                                                        <Form.Control 
                                                        placeholder="Your email" 
                                                        className="form-control"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </Form.Group >
                                                    <Form.Group className="col-md-4 form-group mb-3"  controlId="phone">
                                                        <Form.Label className='col-form-label'>Téléphone</Form.Label>
                                                        <Form.Control 
                                                        placeholder="Phone #" 
                                                        className="form-control"
                                                        type="phone"
                                                        value={tel}
                                                        onChange={(e) => setTel(e.target.value)}
                                                        />
                                                    </Form.Group >
                                                </div>
                                                <div className="row">
                                                <Form.Group className="col-md-8  mb-3"  controlId="dob">
                                                    <Form.Label className='col-form-label'>Date de naissance</Form.Label>
                                                    <Form.Control
                                                    className="form-control"
                                                    type="date" 
                                                    name="dob" 
                                                    placeholder="Date of Birth"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)} 
                                                    />
                                                </Form.Group>
                                                <Form.Group className="col-md-4  mb-3"  controlId="genre">
                                                <Form.Label className='col-form-label'>Sexe</Form.Label>
                                                    <Form.Control  
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
            </div>
        </div>
        
      </>
  )
}

export default AddOwner
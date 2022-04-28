import AdminNavbar from './../adminnav/Navbar';
import { Link } from 'react-router-dom';
import Form  from 'react-bootstrap/Form';
import { useState } from 'react';
import Button  from 'react-bootstrap/Button';

function Profile() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [poste, setPoste] = useState("Poste");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  return (
    <>
        <AdminNavbar />
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="profile-card-4 z-depth-3">
                        <div className="card">
                            <div className="card-body text-center bg-primary rounded-top">
                                <div className="user-box">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user avatar" />
                                </div>
                                <h5 className="mb-1 text-white">Jhon Doe</h5>
                                <h6 className="text-light">Admin</h6>
                            </div>
                            <div className="card-body">
                                <ul className="list-group shadow-none">
                                <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-phone-square"></i>
                                </div>
                                <div className="list-details">
                                    <span>9910XXXXXX</span>
                                    <small>Mobile Number</small>
                                </div>
                                </li>
                                <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="list-details">
                                    <span>info@example.com</span>
                                    <small>Email Address</small>
                                </div>
                                </li>
                                <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-globe"></i>
                                </div>
                                <div className="list-details">
                                    <span>www.example.com</span>
                                    <small>Website Address</small>
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
                    <div className="card z-depth-3">
                        <div className="card-body">
                            <ul className="nav nav-pills nav-pills-primary nav-justified">
                                <li className="nav-item">
                                    <Link to="/profile" data-target="#profile" data-toggle="pill" className="nav-link active show"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" data-target="#messages" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Messages</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Edit</span></Link>
                                </li>
                            </ul>
                            <div className="tab-content p-3">
                                <div className="tab-pane active show" id="profile">
                                    <h5 className="mb-3">User Profile</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                        <h6>About</h6>
                                        <p>
                                            Web Designer, UI/UX Engineer
                                        </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="messages">
                                    <table className="table table-hover table-striped">
                                        <tbody>                                    
                                            <tr>
                                                <td>
                                                <span className="float-right font-weight-bold">3 hrs ago</span> Here is your a link to the latest summary report from the last kingdom march 
                                                </td>
                                            </tr>
                                        </tbody> 
                                    </table>
                                </div>
                                <div className="tab-pane " id="edit">
                                    <Form /* onSubmit={handleSubmitRegister} */  >
                                        <h5 className="mb-3">Edit Profile</h5>
                                        {/* {error && <AlertCompnenet error={error}/>} */}
                                        {/* <div className="Photo">
                                            <Form.Group className=" mb-3 photo"   controlId="pic">
                                            <RenderImage setPicRegister = {setPicRegister}  pic = {pic}/>
                                            </Form.Group >
                                        </div> */}
                                            <div className="row">
                                                <Form.Group className=" mb-3 editForm " controlId="firstname">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control required  className="form-control"
                                                        autoFocus
                                                        type="firstName"
                                                        value={firstname}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </Form.Group >
                                                <Form.Group className=" mb-3 "  controlId="lastname">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control required  className="form-control"
                                                        autoFocus
                                                        type="lastName"
                                                        value={lastname}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </Form.Group >
                                            </div>
                                            <div className="row">
                                                <Form.Group className=" mb-3 "  controlId="email">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control required  className="form-control"
                                                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                        autoComplete="off" 
                                                        spellCheck="false"
                                                        autoFocus
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </Form.Group >
                                                <Form.Group className=" mb-3 "  controlId="genre">
                                                    <Form.Control required 
                                                        className="form-control" 
                                                        as="select"
                                                        custom ="true"
                                                        defaultValue={genre}
                                                        onChange={(e) => setGenre(e.target.value)}>
                                                        <option disabled="disabled">Genre</option>
                                                        <option value="Homme">Homme</option>
                                                        <option value="Femme">Femme</option>
                                                    </Form.Control >
                                                </Form.Group>
                                            </div>
                                            <div className="row">
                                                <Form.Group className=" mb-3 tel"  controlId="tel">
                                                    <Form.Label>Phone Number</Form.Label>
                                                    <Form.Control required  className="form-control"
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
                                                    className='form-control'
                                                    type="date" 
                                                    name="dob" 
                                                    placeholder="Date of Birth"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)} 
                                                    />
                                                </Form.Group>
                                            </div>
                                            <div className="row">
                                                <Form.Group className=" mb-3 adress"  controlId="adress">
                                                    <Form.Label>Adress</Form.Label>
                                                    <Form.Control required  className="form-control"
                                                        autoFocus
                                                        type="adress"
                                                        value={adress}
                                                        onChange={(e) => setAdress(e.target.value)}
                                                    />
                                                </Form.Group >
                                                <Form.Group className=" mb-3 ville"  controlId="ville">
                                                    <Form.Label>Ville</Form.Label>
                                                    <Form.Control required  className="form-control"
                                                        autoFocus
                                                        type="ville"
                                                        value={ville}
                                                        onChange={(e) => setVille(e.target.value)}
                                                    />
                                                </Form.Group >
                                            </div>
                                            <div className="row">
                                                <Form.Group className=" mb-3 pass"   controlId="password">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control 
                                                    required  
                                                    className="form-control"
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
                                                    className="form-control"
                                                        type="Password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value) }
                                                    />
                                                </Form.Group >
                                            </div>
                                        <Button  type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                            EDIT
                                        </Button>
                                    </Form>
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

export default Profile
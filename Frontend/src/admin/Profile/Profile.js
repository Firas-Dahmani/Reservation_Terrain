import AdminNavbar from './../adminnav/Navbar';
import { Link } from 'react-router-dom';
import Form  from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button  from 'react-bootstrap/Button';
import RenderImage from './Image/Image';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { profileSeenAction, updatePicAction } from '../../Redux-dep/actions/AdminActions';
import Loading from '../../loading/Loading';

function Profile() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("Genre");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [UserID, setUserID] = useState("")

    
    const dispatch = useDispatch()

    const profileSeen = useSelector((state) => state.profileSeen)
    const { seeProfile, loading, error } = profileSeen

    const updatePic = useSelector((state) => state.updatePic)
    const { success : UploadPhotoSUCCESS, loading : LoadUploadPhoto, error: errorPhotoUpload } = updatePic

    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
            /* setPic(seeProfile?.pic) */
        })
    useEffect(()=> {
        dispatch(updatePicAction(UserID, pic))
    }, [pic])

    useEffect(()=> {
        dispatch(profileSeenAction(UserID))
        },[dispatch,
            UploadPhotoSUCCESS,
            UserID])


    return (
    <>
        <AdminNavbar />
        {
            loading ?
                <Loading />
            :
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="profile-card-4 z-depth-3">
                                <div className="card text-center">
                                    <div className="col-sm mb-3">
                                        <RenderImage setPicRegister = {setPic}  pic = {seeProfile?.pic}/>
                                        <h5 className=" text-black">{seeProfile?.firstName + " " + seeProfile?.lastName}</h5>
                                        <h6 className="text-black">{seeProfile?.role}</h6>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group shadow-none">
                                        <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-phone-square"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>{seeProfile?.tel}</span>
                                        </div>
                                        </li>
                                        <li className="list-group-item">
                                        <div className="list-icon">
                                            <i className="fa fa-envelope"></i>
                                        </div>
                                        <div className="list-details">
                                            <span>{seeProfile?.email}</span>
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
                                                    <h6>Birth Day</h6>
                                                    <p>
                                                        {seeProfile?.birthDay.split('T')[0]}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Genre</h6>
                                                    <p>
                                                        {seeProfile?.Genre}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Ville</h6>
                                                    <p>
                                                        {seeProfile?.Ville}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Adress</h6>
                                                    <p>
                                                        {seeProfile?.adress}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="messages">
                                            <table className="table table-hover table-striped">
                                                <tbody>                                    
                                                    <tr>
                                                        <td>
                                                            <div className='text-left '><strong>Name : </strong> your name </div>
                                                            <div className='text-left '><strong>From : </strong> your email</div>
                                                            <div className='text-left '><strong>Phone : </strong> your phone</div>
                                                            <div className=''>
                                                                <div className="messages-list">
                                                                    Here is your a link to the latest summary report from the last kingdom march 
                                                                    foijezofijezoifjezoi^jfêziojfoiezjfoiêzjfoiezjfoiêzjfoiezjfoîezjfôiezjfoiezjfoiez
                                                                    fejkzbfljkezbflkjzenfkejznfkmezjnfezjk
                                                                </div>
                                                                <span className=" text-primary float-left font-weight-bold ">3 hrs ago</span> 
                                                                <i className="fa fa-trash delete float-right" /* onClick={()=>handleDelete(item._id)} */></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody> 
                                            </table>
                                        </div>
                                        <div className="tab-pane"  id="edit">
                                            <div className="card">
                                                <div className="card-body">
                                                <h5 className="mb-3">Edit Profile</h5>
                                                    <Form /* onSubmit={handleSubmitRegister} */  >
                                                    
                                                    {/* {error && <AlertCompnenet error={error}/>} */}
                                                    
                                                        <div className="row">
                                                            <Form.Group className="col-md-6 form-group mb-5" controlId="firstname">
                                                                <Form.Label>First Name</Form.Label>
                                                                <Form.Control required  className="form-control"
                                                                    autoFocus
                                                                    type="firstName"
                                                                    value={firstname}
                                                                    onChange={(e) => setFirstName(e.target.value)}
                                                                />
                                                            </Form.Group >
                                                            <Form.Group className="col-md-6 form-group mb-5"  controlId="lastname">
                                                                <Form.Label>Last Name</Form.Label>
                                                                <Form.Control required  className="form-control"
                                                                    autoFocus
                                                                    type="lastName"
                                                                    value={lastname}
                                                                    onChange={(e) => setLastName(e.target.value)}
                                                                />
                                                            </Form.Group >
                                                        </div>
                                                        <div className="row ">
                                                            <Form.Group className=" col-md-6 form-group mb-5 "  controlId="email">
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
                                                            <Form.Group className=" col-md-6 form-group mb-5"  controlId="genre">
                                                            <Form.Label>Genre</Form.Label>
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
                                                            <Form.Group className="col-md-6 form-group mb-5tel"  controlId="tel">
                                                                <Form.Label>Phone Number</Form.Label>
                                                                <Form.Control required  className="form-control"
                                                                    pattern="((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})"
                                                                    autoFocus
                                                                    type="tel"
                                                                    value={tel}
                                                                    onChange={(e) => setTel(e.target.value)}
                                                                />
                                                            </Form.Group >
                                                            <Form.Group className="col-md-6 form-group mb-5"  controlId="dob">
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
                                                            <Form.Group className="col-md-6 form-group mb-5adress"  controlId="adress">
                                                                <Form.Label>Adress</Form.Label>
                                                                <Form.Control required  className="form-control"
                                                                    autoFocus
                                                                    type="adress"
                                                                    value={adress}
                                                                    onChange={(e) => setAdress(e.target.value)}
                                                                />
                                                            </Form.Group >
                                                            <Form.Group className="col-md-6 form-group mb-5ville"  controlId="ville">
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
                                                            <Form.Group className="col-md-6 form-group mb-5pass"   controlId="password">
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
                                                            <Form.Group className="col-md-6 form-group mb-5confirmepass"   controlId="confirmPassword">
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
                    </div>
                </div>
            </>
        }
    </>
  )
}

export default Profile
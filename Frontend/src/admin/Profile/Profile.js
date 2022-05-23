import AdminNavbar from './../adminnav/Navbar';
import { Link } from 'react-router-dom';
import Form  from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button  from 'react-bootstrap/Button';
import RenderImage from './Image/Image';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { contactMeesageDeleteAction, contactMeesageSeenAction, profileSeenAction, updatePicAction, updateUserProfile } from '../../Redux-dep/actions/AdminActions';
import Loading from '../../loading/Loading';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';

function Profile() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("");
    const [UserID, setUserID] = useState("")
    const [ErrorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch()

    

    const profileSeen = useSelector((state) => state.profileSeen)
    const { seeProfile, loading, error } = profileSeen

    const contactMessageSeen = useSelector((state) => state.contactMessageSeen)
    const { Message, loading:contactMessageSeenLoading, error:contactMessageSeenERROR } = contactMessageSeen

    const updatePic = useSelector((state) => state.updatePic)
    const { success : UploadPhotoSUCCESS, loading : LoadUploadPhoto } = updatePic

    const contactMessageDelete = useSelector((state) => state.contactMessageDelete)
    const { success : deleteMessageSUCCESS, loading : deleteMessageLoading, error: deleteMessageError } = contactMessageDelete

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success : userUpdateSUCCESS, loading : userUpdateLoading, error: userUpdateError } = userUpdate
    
    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
        })

    useEffect(()=> {
        if(UserID){
            dispatch(updatePicAction(UserID, pic))
        }
    }, [dispatch,
        UserID,
        pic
    ])

    useEffect(()=> {
        if(UserID){
            dispatch(profileSeenAction(UserID))
        }
    },[dispatch,
        UploadPhotoSUCCESS,
        UserID,
        userUpdateSUCCESS
    ])


    useEffect(()=> {
        if(UserID){
            dispatch(contactMeesageSeenAction(UserID))
        }
    },[dispatch,
        UserID,
        deleteMessageSUCCESS
    ])

    const handleDelete = (id) =>{
        dispatch(contactMeesageDeleteAction(id))
      }

      const handleSubmit = async (event) =>{
        event.preventDefault();
        if(date.type !== undefined){ setDate(seeProfile?.birthDay)}

            const variableUpdateProfile = [
                UserID,
                firstname,
                lastname,
                email, 
                tel,
                date,
                genre,
                adress,
                ville,
                password
            ]

            if ( password !== confirmPassword){
                setErrorMessage("Password not match !")
            } else {
                setErrorMessage("")
                dispatch(updateUserProfile(variableUpdateProfile))
            } 
    }


    return (
    <>
        <AdminNavbar />
        {
            loading || userUpdateLoading || deleteMessageLoading || LoadUploadPhoto || contactMessageSeenLoading ?
                <Loading />
            :
            <>
                <section className='main-wrapper'>
                <div className="container-fluid">
                    <div className="row">
                    {deleteMessageError && <AlertCompnenet error={deleteMessageError}/>}
                    {contactMessageSeenERROR && <AlertCompnenet error={contactMessageSeenERROR}/>}
                    {error && <AlertCompnenet error={error}/>}
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="profile-card-4 z-depth-3">
                                <div className="card text-center">
                                    <div className=" mb-3">
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
                                            <Link to="#" data-target="#profil" data-toggle="pill" className="nav-link active show"><i className="icon-user"></i> <span className="hidden-xs">Profile</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" data-target="#messages" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Messages</span></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" data-target="#edit" data-toggle="pill" className="nav-link"><i className="icon-note"></i> <span className="hidden-xs">Edit</span></Link>
                                        </li>
                                    </ul>
                                    <div className="tab-content p-3">
                                        <div className="tab-pane active show" id="profil">
                                            <h5 className="mb-3">A-propos</h5>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6>Date de naissance</h6>
                                                    <p>
                                                        {seeProfile?.birthDay.split('T')[0]}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Sexe</h6>
                                                    <p>
                                                        {seeProfile?.Genre}
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h6>Ville</h6>
                                                    <p>
                                                        {seeProfile?.VilleID}
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
                                                    {
                                                        Message && Message.length !== 0 ? 

                                                        Message.map((item, i)=> (                                   
                                                            <tr key={i}>
                                                                <td>
                                                                    <div className='text-left '><strong>Nom : </strong> {item.name} </div>
                                                                    <div className='text-left '><strong>Email : </strong> {item.email}</div>
                                                                    <div className='text-left '><strong>Téléphone : </strong> {item.phone}</div>
                                                                    <div className=''>
                                                                        <div className="messages-list">{item.message}</div>
                                                                        <span className=" text-primary float-left font-weight-bold ">{item.createAt.split('T')[0]}</span> 
                                                                        <i className="fa fa-trash delete float-right" onClick={()=>handleDelete(item._id)}></i>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) 
                                                    :
                                                        <tr><td><strong>Pas de message !</strong></td></tr>
                                                    }
                                                </tbody> 
                                            </table>
                                        </div>
                                        <div className="tab-pane"  id="edit">
                                            <div className="card">
                                                <div className="card-body">
                                                    <ul className="nav nav-pills nav-pills-primary nav-justified">
                                                        <li className="nav-item">
                                                            <Link to="#" data-target="#update" data-toggle="pill" className="nav-link active show"><i className="icon-user"></i> <span className="hidden-xs">Edit Profile</span></Link>
                                                        </li>
                                                        <li className="nav-item">
                                                            <Link to="#" data-target="#change" data-toggle="pill" className="nav-link"><i className="icon-envelope-open"></i> <span className="hidden-xs">Change Password</span></Link>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content p-3">
                                                        <div className="tab-pane active" id="update">
                                                            <h5 className="mb-3">Editer le profil</h5>
                                                            <Form onSubmit={handleSubmit}  >
                                                                <div className="row">
                                                                    <Form.Group className="col-md-6 form-group mb-5" controlId="firstname">
                                                                        <Form.Label>Prenom</Form.Label>
                                                                        <Form.Control   className="form-control"
                                                                            autoFocus
                                                                            type="firstName"
                                                                            defaultValue={seeProfile?.firstName}
                                                                            onChange={(e) => setFirstName(e.target.value)}
                                                                        />
                                                                    </Form.Group >
                                                                    <Form.Group className="col-md-6 form-group mb-5"  controlId="lastname">
                                                                        <Form.Label>Nom</Form.Label>
                                                                        <Form.Control   
                                                                            className="form-control"
                                                                            autoFocus
                                                                            type="lastName"
                                                                            defaultValue={seeProfile?.lastName}
                                                                            onChange={(e) => setLastName(e.target.value)}
                                                                        />
                                                                    </Form.Group >
                                                                </div>
                                                                <div className="row">
                                                                    <Form.Group className=" col-md-8 form-group mb-5 "  controlId="email">
                                                                            <Form.Label>Adresse e-mail</Form.Label>
                                                                            <Form.Control   className="form-control"
                                                                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                                                                autoComplete="off" 
                                                                                spellCheck="false"
                                                                                autoFocus
                                                                                type="email"
                                                                                defaultValue={seeProfile?.email}
                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                            />
                                                                        </Form.Group >
                                                                        <Form.Group className=" col-md-4 form-group mb-5"  controlId="genre">
                                                                        <Form.Label>Sexe</Form.Label>
                                                                            <Form.Control  
                                                                                className="form-control" 
                                                                                as="select"
                                                                                custom ="true"
                                                                                defaultValue={seeProfile?.Genre}
                                                                                onChange={(e) => setGenre(e.target.value)}>
                                                                                <option value="Homme">Homme</option>
                                                                                <option value="Femme">Femme</option>
                                                                            </Form.Control >
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className="row">
                                                                        <Form.Group className="col-md-6 form-group mb-5tel"  controlId="tel">
                                                                            <Form.Label>Téléphone</Form.Label>
                                                                            <Form.Control   className="form-control"
                                                                                pattern="((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})"
                                                                                autoFocus
                                                                                type="tel"
                                                                                defaultValue={seeProfile?.tel}
                                                                                onChange={(e) => setTel(e.target.value)}
                                                                            />
                                                                        </Form.Group >
                                                                        <Form.Group className="col-md-6 form-group mb-5"  controlId="dob">
                                                                            <Form.Label>Date de naissance</Form.Label>
                                                                            <Form.Control  
                                                                            className='form-control'
                                                                            type="date" 
                                                                            name="dob" 
                                                                            defaultValue={seeProfile?.birthDay.split('T')[0]}
                                                                            placeholder="Date of Birth"
                                                                            onChange={(e) => setDate(e.target.value)} 
                                                                            />
                                                                        </Form.Group>
                                                                    </div>
                                                                    <div className="row">
                                                                        <Form.Group className="col-md-6 form-group mb-5adress"  controlId="adress">
                                                                            <Form.Label>Adress</Form.Label>
                                                                            <Form.Control   className="form-control"
                                                                                autoFocus
                                                                                type="adress"
                                                                                defaultValue={seeProfile?.adress}
                                                                                onChange={(e) => setAdress(e.target.value)}
                                                                            />
                                                                        </Form.Group >
                                                                        <Form.Group className="col-md-6 form-group mb-5ville"  controlId="ville">
                                                                            <Form.Label>Ville</Form.Label>
                                                                            <Form.Control   className="form-control"
                                                                                autoFocus
                                                                                type="ville"
                                                                                defaultValue={seeProfile?.Ville}
                                                                                onChange={(e) => setVille(e.target.value)}
                                                                            />
                                                                        </Form.Group >
                                                                    </div>
                                                                <Button  type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                                                    Modifier
                                                                </Button>
                                                            </Form>
                                                        </div>
                                                        <div className="tab-pane"  id="change">
                                                            <h5 className="mb-5">Changer le mot de passe</h5>
                                                            <Form onSubmit={handleSubmit} className="editform">
                                                                {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
                                                                <div className="row">
                                                                    <Form.Group className=" form-group mb-5"   controlId="Password">
                                                                        <Form.Label>Mot de passe</Form.Label>
                                                                        <Form.Control 
                                                                            className="form-control"
                                                                            placeholder="Enter Password"
                                                                            type="Password"
                                                                            value={password}
                                                                            onChange={(e) => setPassword(e.target.value)}
                                                                        />
                                                                    </Form.Group >
                                                                    <Form.Group className=" form-group mb-5"   controlId="confirmPassword">
                                                                        <Form.Label>Confirmer le mot de passe</Form.Label>
                                                                        <Form.Control  
                                                                            className="form-control"
                                                                            type="Password"
                                                                            value={confirmPassword}
                                                                            onChange={(e) => setConfirmPassword(e.target.value) }
                                                                        />
                                                                    </Form.Group >
                                                                </div>
                                                                <Button  type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                                                    Changer
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
                    </div>
                    </div>
                </div>
                </section>
            </>
        }
    </>
  )
}

export default Profile
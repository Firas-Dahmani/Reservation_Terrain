import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register,login, authVilleSeenAction } from '../../Redux-dep/actions/authActions';
import './loginregister.css'
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import Navbar from './../../index/indexnav/Navbar';

function LoginRegister() {
    const [LoginORregiterClass, setLoginORregiterClass ] = useState("sign-in-mode")

    /* Register Code  */
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [date, setDate] = useState("");
    const [genre, setGenre] = useState("");
    const [adress, setAdress] = useState("");
    const [ville, setVille] = useState("Ville");
    const [poste, setPoste] = useState("Poste");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pic] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");
    const [ErrorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(authVilleSeenAction())
        },[dispatch]
    )

    const authVilleSeen = useSelector((state) => state.authVilleSeen)
    const { 
        ville:VilleID, 
        loading: loadingSeeVille, 
        error: errorSeeVille
    } = authVilleSeen

    

    const userRegister = useSelector((state) => state.authRegister);
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
                poste,
                password,
                pic,
                navigate
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
            }else if(genre === ""){
                setErrorMessage("Genre non valide !")
            }else if(ville === ""){
                setErrorMessage("Ville non valide !")
            }else if(!regAdress.test(adress) || adress === ""){
                setErrorMessage("Adress non valide !")
            }else if(password.length < 8){
                setErrorMessage("Password should have minimum length 8 !")
            }else if(password !== confirmPassword){
                setErrorMessage("Password not match !")
            } else {
                setErrorMessage("")
                dispatch(register(variableRegister)) 
            }
    }

    //Verification Register


    /* Login code  */
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");
    const [ErrorMessageLogin, setErrorMessageLogin] = useState("");

    const userLogin = useSelector((state) => state.authLogin);
    const err = userLogin.error;

  
    const handleSubmitLogin = async (event) =>{
      event.preventDefault();

        if(emailLogin === ""){
            setErrorMessageLogin("Enter your email !")
        }if(passwordLogin === ""){
            setErrorMessageLogin("Enter your password !")
        }else {
            setErrorMessageLogin("")
            dispatch(login(emailLogin, passwordLogin, navigate))
        }
    }

  return (
        <>
            <Navbar />
                <div className= {`containerr ${LoginORregiterClass}`}>
                    <div className="forms-container">
                        <div className="signin-signup ">
                            {/* register */}
                            <Form onSubmit={handleSubmitRegister} className="sign-up-form " >
                                <h2 className="title">S'inscrire</h2>
                                {error && <AlertCompnenet error={error}/>}
                                {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
                                <div className="formAll">
                                <div className="formRegister ">
                                    <div className="firstlastname">
                                        <Form.Group className=" mb-3 firstname" controlId="firstname">
                                        <Form.Label>Prénom</Form.Label>
                                        <Form.Control   
                                            className="input-field"
                                            autoFocus
                                            type="firstName"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 lastname"  controlId="lastname">
                                        <Form.Label>Nom</Form.Label>
                                        <Form.Control  
                                            className="input-field"
                                            autoFocus
                                            type="lastName"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        </Form.Group >
                                    </div>
                                    <Form.Group className=" mb-3 email"  controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control   
                                        className="input-field"
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
                                        <Form.Label>Téléphone</Form.Label>
                                        <Form.Control  
                                            className="input-field"
                                            autoFocus
                                            type="tel"
                                            value={tel}
                                            onChange={(e) => setTel(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 "  controlId="dob">
                                            <Form.Label>Date de naissance</Form.Label>
                                            <Form.Control 
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
                                            <Form.Control  
                                                as="select"
                                                custom ="true"
                                                defaultValue={genre}
                                                onChange={(e) => setGenre(e.target.value)}>
                                                <option disabled value="">Sexe</option>
                                                <option value="Homme">Homme</option>
                                                <option value="Femme">Femme</option>
                                            </Form.Control >
                                        </Form.Group>
                                        <Form.Group className=" mb-3 role"  controlId="poste">
                                            <Form.Control  
                                                as="select"
                                                custom ="true"
                                                defaultValue={poste}
                                                onChange={(e) => setPoste(e.target.value)}>
                                                <option  disabled="disabled">Poste</option>
                                                <option value="Gardien">Gardien</option>
                                                <option value="Libero">Libero</option>
                                                <option value="Défenseur">Défenseur</option>
                                                <option value="Milieu">Milieu</option>
                                                <option value="Ailier">Ailier</option>
                                                <option value="Attaquant">Attaquant</option>
                                            </Form.Control >
                                        </Form.Group>
                                    </div>
                                    <div className="Ville">
                                    <Form.Group className=" mb-3 adress"  controlId="adress">
                                    <Form.Label>Adress</Form.Label>
                                    <Form.Control  
                                        className="input-field"
                                        autoFocus
                                        type="adress"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                    />
                                    </Form.Group >
                                    <Form.Group className=" mp-3 " controlId="poste">
                                        <Form.Control 
                                            required  
                                            as="select"
                                            custom ="true"
                                            defaultValue={ville}
                                            onChange={(e) => setVille(e.target.value)}>
                                            <option value="Ville"  disabled="disabled">Ville</option>
                                            {
                                            VilleID && VilleID.length !== 0 &&
                                            VilleID.map((item, i) => ( 
                                                <option  value={item.villeName} key={i}>{item.villeName}</option>  
                                            ))
                                            }
                                        </Form.Control >
                                    </Form.Group >
                                    </div>
                                    <div className="Password">
                                        <Form.Group className=" mb-3 pass"   controlId="password">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control 
                                            className="input-field"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        </Form.Group >
                                        <Form.Group className=" mb-3 confirmepass"   controlId="confirmPassword">
                                        <Form.Label>Confirmez</Form.Label>
                                        <Form.Control 
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
                                    s'inscrire
                                </Button>
                            </Form>

                            {/* login */}
                            <Form onSubmit={handleSubmitLogin}  className="sign-in-form">
                            <h2 className="title">Login</h2>
                                {err && <AlertCompnenet error={err}/>}
                                {ErrorMessageLogin && <AlertCompnenet error={ErrorMessageLogin}/>}
                                <Form.Group className=" mb-3 emailLogin"  controlId="emailLogin">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                className="input-field"
                                    autoFocus
                                    type="email"
                                    value={emailLogin}
                                    onChange={(e) => setEmailLogin(e.target.value)}
                                />
                                </Form.Group >
                                <Form.Group className=" mb-3 passwordLogin"   controlId="passwordLogin">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control required  
                                className="input-field"
                                    type="password"
                                    value={passwordLogin}
                                    onChange={(e) => setPasswordLogin(e.target.value)}
                                />
                                </Form.Group >
                                <p className="social-text" sx={{fontWeight: 'bold'}}>
                                    <Link to='reset'>Mot de passe oublié?</Link>
                                </p>
                                <Button  type="submit"  className="btn solid">
                                    Connecter
                                </Button>
                            </Form>
                        </div>
                    </div>

                    <div className="panels-container">

                        <div className="panel left-panel">
                        <div className="content">
                            <h3>Nouvel utilisateur ?</h3>
                            <p>
                                Réserver votre terrain en quelques clics
                                Convoquer vos joueurs
                            </p>
                            <Button className="btn transparent" id="sign-up-btn" onClick={() => setLoginORregiterClass("sign-up-mode")}>
                                S'INSCRIRE
                            </Button>
                        </div>
                        <img src={require('../../assets/login.png')} className="image grand" alt="" />
                        </div>

                        <div className="panel right-panel">
                        <div className="content">
                            <h3>Un de nous ?</h3>
                            <p>
                                Réserver votre terrain en quelques clics
                                Convoquer vos joueurs
                            </p>
                            <Button className="btn transparent" id="sign-in-btn" onClick={()=> setLoginORregiterClass("sign-in-mode")}>
                                CONNEXION
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
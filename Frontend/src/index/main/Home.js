import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from './../indexnav/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import AdminHome from './../../admin/adminhome/AdminHome';
import { sessionService } from 'redux-react-session';
import OwnerHome from "../../Owner/OwnerHome/OwnerHome";
import UserHome from './../../User/UserHome/UserHome';

function Home() {

    let navigate = useNavigate()
    const [Role, setRole] = useState("")
    const [Avail, setAvail] = useState()
    
    
    useEffect(()=> {
      sessionService.loadUser()
        .then((user) => {
          setRole(user.data[0].role)
          setAvail(user.data[0].isAvail)
        })
        .catch(()=> console.log("Not Connected"))
    })

    useEffect(()=>{
      if(Role === 'User' && Avail === false){
        navigate('/notavail')
      }
    })

    
  return (
    <>
      {Role === 'Admin' ?
        <AdminHome/>
      :
      Role === 'Owner' ?
        <OwnerHome />
      :
      Role === 'User' ?
        <UserHome/>
      :
      <>
        <Navbar />
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
      <div className="shape shape-4"></div>
      <div className="shape shape-5"></div>
      <div className="shape shape-6"></div>
      <div className="container containerHome">
        <div className="row align-items-center justify-content-left justify-content-lg-between">
          <div className="col-lg-6 col-md-10 firstcolm">
            <div className="header-hero-content">
              <h1 className="header-title wow fadeInLeftBig" data-wow-duration="3s" data-wow-delay="0.2s">
                <span>Launch YourApp</span> With Confidence and Creative</h1>
              <p className="text wow fadeInLeftBig" data-wow-duration="3s" data-wow-delay="0.4s">
                Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Aspernatur fugiat qui tenetur sit vero delectus vitae suscipit nostrum
                aliquam exercitationem necessitatibus veniam placeat, voluptatibus harum.
              </p>
              <ul className="d-flex">
                <li>
                  <Link className="main-btn fadeInLeftBig"  to='/registerlogin' >Rejoignez-nous ici</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="header-image">
              <img src={require("../../assets/header-app.png")} alt="" className="image-1  wow fadeInRightBig"
                data-wow-duration="3s" data-wow-delay="0.5s" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="header-shape-1"></div>
        <div className="header-shape-2"></div>
      </div>
      </>
        
      }
    </>
  );
}

export default Home;


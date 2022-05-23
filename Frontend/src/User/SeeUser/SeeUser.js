import { findUserByIDAction } from "../../Redux-dep/actions/UserActions";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserNavbar from './../Usernav/UserNavbar';


function SeeUser() {
    let { id } = useParams();
    const dispatch = useDispatch()

    const UserFindByID = useSelector((state) => state.UserFindByID)
    const { User, loading:UserFindLoading, error:UserFindError } = UserFindByID

    useEffect(()=> {
        dispatch(findUserByIDAction(id))
        console.log('first')
    },[id])

    

    return (
    <>
        <UserNavbar />
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div className="profile-card-4 z-depth-3">
                        <div className="card text-center">
                            <div className=" mb-3">
                            <div className="user-box">
                                <img src={User?.pic} alt="user avatar" />
                            </div>
                                <h5 className=" text-black">{User?.firstName + " " + User?.lastName}</h5>
                                <h6 className="text-black"></h6>
                            </div>
                            <div className="card-body">
                                <ul className="list-group shadow-none">
                                <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-phone-square"></i>
                                </div>
                                <div className="list-details">
                                    <span>{User?.tel}</span>
                                </div>
                                </li>
                                <li className="list-group-item">
                                <div className="list-icon">
                                    <i className="fa fa-envelope"></i>
                                </div>
                                <div className="list-details">
                                    <span>{User?.email}</span>
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
                            <div className="tab-content p-3">
                                <div className="tab-pane active show" id="profile">
                                    <h5 className="mb-3">A-propos</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h6>Date de naissance</h6>
                                            <p>
                                                {User?.birthDay.split('T')[0]}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Sexe</h6>
                                            <p>
                                                {User?.Genre}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Ville</h6>
                                            <p>
                                                {User?.VilleID}
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <h6>Adress</h6>
                                            <p>
                                                {User?.adress}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md mb-5">
                                        <h6>Equipe auxquelles j'appartiens</h6>
                                        {
                                            User?.equipes.length > 0 ?
                                            User?.equipes.map((element,key)=> 
                                                    <a href="" className="badge badge-dark badge-pill" key={key}>{element.name}</a> 
                                                )
                                            :
                                            <strong>No Equipe</strong>
                                        }
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

export default SeeUser
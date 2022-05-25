import { useDispatch, useSelector } from 'react-redux'
import './ShowStade.css'
import { useEffect,useState } from 'react';
import { getStadeAction } from '../../Redux-dep/actions/UserActions';
import { sessionService } from 'redux-react-session';
import { useParams } from 'react-router-dom';
import UserNavbar from './../Usernav/UserNavbar';
import Calendar from '../../Utils/Calendar/Calendar';

function ShowStade() {

    const dispatch = useDispatch()
    const {idStade} = useParams()
    const [UserID, setUserID] = useState("")

    const getStade = useSelector((state) => state.getStade)
    const { stade, loading, error } = getStade

    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
        })

    useEffect(()=> {
        dispatch(getStadeAction(idStade))
    },[])


  return (
    <>
        <UserNavbar/>
        <div className="container showStade">
            <div className="card">
                <div className="card-body">
                    <div className="col-md-9 col-sm-7" style={{paddingBottom:'32px'}}> 
                        <h2>{stade?.stadeName}</h2> 
                    </div>
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center"><img src="https://img.freepik.com/photos-gratuite/gros-plan-attaquant-football-pret-lancer-balle-ardente-au-stade_207634-7.jpg?w=740" className="img-responsive" /></div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <h4 className="box-title mt-5">Stade description</h4>
                            <p>{stade?.desc}</p>
                            <h2 className="mt-5">
                                {stade?.prix} DT Par 1H
                            </h2>
                            <h3 className="box-title mt-5">Details</h3>
                            <ul className="list-unstyled">
                                <li><i className="fa fa-phone"></i>  {stade?.stadetel}</li>
                                <li><i className="fa fa-map-marker"></i>  {stade?.adress}</li>
                            </ul>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Emploi</h3>
                            <div className="table-responsive">
                                {/* Calendrier */}
                                <Calendar UserId={UserID} OwnerId={stade?.userId}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShowStade
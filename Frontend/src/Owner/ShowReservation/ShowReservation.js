import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { sessionService } from 'redux-react-session';
import OwnerNavbar from './../Ownernav/OwnerNavbar';
import { OwnergetEventAction } from '../../Redux-dep/actions/OwnerActions';
import Loading from '../../loading/Loading';

function ShowReservation() {

    const dispatch = useDispatch()

    const showReservation = useSelector((state) => state.showReservation)
    const { event, loading, error } = showReservation

    const [UserID, setUserID] = useState("")


    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
        })

    useEffect(()=> {
        if(UserID){
            dispatch(OwnergetEventAction(UserID))
        }
    },[dispatch,UserID])

  return (
    <>
        <OwnerNavbar/>
        {
            loading ? 
            <Loading/>
            : <div className="container">
            <div className="row bootstrap snippets bootdeys" > 
                <div className="col-md-9 col-sm-7" style={{paddingBottom:'32px'}}> 
                    <h2>Reservation</h2> 
                </div> 
            </div>
            <div className="col" style={{paddingTop:'32px'}}>
                <div className="row">
                    {
                        event?.length > 0 ? 
                        event?.map((element, key)=> 
                            <div className="col-sm-6 col-lg-4 mb-4" key={key}>
                                <div className="candidate-list candidate-grid">
                                    <div className="candidate-list-image">
                                        <img className="img-fluid" src="https://media.istockphoto.com/photos/the-soccer-football-players-at-the-stadium-in-motion-picture-id903266810?k=20&m=903266810&s=612x612&w=0&h=ap-kg6y6PotzdupHc6uoY8j_eGr6sQ_G1knYqT8VMqA=" alt="" />
                                    </div>
                                    <div className="candidate-list-details">
                                        <div className="candidate-list-info">
                                            <div className="candidate-list-title">
                                                <h5><a href="#">{element.title }</a></h5>
                                            </div>
                                            <div className="candidate-list-option">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-clock pr-1"></i>{element.start}</li>
                                                    <li><i className="fas fa-clock pr-1"></i>{element.end} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="candidate-list-favourite-time">
                                            <a className="candidate-list-favourite order-2" href="#" /* onClick={()=>handledeleteEvent(element?._id)} */><i className="fa fa-trash delete"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <strong>Aucun résultat trouver</strong>
                    }
                </div>
            </div>
        </div>
        }
    </>
  )
}

export default ShowReservation
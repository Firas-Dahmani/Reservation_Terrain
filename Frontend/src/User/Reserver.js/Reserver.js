import { SearchStadeAction } from '../../Redux-dep/actions/UserActions';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sessionService } from 'redux-react-session';
import { OwnervilleSeenAction } from '../../Redux-dep/actions/OwnerActions';
import Button  from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import UserNavbar from './../Usernav/UserNavbar';
import { Link } from 'react-router-dom';

function Reserver() {
    const dispatch = useDispatch()
    const [Search, setSearch] = useState()
    const [VilleID, setVilleID] = useState()
    const [UserID, setUserID] = useState("")

    const SearchSatde = useSelector((state) => state.SearchSatde)
    const { Stade , loading, error } = SearchSatde

    const villeSeen = useSelector((state) => state.OwnervilleSeen)
    const { 
        ville, 
        loading: loadingSeeVille, 
        error: errorSeeVille
    } = villeSeen

    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
        })

        useEffect(()=> {
            dispatch(OwnervilleSeenAction())
            },[dispatch]
        )


    const handleSubmit = async (event) =>{
        event.preventDefault();

        dispatch(SearchStadeAction(UserID,Search,VilleID))
    }
  return (
    <>
        <UserNavbar />
        <div className="container">
            <div className="row bootstrap snippets bootdeys" > 
                <div className="mb-4  align-items-center"> 
                    <Form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <Form.Group className="col-md-6 mp-5" controlId="Search">
                                <Form.Label>Search</Form.Label>
                                <Form.Control   className="form-control"
                                    autoFocus
                                    type="Search"
                                    value={Search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form.Group >
                            <Form.Group className="  col-md-4 mp-3" style={{paddingTop:'32px'}} controlId="poste">
                                <Form.Control 
                                    as="select"
                                    custom ="true"
                                    defaultValue={VilleID}
                                    onChange={(e) => setVilleID(e.target.value)}>
                                    <option value="" >Ville</option>
                                    {
                                    ville && ville.length !== 0 &&
                                    ville.map((item, i) => ( 
                                        <option  value={item._id} key={i}>{item.villeName}</option>  
                                    ))
                                    }
                                </Form.Control >
                            </Form.Group >
                        </div>
                        <Button  type="submit"  className="btn solid "/* disabled={!validateForm() || loading} */>
                            Search
                        </Button>
                    </Form>
                </div>
            </div>
            <div className="col" style={{paddingTop:'32px'}}>
                <div className="row">
                    {
                        Stade?.length > 0 ? 
                        Stade?.map((element, key)=> 
                            <div className="col-sm-6 col-lg-4 mb-4" key={key}>
                                <div className="candidate-list candidate-grid">
                                    <div className="candidate-list-image">
                                        <img className="img-fluid" src="https://img.freepik.com/photos-gratuite/gros-plan-attaquant-football-pret-lancer-balle-ardente-au-stade_207634-7.jpg?w=740" alt="" />
                                    </div>
                                    <div className="candidate-list-details">
                                        <div className="candidate-list-info">
                                            <div className="candidate-list-title">
                                                <h5><a href="#">{element.stadeName}</a></h5>
                                            </div>
                                            <div className="candidate-list-option">
                                                <ul className="list-unstyled">
                                                    <li><i className="fa fa-phone"></i> {element.stadetel}</li>
                                                    <li><i className="fas fa-map-marker-alt pr-1"></i>{element.adress} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="candidate-list-favourite-time">
                                            <strong>Prix: {element.prix} 1H </strong>
                                            <Link to={`/Stade/${element._id}`}>Afficher plus</Link>
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
    </>
  )
}

export default Reserver
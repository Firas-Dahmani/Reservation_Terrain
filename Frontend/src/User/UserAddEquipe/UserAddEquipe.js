import React,{ useEffect, useState } from 'react'
import UserNavbar from '../Usernav/UserNavbar'
import './UserAddEquipe.css'
import  Form  from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { OwnervilleSeenAction } from './../../Redux-dep/actions/OwnerActions';
import { sessionService } from 'redux-react-session';
import { AddMembreAction, deleteUserFromEquipeAction, playerSearchAction, UserSeeOwnEquipeAction } from '../../Redux-dep/actions/UserActions';
import Button  from 'react-bootstrap/Button';
import AlertCompnenet from '../../Error/Alert/AlertCompnenet';

function UserAddEquipe() {
    const dispatch = useDispatch()

    const [VilleID, setVilleID] = useState("")
    const [Poste, setPoste] = useState("");
    const [playerName, setSearch] = useState("");
    const [UserID, setUserID] = useState("")

    sessionService.loadUser()
        .then((User) => {
            setUserID(User.data[0]._id)
        })

    const villeSeen = useSelector((state) => state.OwnervilleSeen)
    const { 
        ville, 
        loading: loadingSeeVille, 
        error: errorSeeVille
    } = villeSeen

    const playerSearch = useSelector((state) => state.playerSearch)
    const { 
        Users, 
        loading, 
        error
    } = playerSearch

    const SeenOwnEquipe = useSelector((state) => state.UserSeeOwnEquipe)
    const { seeOwnEquipe, loading:seeOwnEquipeLoading, error:seeOwnEquipeError } = SeenOwnEquipe

    const AddMembre = useSelector((state) => state.AddMembre)
    const { success:AddMembreSuccess, loading:AddMembreLoading, error:AddMembreError } = AddMembre

    const deleteUserFromEquipe = useSelector((state) => state.deleteUserFromEquipe)
    const { success:deleteUserFromEquipeSuccess, loading:deleteUserFromEquipeLoading, error:deleteUserFromEquipeError } = deleteUserFromEquipe
    
    useEffect(()=> {
        dispatch(OwnervilleSeenAction())
        },[dispatch]
    )

    useEffect(()=> {
        if(UserID){
            dispatch(UserSeeOwnEquipeAction(UserID))
        }
    }, [UserID,AddMembreSuccess,deleteUserFromEquipeSuccess])

    const handleSubmit = async (event) =>{
        event.preventDefault();

        dispatch(playerSearchAction(Poste,playerName,VilleID,UserID))
    }

    const handleAddMembre = (USERID) =>{
        dispatch(AddMembreAction(UserID,seeOwnEquipe?._id ,USERID))
    }

    const handledeleteUserfromEquipe = (USERID) =>{
        dispatch(deleteUserFromEquipeAction(USERID,seeOwnEquipe?._id))
    }

    const checkUserMembre = (Userid) => {
        let avail = false
        seeOwnEquipe?.members.map((element)=> {
            if(element?.UserID === Userid){
                avail = true
            }
                
        })

        return avail
    }

    

    

  return (
    <>
        <UserNavbar/>
        <div className="container">
            <div className="row bootstrap snippets bootdeys" > 
                <div className="col-md-9 col-sm-7" style={{paddingBottom:'32px'}}> 
                    <h2>Members</h2> 
                </div> 
                {AddMembreError && <AlertCompnenet error={AddMembreError}/>}
                <div className="mb-4  align-items-center"> 
                    <Form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <Form.Group className="col-md-6 mp-5" controlId="Search">
                                <Form.Label>Search</Form.Label>
                                <Form.Control   className="form-control"
                                    autoFocus
                                    type="Search"
                                    value={playerName}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Form.Group >
                            <Form.Group className="  col-md-3 mp-3" style={{paddingTop:'32px'}} controlId="poste">
                                <Form.Control 
                                    as="select"
                                    custom ="true"
                                    defaultValue={VilleID}
                                    onChange={(e) => setVilleID(e.target.value)}>
                                    <option value="" >Ville</option>
                                    {
                                    ville && ville.length !== 0 &&
                                    ville.map((item, i) => ( 
                                        <option  value={item.villeName} key={i}>{item.villeName}</option>  
                                    ))
                                    }
                                </Form.Control >
                            </Form.Group >
                            <Form.Group className="  col-md-3 mp-3" style={{paddingTop:'32px'}}  controlId="poste">
                                <Form.Control  
                                    as="select"
                                    value={Poste}
                                    custom ="true"
                                    onChange={(e) => setPoste(e.target.value)}>
                                    <option value="" >Poste</option>
                                    <option value="Gardien">Gardien</option>
                                    <option value="Libero">Libero</option>
                                    <option value="Défenseur">Défenseur</option>
                                    <option value="Milieu">Milieu</option>
                                    <option value="Ailier">Ailier</option>
                                    <option value="Attaquant">Attaquant</option>
                                </Form.Control >
                            </Form.Group>
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
                        Users?.length > 0 ? 
                        Users?.map((element, key)=> 
                            <div className="col-sm-6 col-lg-4 mb-4" key={key}>
                                <div className="candidate-list candidate-grid">
                                    <div className="candidate-list-image">
                                        <img className="img-fluid" src={element.pic} alt="" />
                                    </div>
                                    <div className="candidate-list-details">
                                        <div className="candidate-list-info">
                                            <div className="candidate-list-title">
                                                <h5><a href={element._id}>{element.firstName } {element.lastName}</a></h5>
                                            </div>
                                            <div className="candidate-list-option">
                                                <ul className="list-unstyled">
                                                    <li><i className="fas fa-filter pr-1"></i>{element.Poste}</li>
                                                    <li><i className="fas fa-map-marker-alt pr-1"></i>{element.adress} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="candidate-list-favourite-time">
                                            {
                                                
                                                 seeOwnEquipe?.adminId === element?._id ?
                                                    <strong>Admin</strong>
                                                :
                                                        (checkUserMembre(element?._id)) ?
                                                       <>
                                                            <strong>Member</strong>
                                                            <a className="candidate-list-favourite order-2" href="#" onClick={()=>handledeleteUserfromEquipe(element?._id)}><i className="fa fa-trash delete"></i></a>
                                                       </>
                                                    :
                                                    element?._id !== UserID && <a className="candidate-list-favourite order-2" href="#" onClick={()=>handleAddMembre(element._id)}><i className="fa fa-plus"></i></a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        <strong className='align-items-center justify-content-center text-center'>Aucun résultat trouver</strong>
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default UserAddEquipe
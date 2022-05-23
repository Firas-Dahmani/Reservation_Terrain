import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  deleteEquipeAction, UserCreateEquipeAction, UserSeeOwnEquipeAction } from '../../Redux-dep/actions/UserActions';
import Button  from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Loading from './../../loading/Loading';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';

function EquipeComponent({UserID}) {

    const dispatch = useDispatch()
    const [equipeName, setEquipeName] = useState("")
    const [Message, setMessage] = useState("")

    const SeenOwnEquipe = useSelector((state) => state.UserSeeOwnEquipe)
    const { seeOwnEquipe, loading:seeOwnEquipeLoading, error:seeOwnEquipeError } = SeenOwnEquipe

    const CreateEquipe = useSelector((state) => state.CreateEquipe)
    const { success, loading, error } = CreateEquipe

    const DeleteEquipe = useSelector((state) => state.DeleteEquipe)
    const { success:deletesucc, loading:deleteLoad, error:deleteErr } = DeleteEquipe


    useEffect(()=> {
        if(UserID){
            dispatch(UserSeeOwnEquipeAction(UserID))
        }
    }, [success,
        deletesucc,
        UserID])


    
    const handleCreateEquipe = async (event) =>{
        event.preventDefault();

        if(equipeName === ""){
            setMessage("Entrer le nom de l'equipe")
        }else{
            setMessage("")
            dispatch(UserCreateEquipeAction(UserID, equipeName))
        }
        
    }

    const handleDelete = (id) =>{
        dispatch(deleteEquipeAction(id))
      }

  return (
    <div className="col">
        <div className="card widget-signups">
            <div className="card-body">
            {error && <AlertCompnenet error={error}/>}
            {Message && <AlertCompnenet error={Message}/>}
                {
                    seeOwnEquipeLoading || loading ?
                    <Loading />
                    :
                    !seeOwnEquipe ?
                    <>
                        <Form onSubmit={handleCreateEquipe}  >
                            <Form.Group className="col-md-6 form-group mb-5" controlId="equipeName">
                                <Form.Label>Nom d'equipe</Form.Label>
                                <Form.Control   className="form-control"
                                    autoFocus
                                    type="equipeName"
                                    value={equipeName}
                                    onChange={(e) => setEquipeName(e.target.value)}
                                />
                            </Form.Group >
                            <Button  type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
                                Create
                            </Button>
                        </Form>
                    </> 
                    :
                        seeOwnEquipe?.adminId === UserID ?
                        <>
                            <h4 className="card-title">Equipe</h4>
                            <h6 className="card-subtitle">Nom: <strong>{seeOwnEquipe?.name}</strong></h6>
                            <div className="widget-signups__list">
                                {
                                    seeOwnEquipe?.members.map((element, key)=> 
                                        <a key={key} data-toggle="tooltip" title={element.Name} href={`http://localhost:3000/${element.UserID}`} data-original-title={element.Name}><img className="avatar-img-Equipe" src={element.Pic} alt=""/></a>
                                    )
                                }
                            </div>
                            <div className="row">
                                <Link to=""  onClick={()=>handleDelete(seeOwnEquipe?._id)} className="float-right "  style={{paddingTop: "24px"}}><i className="fa fa-trash delete " ></i></Link>
                            </div>
                        </>
                        :
                        <>
                            <h4 className="card-title">Equipe</h4>
                            <h6 className="card-subtitle">Nom: <strong>{seeOwnEquipe?.name}</strong></h6>
                            <div className="widget-signups__list">
                                {
                                    seeOwnEquipe?.members.map((element, key)=> 
                                        <a key={key} data-toggle="tooltip" title={element[1]} href={`http://localhost:3000/${element[0]}`} data-original-title={element[1]}><img className="avatar-img-Equipe" src={element[2]} alt=""/></a>
                                    )
                                }
                            </div>
                        </>

                }
            </div>
        </div>
    </div>
  )
}

export default EquipeComponent
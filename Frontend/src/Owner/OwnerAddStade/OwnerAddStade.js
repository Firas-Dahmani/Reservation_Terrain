
import { useSelector, useDispatch } from 'react-redux';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import { useEffect, useState } from 'react';
import Loading from './../../loading/Loading';
import Form  from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import { sessionService } from 'redux-react-session';
import OwnerNavbar from './../Ownernav/OwnerNavbar';
import { OwnerstadeAddAction, OwnerstadeDeleteAction, OwnerstadeSeenAction, OwnervilleSeenAction } from '../../Redux-dep/actions/OwnerActions';




function OwnerStadeCrud() {
    const dispatch = useDispatch()
    const [Stade, setStade] = useState("")
    const [VilleID, setVilleID] = useState("Ville")
    const [UserID, setUserID] = useState("")
    const [Phone, setPhone] = useState("")
    const [ErrorMessage, setErrorMessage] = useState("");

    const stadeSeen = useSelector((state) => state.OwnerstadeSeen)
    const { stade, loading, error } = stadeSeen

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


    const stadeDelete = useSelector((state) => state.OwnerstadeDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = stadeDelete;

    const stadeAdd = useSelector((state) => state.OwnerstadeAdd);
    const {
      loading: loadingStadeAdd,
      error: errorStadeAdd,
      success: successStadeAdd,
    } = stadeAdd; 

    useEffect(()=> {
        dispatch(OwnervilleSeenAction())
        },[dispatch]
    )

    useEffect(()=> {
      dispatch(OwnerstadeSeenAction(VilleID,UserID))
      },[dispatch,
        VilleID,
        successStadeAdd,
        successDelete
    ])

   

      const handleDelete = (id) =>{
        dispatch(OwnerstadeDeleteAction(id))
      }
   
      const handleSubmit = async (event) =>{
        event.preventDefault();
        
        let regPhone = /((\+|00)216)?([2579][0-9]{7}|(3[012]|4[01]|8[0128])[0-9]{6}|42[16][0-9]{5})/
        if(VilleID === "Ville"){
          setErrorMessage("Ville non valide !")
        }else if(Stade === ""){
          setErrorMessage("Stade non valide !")
        }else if(!regPhone.test(Phone)){
          setErrorMessage("Telephone non valide !")
        } else {
          setErrorMessage("")
          setStade("")
          setPhone("")
          dispatch(OwnerstadeAddAction(UserID, VilleID, Stade, Phone))
        }
      } 

    return (
      <>
        <OwnerNavbar />
        <div className="main-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div  className=''>
                        <div className="d-flex justify-content-center row-container">
                            <div className="row">
                            <div className="col">
                                <h3 className="text-center text-page mb-5 animated pulse infinite" >
                                  Liste des stades
                                </h3>
                                {error && <AlertCompnenet error={error}/>}
                                {errorSeeVille && <AlertCompnenet error={errorSeeVille}/>}
                                {errorStadeAdd && <AlertCompnenet error={errorStadeAdd}/>}
                                {errorDelete && <AlertCompnenet error={errorDelete}/>}
                                {ErrorMessage && <AlertCompnenet error={ErrorMessage}/>}
                            </div>
                            </div>
                        </div>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className=" mb-3 role"  controlId="poste">
                                <Form.Control 
                                    required  
                                    as="select"
                                    custom ="true"
                                    defaultValue={VilleID}
                                    onChange={(e) => setVilleID(e.target.value)}>
                                    <option value="Ville"  disabled="disabled">Ville</option>
                                    {
                                    ville && ville.length !== 0 &&
                                    ville.map((item, i) => ( 
                                        <option  value={item._id} key={i}>{item.villeName}</option>  
                                    ))
                                    }
                                </Form.Control >
                            </Form.Group>
                            <div className="row">
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="stade">
                                    <Form.Label className='col-form-label'>Stade</Form.Label>
                                    <Form.Control 
                                    placeholder="Stade Name" 
                                    className="form-control"
                                    type="Stade"
                                    value={Stade}
                                    onChange={(e) => setStade(e.target.value)}
                                    />
                                </Form.Group >
                                <Form.Group className="col-md-6 form-group mb-5"  controlId="phone">
                                    <Form.Label className='col-form-label'>Téléphone</Form.Label>
                                    <Form.Control 
                                    placeholder="Téléphone #" 
                                    className="form-control"
                                    type="phone"
                                    value={Phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group >
                            </div>
                            <Button type="submit" className='main-btn'>
                                ADD
                            </Button>
                        </Form>

                        <div className="container" id="container">
                          <div className="row">
                            <div className="col-12">
                              {loading || loadingSeeVille || loadingDelete || loadingStadeAdd ?
                                  <Loading />
                                :
                                <table className="table table-image">
                                <thead>
                                  <tr>
                                    <th scope="col">Nom du stade</th>
                                    <th scope="col">Téléphone</th>
                                    <th scope="col">Supprimer Stade</th>
                                  </tr>
                                </thead>
                                {
                                    stade && stade.length !== 0 ?
                                    stade.map((item, i) => ( 
                                          <tbody key={i}>
                                          <tr>
                                            <th scope="row">{item.stadeName}</th>
                                            <th scope="row">{item.stadetel}</th>
                                            <td><i className="fa fa-trash delete" onClick={()=>handleDelete(item._id)}></i></td>
                                          </tr>
                                        </tbody>
                                        ))
                                    :
                                    <tbody>
                                      <tr>
                                        <th scope="row">*</th>
                                        <th scope="row">*</th>
                                        <td>*</td>
                                      </tr>
                                    </tbody>
                                }
                              </table>
                              }
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    )
  }
  
  export default OwnerStadeCrud